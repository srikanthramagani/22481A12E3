// logging-middleware/log.js
async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message
      })
    });

    const data = await res.json();
    console.log("Log response:", data);
    return data;
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

export default Log;
