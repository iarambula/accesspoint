import { describe, expect, it } from 'vitest'
import { sortFeedItems, FeedItem } from './page'

describe('sortFeedItems', () => {
  it('sorts feed items by isoDate descending', () => {
    const items: FeedItem[] = [
      { guid: '1', isoDate: '2020-01-01T00:00:00.000Z' },
      { guid: '2', isoDate: '2021-06-01T00:00:00.000Z' },
      { guid: '3', isoDate: '2019-12-31T00:00:00.000Z' },
    ]

    const sorted = sortFeedItems(items)
    expect(sorted.map(i => i.guid)).toEqual(['2', '1', '3'])
  })
})
