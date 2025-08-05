export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const isAlphanumeric = (str) => /^[a-z0-9]+$/i.test(str);

export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 7);
};

export const logger = (action, data) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ timestamp: new Date().toISOString(), action, data });
  localStorage.setItem('logs', JSON.stringify(logs));
};