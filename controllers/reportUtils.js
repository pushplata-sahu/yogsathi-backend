const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "dailyLogs.json");

function getWeeklySummary() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  const logs = JSON.parse(raw);

  const last7 = logs.slice(-7);
  const totalMinutes = last7.reduce((sum, d) => sum + d.yoga_minutes, 0);
  const avg = totalMinutes / last7.length;

  const streak = last7.reduce((s, d) => (d.yoga_minutes > 0 ? s + 1 : 0), 0);

  const challengeAttempted = true; // Or calculate based on logs if needed
  const rewards = streak >= 5 ? 3 : streak >= 3 ? 1 : 0;

  return {
    totalMinutes,
    avg,
    streak,
    last7,
    challengeAttempted,
    rewards,
  };
}

module.exports = { getWeeklySummary };
