// Regional Indicator Symbols start at U+1F1E6 ("A"). 127397 = 0x1F1E6 - "A".charCodeAt()
const REGIONAL_INDICATOR_OFFSET = 127397;

/** "PT" -> "🇵🇹" */
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => REGIONAL_INDICATOR_OFFSET + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

/** "🇵🇹" -> "pt" (returns "" for invalid input) */
export function emojiToCountryCode(flag) {
  if (typeof flag !== "string" || !flag) return "";
  return Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - REGIONAL_INDICATOR_OFFSET))
    .join("")
    .toLowerCase();
}

// windows limitation: Windows does not render flag emojis, so we display a PNG instead
export function getFlagUrl(flag, size = "24x18") {
  const countryCode = emojiToCountryCode(flag);
  return countryCode ? `https://flagcdn.com/${size}/${countryCode}.png` : "";
}
