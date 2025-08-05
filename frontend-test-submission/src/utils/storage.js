// Generate a unique shortcode
export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 7);
};

// Get all saved URLs
export const getUrls = () => JSON.parse(localStorage.getItem('urls') || '[]');

// Save a new URL entry
export const saveUrl = (entry) => {
  const urls = getUrls();
  urls.push(entry);
  localStorage.setItem('urls', JSON.stringify(urls));
};

// Update an existing URL entry (e.g., after click)
export const updateUrls = (urls) => {
  localStorage.setItem('urls', JSON.stringify(urls));
};
