# Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.3.1] - 2026-04-24
### Changed
- README: fixed Table of Contents (removed self-referencing entries).
- README: updated project structure tree (added `tests/`, aligned with `.gitignore`).
- README: added live demo link (https://atrakt.github.io/beer-color-css-demo).
- README: added npm version badge.

## [0.3.0] - 2026-04-24
### Added
- SRM support: `srmToHex()`, `srmToRgb()`, `srmToRgbObject()`, `srmToRgbArray()` — converts SRM values using the same A.J. de Lange spectral model.
- Tailwind CSS plugin: `beerColorPlugin()` — generates `ebc-bg-{n}` and `srm-bg-{n}` utility classes with arbitrary value support.
- Extended public API: `ebcToHex()`, `ebcToRgbObject()`, `ebcToRgbArray()` exported alongside `ebcToRgb()`.
- `engines` field in `package.json`: requires Node.js ≥ 18.

### Fixed
- Core: `pathCm` parameter now validated — throws `RangeError` on non-positive or non-finite values.
- CLI: `parseRange` validates both bounds (`Number.isFinite`, `a ≤ b`) before iterating; single-value handler uses `Number.isFinite` consistently.
- Tailwind plugin: arbitrary value handler (`ebc-bg-[n]`, `srm-bg-[n]`) guards against non-finite `parseFloat` results.
- Docstring in `convert.ts`: corrected default path reference (was 3.0, is 5.0).

### Changed
- Author name uniformized to "A.J. de Lange" across all source files, comments, and documentation.
- `prettierrc`: `printWidth` reduced from 400 to 120.
- `tsconfig.json`: removed dead `"demo"` entry from `exclude`.

## [0.2.0] - 2026-04-13
### Added
- TypeScript port of `gen_css_delange.py` — 100% output parity verified across EBC 1–80.
- `ebcToRgb()` public API with `hex` (default), `rgb`, and `object` output formats.
- A.J. de Lange spectral model: Beer-Lambert double-exponential, CIE 1931 2° observer, D65 illuminant, sRGB gamma (IEC 61966-2-1 matrix at 7-decimal precision).
- Input validation: `RangeError` on negative or non-finite EBC values.
- Pre-gamma clamp on linear sRGB channels (matches Python source behavior).
- CLI: single-value conversion and batch CSS/JSON generation with configurable EBC range.
- Unit tests with exact RGB values pinned to the reference Python output.
- `tsconfig.test.json` for type-checking test files independently of the build.

## [0.1.0] - 2026-04-12
### Added
- Initial project setup: `package.json`, `tsconfig.json`, empty source stubs.
- Build pipeline: tsup (ESM + CJS + TypeScript declarations), vitest, tsx.
- `.gitignore` with `node_modules/`, `dist/`, `*.log`, `coverage/`.

[Unreleased]: https://github.com/Atrakt/beer-color-css/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/Atrakt/beer-color-css/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Atrakt/beer-color-css/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Atrakt/beer-color-css/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Atrakt/beer-color-css/releases/tag/v0.1.0
