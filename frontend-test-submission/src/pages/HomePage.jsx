import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { isValidUrl, isAlphanumeric } from '../utils/validators';
import { generateShortcode, getUrls, saveUrl } from '../utils/storage';
import { logger } from '../utils/logger';


const HomePage = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '', error: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addInputField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '', error: '' }]);
    }
  };

  const handleShorten = () => {
    const updatedResults = [];
    const updatedInputs = inputs.map((input) => {
      const { url, validity, shortcode } = input;
      if (!isValidUrl(url)) {
        return { ...input, error: 'Invalid URL' };
      }
      if (validity && isNaN(validity)) {
        return { ...input, error: 'Validity must be a number' };
      }
      if (shortcode && !isAlphanumeric(shortcode)) {
        return { ...input, error: 'Shortcode must be alphanumeric' };
      }
      let code = shortcode || generateShortcode();
      let createdAt = new Date();
      let expiresAt = new Date(createdAt.getTime() + (validity ? +validity : 30) * 60000);

      const entry = {
        original: url,
        shortcode: code,
        createdAt: createdAt.toISOString(),
        expiry: expiresAt.toISOString(),
        clicks: 0,
        clickLog: [],
      };

      const stored = JSON.parse(localStorage.getItem('urls') || '[]');
      if (stored.find((x) => x.shortcode === code)) {
        return { ...input, error: 'Shortcode already exists' };
      }

      stored.push(entry);
      localStorage.setItem('urls', JSON.stringify(stored));
      logger('Shortened URL created', entry);
      updatedResults.push(entry);
      return { url: '', validity: '', shortcode: '', error: '' };
    });

    setInputs(updatedInputs);
    setResults(updatedResults);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Box key={i} display="flex" gap={2} mb={2}>
          <TextField label="Long URL" value={input.url} onChange={(e) => handleInputChange(i, 'url', e.target.value)} fullWidth error={!!input.error} helperText={input.error} />
          <TextField label="Validity (min)" value={input.validity} onChange={(e) => handleInputChange(i, 'validity', e.target.value)} />
          <TextField label="Custom Code" value={input.shortcode} onChange={(e) => handleInputChange(i, 'shortcode', e.target.value)} />
        </Box>
      ))}
      <Button onClick={addInputField} disabled={inputs.length >= 5}>Add More</Button>
      <Button variant="contained" onClick={handleShorten}>Shorten</Button>

      {results.map((res, i) => (
        <Box key={i} mt={2}>
          <Typography>Shortened: <a href={`/${res.shortcode}`}>{window.location.origin}/{res.shortcode}</a></Typography>
          <Typography>Expires at: {new Date(res.expiry).toLocaleString()}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;