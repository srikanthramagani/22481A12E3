import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const StatsPage = () => {
  const urls = JSON.parse(localStorage.getItem('urls') || '[]');

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Stats</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url, i) => (
            <TableRow key={i}>
              <TableCell><a href={`/${url.shortcode}`}>{window.location.origin}/{url.shortcode}</a></TableCell>
              <TableCell>{url.original}</TableCell>
              <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(url.expiry).toLocaleString()}</TableCell>
              <TableCell>{url.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StatsPage;