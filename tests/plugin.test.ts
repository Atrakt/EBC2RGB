import { describe, it, expect } from 'vitest'
import { beerColorPlugin } from '../src/plugin.js'

describe('beerColorPlugin', () => {
  it('returns a function (Tailwind plugin shape)', () => {
    const plugin = beerColorPlugin()
    expect(typeof plugin).toBe('function')
  })

  it('addUtilities receives ebc-bg-20 with correct hex (at default lightPath=5)', () => {
    const plugin = beerColorPlugin({ ebcRange: [20, 20], srmRange: false })
    const utilities: Record<string, any> = {}
    plugin({ addUtilities: (u: any) => Object.assign(utilities, u), matchUtilities: () => {} } as any)
    
    // EBC 20 à 5cm est plus sombre que #d88900 (valeur à 3cm)
    const hex = utilities['.ebc-bg-20'].backgroundColor
    expect(hex).toMatch(/^#[0-9a-f]{6}$/)
    expect(hex).not.toBe('#d88900')
  })

  it('addUtilities receives srm classes when srmRange set', () => {
    const plugin = beerColorPlugin({ ebcRange: false, srmRange: [10, 10] })
    const utilities: Record<string, any> = {}
    plugin({ addUtilities: (u: any) => Object.assign(utilities, u), matchUtilities: () => {} } as any)
    expect(utilities['.srm-bg-10']).toBeDefined()
    expect(utilities['.srm-10']).toBeDefined()
  })

  it('lightPath option affects output color', () => {
    const p3 = beerColorPlugin({ ebcRange: [20, 20], srmRange: false, lightPath: 3 })
    const p5 = beerColorPlugin({ ebcRange: [20, 20], srmRange: false, lightPath: 5 })
    const u3: Record<string, any> = {}
    const u5: Record<string, any> = {}
    p3({ addUtilities: (u: any) => Object.assign(u3, u), matchUtilities: () => {} } as any)
    p5({ addUtilities: (u: any) => Object.assign(u5, u), matchUtilities: () => {} } as any)
    expect(u3['.ebc-bg-20']).not.toEqual(u5['.ebc-bg-20'])
    expect(u3['.ebc-bg-20'].backgroundColor).toBe('#d88900')
  })

  it('matchUtilities returns empty object for invalid arbitrary value', () => {
    const plugin = beerColorPlugin({ ebcRange: false, srmRange: false })
    let capturedMatchers: Record<string, (v: string) => Record<string, string>> = {}
    plugin({
      addUtilities: () => {},
      matchUtilities: (u: any) => { capturedMatchers = u },
    } as any)
    expect(capturedMatchers['ebc']('abc')).toEqual({})
    expect(capturedMatchers['ebc-bg']('NaN')).toEqual({})
    expect(capturedMatchers['srm']('')).toEqual({})
  })
})
