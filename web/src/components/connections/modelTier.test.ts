import { describe, expect, test } from 'bun:test'
import { filterAndSortModels, isModelFreeTier } from './modelTier'

describe('modelTier', () => {
  describe('isModelFreeTier', () => {
    test('returns true when caps.free is true', () => {
      expect(isModelFreeTier({ id: 'm1' }, { free: true })).toBe(true)
    })

    test('returns false when caps is missing or false', () => {
      expect(isModelFreeTier({ id: 'm1' }, { free: false })).toBe(false)
      expect(isModelFreeTier({ id: 'm1' })).toBe(false)
    })
  })

  describe('filterAndSortModels', () => {
    const models = [
      { id: 'paid-b', name: 'Paid B' },
      { id: 'free-b', name: 'Free B' },
      { id: 'paid-a', name: 'Paid A' },
      { id: 'free-a', name: 'Free A' },
    ]
    const caps = {
      'free-a': { free: true },
      'free-b': { free: true },
      'paid-a': { free: false },
      'paid-b': { free: false },
    }

    test('all filter sorts free models first, then alphabetically', () => {
      const res = filterAndSortModels(models, 'all', caps)
      expect(res.map((m) => m.id)).toEqual(['free-a', 'free-b', 'paid-a', 'paid-b'])
    })

    test('free filter keeps only free models', () => {
      const res = filterAndSortModels(models, 'free', caps)
      expect(res.map((m) => m.id)).toEqual(['free-a', 'free-b'])
    })

    test('paid filter keeps only paid models', () => {
      const res = filterAndSortModels(models, 'paid', caps)
      expect(res.map((m) => m.id)).toEqual(['paid-a', 'paid-b'])
    })

    test('handles empty input cleanly', () => {
      expect(filterAndSortModels([], 'all')).toEqual([])
    })
  })
})
