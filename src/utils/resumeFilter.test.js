import { filterAndSortByRole } from './resumeFilter'

describe('resumeFilter logic', () => {
  it('should prioritize items matching the selected role', () => {
    const mockBullets = [
      { id: 1, text: 'Generic task', tags: ['Backend'] },
      { id: 2, text: 'Frontend task', tags: ['Frontend Engineer'] },
      { id: 3, text: 'Fullstack task', tags: ['Frontend Engineer', 'Backend Engineer'] }
    ]

    const result = filterAndSortByRole(mockBullets, 'Frontend Engineer')
    
    // Items with 'Frontend Engineer' tag should appear first
    expect(result[0].id).toBe(2)
    expect(result[1].id).toBe(3)
    // Non-matching item should be pushed to the bottom
    expect(result[2].id).toBe(1)
  })

  it('should preserve original order for items with the same score', () => {
    const mockSkills = [
      { group: 'A', tags: ['Manager'] },
      { group: 'B', tags: ['Developer'] },
      { group: 'C', tags: ['Manager'] }
    ]

    const result = filterAndSortByRole(mockSkills, 'Manager')
    
    expect(result[0].group).toBe('A')
    expect(result[1].group).toBe('C')
    expect(result[2].group).toBe('B')
  })
})
