import { describe, it, expect } from 'vitest'
import { 
  ebcToHex, ebcToRgb, ebcToRgbObject, ebcToRgbArray,
  srmToHex, srmToRgb, srmToRgbObject, srmToRgbArray 
} from '../src/index.js'

describe('EBC Functions', () => {
  it('ebcToHex returns #rrggbb', () => {
    const result = ebcToHex(20)
    expect(result).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('ebcToRgb returns rgb(r, g, b)', () => {
    const result = ebcToRgb(20)
    expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
  })

  it('ebcToRgbObject returns { r, g, b } in [0, 255]', () => {
    const result = ebcToRgbObject(20)
    expect(result).toHaveProperty('r')
    expect(result).toHaveProperty('g')
    expect(result).toHaveProperty('b')
    expect(result.r).toBeGreaterThanOrEqual(0)
    expect(result.r).toBeLessThanOrEqual(255)
  })

  it('ebcToRgbArray returns [r, g, b]', () => {
    const result = ebcToRgbArray(20)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(3)
  })

  it('EBC 1 and EBC 80 produce different colors', () => {
    expect(ebcToHex(1)).not.toBe(ebcToHex(80))
  })
})

describe('SRM Functions', () => {
  it('SRM 10.152 ≈ EBC 20 — same Hex result', () => {
    const bySrm = srmToHex(20 / 1.97)
    const byEbc = ebcToHex(20)
    expect(bySrm).toBe(byEbc)
  })

  it('srmToHex returns hex', () => {
    expect(srmToHex(5)).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('srmToRgbObject returns object', () => {
    const color = srmToRgbObject(5)
    expect(color).toHaveProperty('r')
    expect(color).toHaveProperty('g')
    expect(color).toHaveProperty('b')
  })

  it('srmToRgb returns rgb(r, g, b)', () => {
    expect(srmToRgb(5)).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
  })

  it('srmToRgbArray returns [r, g, b]', () => {
    const result = srmToRgbArray(5)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(3)
  })
})

describe('ColorOptions (lightPath)', () => {
  it('lightPath 5 is darker than lightPath 1', () => {
    const pale = ebcToRgbObject(20, { lightPath: 1 })
    const dark = ebcToRgbObject(20, { lightPath: 5 })
    expect(pale.r + pale.g + pale.b).toBeGreaterThan(dark.r + dark.g + dark.b)
  })

  it('srmToHex accepts lightPath', () => {
    const c1 = srmToHex(10, { lightPath: 1 })
    const c5 = srmToHex(10, { lightPath: 5 })
    expect(c1).not.toBe(c5)
  })
})

describe('EBC Functions — edge cases', () => {
  it('throws RangeError on negative EBC', () => {
    expect(() => ebcToHex(-1)).toThrow(RangeError)
  })

  it('throws RangeError on NaN EBC', () => {
    expect(() => ebcToHex(NaN)).toThrow(RangeError)
  })

  it('throws RangeError on Infinity EBC', () => {
    expect(() => ebcToHex(Infinity)).toThrow(RangeError)
  })

  it('throws RangeError on invalid lightPath', () => {
    expect(() => ebcToHex(20, { lightPath: 0 })).toThrow(RangeError)
    expect(() => ebcToHex(20, { lightPath: -1 })).toThrow(RangeError)
  })
})
