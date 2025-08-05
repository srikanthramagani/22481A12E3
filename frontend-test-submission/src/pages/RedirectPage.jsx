import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls') || '[]');
    const entry = urls.find((u) => u.shortcode === shortcode);
    if (!entry) return alert('Shortcode not found');

    const now = new Date();
    if (new Date(entry.expiry) < now) return alert('Link expired');

    entry.clicks++;
    entry.clickLog.push({
      timestamp: now.toISOString(),
      referrer: document.referrer,
      geo: 'India', // Mocked location
    });
    localStorage.setItem('urls', JSON.stringify(urls));

    window.location.href = entry.original;
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;