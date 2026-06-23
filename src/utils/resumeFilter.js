export const filterAndSortByRole = (items, selectedRole) => {
  if (!items || !Array.isArray(items)) return []
  
  const scored = items.map(item => ({
    ...item,
    score: (item.tags && item.tags.includes(selectedRole)) ? 1 : 0
  }))

  return scored.sort((a, b) => b.score - a.score)
}
