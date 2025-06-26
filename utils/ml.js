function predictYogaTomorrow(todayMinutes) {
  if (todayMinutes >= 20) return "✅ Likely Yes";
  if (todayMinutes >= 10) return "🤔 Maybe";
  return "❌ Unlikely";
}

module.exports = { predictYogaTomorrow };
