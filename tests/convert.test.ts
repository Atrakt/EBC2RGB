import { describe, it, expect } from 'vitest'
import { ebcToRgbArray } from '../src/convert'

describe('ebcToRgbArray', () => {
  it('EBC 1 produces a very pale color (R > 200)', () => {
    const [r, g, b] = ebcToRgbArray(1, 5.0)
    expect(r).toBeGreaterThan(200)
    expect(r).toBeLessThanOrEqual(255)
    expect(g).toBeGreaterThan(150)
    expect(b).toBeGreaterThan(50)
  })

  it('EBC 20 at 3cm matches reference output (#d88900)', () => {
    const [r, g, b] = ebcToRgbArray(20, 3.0)
    expect(r).toBe(216)
    expect(g).toBe(137)
    expect(b).toBe(0)
  })

  it('EBC 80 at 3cm matches reference output (#690600)', () => {
    const [r, g, b] = ebcToRgbArray(80, 3.0)
    expect(r).toBe(105)
    expect(g).toBe(6)
    expect(b).toBe(0)
  })

  it('returns integers in [0, 255] for EBC 1–80', () => {
    for (const ebc of [1, 5, 10, 20, 40, 80]) {
      const [r, g, b] = ebcToRgbArray(ebc, 5.0)
      for (const c of [r, g, b]) {
        expect(c).toBeGreaterThanOrEqual(0)
        expect(c).toBeLessThanOrEqual(255)
        expect(Number.isInteger(c)).toBe(true)
      }
    }
  })

  it('longer path produces darker color (3.0 vs 5.0 cm)', () => {
    const rgb3 = ebcToRgbArray(10, 3.0)
    const rgb5 = ebcToRgbArray(10, 5.0)
    expect(rgb5[0]).toBeLessThanOrEqual(rgb3[0])
  })
})

describe('ebcToRgbArray — edge cases', () => {
  it('EBC 0 returns a valid very pale color', () => {
    const [r, g, b] = ebcToRgbArray(0, 5.0)
    for (const c of [r, g, b]) {
      expect(c).toBeGreaterThanOrEqual(0)
      expect(c).toBeLessThanOrEqual(255)
      expect(Number.isInteger(c)).toBe(true)
    }
    expect(r).toBeGreaterThan(200)
  })

  it('EBC 120 (above typical range) returns valid integers', () => {
    const [r, g, b] = ebcToRgbArray(120, 5.0)
    for (const c of [r, g, b]) {
      expect(c).toBeGreaterThanOrEqual(0)
      expect(c).toBeLessThanOrEqual(255)
      expect(Number.isInteger(c)).toBe(true)
    }
  })

  it('throws RangeError on negative EBC', () => {
    expect(() => ebcToRgbArray(-1, 5.0)).toThrow(RangeError)
  })

  it('throws RangeError on NaN EBC', () => {
    expect(() => ebcToRgbArray(NaN, 5.0)).toThrow(RangeError)
  })

  it('throws RangeError on Infinity EBC', () => {
    expect(() => ebcToRgbArray(Infinity, 5.0)).toThrow(RangeError)
  })

  it('throws RangeError on zero pathCm', () => {
    expect(() => ebcToRgbArray(20, 0)).toThrow(RangeError)
  })

  it('throws RangeError on negative pathCm', () => {
    expect(() => ebcToRgbArray(20, -1)).toThrow(RangeError)
  })

  it('throws RangeError on NaN pathCm', () => {
    expect(() => ebcToRgbArray(20, NaN)).toThrow(RangeError)
  })
})
