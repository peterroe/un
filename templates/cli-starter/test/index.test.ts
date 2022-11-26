import { describe, expect, it } from 'vitest'

describe('test', () => {
  it('should workd', () => {
    expect([1, 2, 3].map(it => it ** it)).toMatchInlineSnapshot(`
      [
        1,
        4,
        27,
      ]
    `)
  })
})
