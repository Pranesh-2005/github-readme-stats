import { getCardColors } from "../common/utils.js";

/**
 * Render the streak card SVG.
 * @param {string} username
 * @param {{
 *   currentStreak: number,
 *   longestStreak: number,
 *   totalContributions: number,
 *   currentStreakStart?: string,
 *   currentStreakEnd?: string,
 *   longestStreakStart?: string,
 *   longestStreakEnd?: string,
 *   firstContribution?: string,
 * }} streak
 * @param {{
 *   theme: string,
 *   hide_border?: boolean,
 *   title_color?: string,
 *   text_color?: string,
 *   bg_color?: string,
 *   border_color?: string
 * }} options
 * @returns {string}
 */
export function renderStreakCard(username, streak, options) {
  const { titleColor, textColor, bgColor, borderColor } = getCardColors({
    title_color: options.title_color,
    text_color: options.text_color,
    bg_color: options.bg_color,
    border_color: options.border_color,
    theme: options.theme || "default",
  });

  // Format date ranges if available
  const formatRange = (start, end) => {
    if (!start || !end) { return ""; }
    if (start === end) { return start; }
    return `${start} - ${end}`;
  };

  return `
    <svg width="495" height="150" viewBox="0 0 495 150" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor} }
        .stat { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
        .range { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor} }
      </style>
      <rect width="100%" height="100%" fill="${bgColor}" stroke="${
        options.hide_border ? "none" : borderColor
      }" rx="4.5"/>
      <text x="25" y="35" class="header">🔥 Contribution Streak for ${username}</text>
      <text x="25" y="65" class="stat">Current Streak: ${
        streak.currentStreak
      } days</text>
      <text x="25" y="82" class="range">${
        streak.currentStreakStart && streak.currentStreakEnd
          ? formatRange(streak.currentStreakStart, streak.currentStreakEnd)
          : ""
      }</text>
      <text x="25" y="105" class="stat">Longest Streak: ${
        streak.longestStreak
      } days</text>
      <text x="25" y="122" class="range">${
        streak.longestStreakStart && streak.longestStreakEnd
          ? formatRange(streak.longestStreakStart, streak.longestStreakEnd)
          : ""
      }</text>
      <text x="300" y="65" class="stat">Total Contributions: ${
        streak.totalContributions
      }</text>
      <text x="300" y="82" class="range">${
        streak.firstContribution
          ? `${streak.firstContribution} - Present`
          : ""
      }</text>
    </svg>
  `;
}