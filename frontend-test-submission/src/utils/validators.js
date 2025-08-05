// Check if a URL is valid
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

// Check if string is alphanumeric
export const isAlphanumeric = (str) => /^[a-z0-9]+$/i.test(str);
