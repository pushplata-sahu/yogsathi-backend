const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "dailyLogs.json");

function getWeeklySummary() {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const logs = JSON.parse(raw);

    const last7 = logs.slice(-7);
    const totalMinutes = last7.reduce((sum, d) => sum + d.yoga_minutes, 0);
    const avg = totalMinutes / last7.length;

    // ✅ Correct streak logic — count consecutive non-zero days from the end
    let streak = 0;
    for (let i = last7.length - 1; i >= 0; i--) {
      if (last7[i].yoga_minutes > 0) {
        streak++;
      } else {
        break;
      }
    }

    const challengeAttempted = true;
    const rewards = streak >= 5 ? 3 : streak >= 3 ? 1 : 0;

    return {
      totalMinutes,
      avg,
      streak,
      last7,
      challengeAttempted,
      rewards,
    };
  } catch (err) {
    console.error("❌ Error reading or parsing dailyLogs.json:", err.message);
    return null;
  }
}

module.exports = { getWeeklySummary };
