import { ebcToHex, srmToHex } from './index.js'
import type { ColorOptions } from './index.js'

interface PluginOptions {
  ebcRange?: [number, number] | false  // default [1, 80]
  srmRange?: [number, number] | false  // default [1, 40]
  lightPath?: number                   // default 5
}

interface TailwindHelpers {
  addUtilities: (utilities: Record<string, Record<string, string>>) => void
  matchUtilities: (utilities: Record<string, (value: string) => Record<string, string>>) => void
}

export function beerColorPlugin(options: PluginOptions = {}) {
  const {
    ebcRange = [1, 80],
    srmRange = [1, 40],
    lightPath = 5,
  } = options
  const colorOpts: ColorOptions = { lightPath }

  return function({ addUtilities, matchUtilities }: TailwindHelpers): void {
    const utilities: Record<string, Record<string, string>> = {}

    if (ebcRange) {
      for (let ebc = ebcRange[0]; ebc <= ebcRange[1]; ebc++) {
        const hex = ebcToHex(ebc, colorOpts)
        utilities[`.ebc-${ebc}`] = { color: hex }
        utilities[`.ebc-bg-${ebc}`] = { backgroundColor: hex }
      }
    }

    if (srmRange) {
      for (let srm = srmRange[0]; srm <= srmRange[1]; srm++) {
        const hex = srmToHex(srm, colorOpts)
        utilities[`.srm-${srm}`] = { color: hex }
        utilities[`.srm-bg-${srm}`] = { backgroundColor: hex }
      }
    }

    addUtilities(utilities)

    // Arbitrary values: ebc-bg-[35], srm-[10]
    matchUtilities({
      'ebc':    (v): Record<string, string> => { const n = parseFloat(v); return Number.isFinite(n) ? { color: ebcToHex(n, colorOpts) } : {} },
      'ebc-bg': (v): Record<string, string> => { const n = parseFloat(v); return Number.isFinite(n) ? { backgroundColor: ebcToHex(n, colorOpts) } : {} },
      'srm':    (v): Record<string, string> => { const n = parseFloat(v); return Number.isFinite(n) ? { color: srmToHex(n, colorOpts) } : {} },
      'srm-bg': (v): Record<string, string> => { const n = parseFloat(v); return Number.isFinite(n) ? { backgroundColor: srmToHex(n, colorOpts) } : {} },
    })
  }
}
