// Custom logging middleware
export const logger = (action, data) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ timestamp: new Date().toISOString(), action, data });
  localStorage.setItem('logs', JSON.stringify(logs));
};
