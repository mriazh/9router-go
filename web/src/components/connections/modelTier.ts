export type ModelTierFilter = 'all' | 'free' | 'paid'

export function isModelFreeTier(
  _model: { id: string },
  caps?: { free?: boolean }
): boolean {
  return Boolean(caps?.free)
}

/**
 * Filters models by tier (all / free / paid) and stably sorts free models first,
 * with ties broken alphabetically by name (or id).
 */
export function filterAndSortModels<T extends { id: string; name?: string }>(
  models: T[],
  filter: ModelTierFilter,
  capsMap: Record<string, { free?: boolean }> = {}
): T[] {
  let list = models
  if (filter === 'free') {
    list = list.filter((m) => isModelFreeTier(m, capsMap[m.id]))
  } else if (filter === 'paid') {
    list = list.filter((m) => !isModelFreeTier(m, capsMap[m.id]))
  }

  return [...list].sort((a, b) => {
    const aFree = isModelFreeTier(a, capsMap[a.id])
    const bFree = isModelFreeTier(b, capsMap[b.id])
    if (aFree !== bFree) return aFree ? -1 : 1
    const nameA = a.name || a.id
    const nameB = b.name || b.id
    return nameA.localeCompare(nameB)
  })
}
