export function getSpiceLevel(spiceLevel) {
  const match = spiceLevel.match(/\((\d)\/3\)/);
  if (match) return Number(match[1]);

  const lower = spiceLevel.toLowerCase();
  if (lower.includes('mild')) return 1;
  if (lower.includes('medium')) return 2;
  if (lower.includes('hot') || lower.includes('fiery') || lower.includes('extra')) return 3;
  return 1;
}

export function cleanSpiceLabel(spiceLevel) {
  return spiceLevel.replace(/\s*\(\d\/3\)/, '');
}