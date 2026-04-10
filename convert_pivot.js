/**
 * Convert PIVOT -Global Process Analyzer Market.xlsx to value.json and volume.json
 * 
 * Structure per sheet:
 *   Geography rows (no col B number): Global, North America, U.S., Canada, Europe, etc.
 *   Segment type rows (no number):    By Analyzer Type, By Technology, etc.
 *   Skip rows:                        By Region, By Country (sections)
 *   Parent segment rows (no number):  Gas Analyzers, Oil and Gas
 *   Leaf data rows (have numbers):    Biogas, Liquid Analyzers, Spectroscopic, etc.
 */

const xlsx = require('xlsx');
const fs   = require('fs');

const EXCEL_FILE = 'PIVOT -Global Process Analyzer Market.xlsx';
const YEARS = ['2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033'];

// All geography names that appear as top-level entries in the Excel
const TOP_LEVEL_GEOS = new Set([
  'Global',
  'North America', 'U.S.', 'Canada',
  'Europe', 'Germany', 'France', 'Italy', 'Spain', 'Russia', 'Norway', 'UK',
  'Romania', 'Sweden', 'Finland', 'Poland', 'Croatia', 'Denmark', 'Rest of Europe',
  'Asia Pacific', 'China', 'India', 'Japan', 'South Korea', 'ASEAN', 'Australia', 'Rest of Asia Pacific',
  'Latin America', 'Brazil', 'Mexico', 'Argentina', 'Rest of Latin America',
  'Middle East & Africa', 'GCC', 'South Africa', 'Rest of Middle East & Africa'
]);

// Segment type rows to recognise
const SEGMENT_TYPES = new Set([
  'By Analyzer Type', 'By Technology', 'By Sampling Type',
  'By Installation Type', 'By Application', 'By End-use Industry'
]);

// Rows that introduce sections we skip entirely
const SKIP_SECTION_HEADERS = new Set(['By Region', 'By Country']);

// Known parent segments and their expected children (used to scope child rows)
const PARENT_CHILDREN = {
  'Gas Analyzers': new Set([
    'Biogas', 'Biomethane',
    'Emission Gases (NOx, SO₂)',
    'Hydrogen',
    'Industrial Gases (O₂, N₂, CO₂)',
    'Natural Gas',
    'Toxic & Hazardous Gases (H₂S, CO)'
  ]),
  'Oil and Gas': new Set(['Downstream', 'Midstream', 'Upstream'])
};

// Rename geography keys to match existing JSON / segmentation_analysis.json conventions
const GEO_NAME_MAP = {
  'UK': 'U.K.'
};

// Rename segment-type keys
const SEG_TYPE_MAP = {
  'By End-use Industry': 'By End Use Industry'
};

// Rename leaf / child keys (normalise subscript chars + "and" vs "&")
const KEY_MAP = {
  'Food and Beverage':                   'Food & Beverage',
  'Industrial Gases (O₂, N₂, CO₂)':     'Industrial Gases (O2, N2, CO2)',
  'Emission Gases (NOx, SO₂)':           'Emission Gases (NOx, SO2)',
  'Toxic & Hazardous Gases (H₂S, CO)':   'Toxic & Hazardous Gases (H2S, CO)'
};

function normalise(label) {
  return KEY_MAP[label] || label;
}

function parseSheet(sheetName) {
  const wb = xlsx.readFile(EXCEL_FILE);
  const ws = wb.Sheets[sheetName];
  const range = xlsx.utils.decode_range(ws['!ref']);

  const result = {};

  let currentGeo     = null;
  let currentSegType = null;
  let currentParent  = null;   // 'Gas Analyzers' or 'Oil and Gas' while collecting children
  let skipSection    = false;  // true while inside a By Region / By Country section

  for (let r = 17; r <= range.e.r; r++) {
    const cellA = ws[xlsx.utils.encode_cell({ r, c: 0 })];
    if (!cellA || cellA.v === null || cellA.v === undefined) continue;

    const rawLabel = String(cellA.v).trim();
    if (!rawLabel) continue;

    const cellB    = ws[xlsx.utils.encode_cell({ r, c: 1 })];
    const hasNumber = cellB && typeof cellB.v === 'number';

    // ── Label-only rows (no year value in col B) ────────────────────────────
    if (!hasNumber) {
      // Geography?
      if (TOP_LEVEL_GEOS.has(rawLabel)) {
        const geoKey = GEO_NAME_MAP[rawLabel] || rawLabel;
        currentGeo     = geoKey;
        currentSegType = null;
        currentParent  = null;
        skipSection    = false;
        if (!result[currentGeo]) result[currentGeo] = {};
        continue;
      }

      if (!currentGeo) continue;

      // Skip-section header?
      if (SKIP_SECTION_HEADERS.has(rawLabel)) {
        skipSection   = true;
        currentParent = null;
        continue;
      }

      // Segment type?
      if (SEGMENT_TYPES.has(rawLabel)) {
        skipSection    = false;
        currentParent  = null;
        const segKey   = SEG_TYPE_MAP[rawLabel] || rawLabel;
        currentSegType = segKey;
        if (!result[currentGeo][currentSegType]) result[currentGeo][currentSegType] = {};
        continue;
      }

      if (skipSection || !currentSegType) continue;

      // Parent segment (Gas Analyzers / Oil and Gas)?
      if (rawLabel in PARENT_CHILDREN) {
        currentParent = rawLabel;
        if (!result[currentGeo][currentSegType][currentParent]) {
          result[currentGeo][currentSegType][currentParent] = {};
        }
        continue;
      }

      // Any other label-only row inside a segment → reset parent context
      currentParent = null;
      continue;
    }

    // ── Data rows (year values present) ─────────────────────────────────────
    if (!currentGeo || !currentSegType || skipSection) continue;

    // Read all 13 year values
    const yearData = {};
    for (let i = 0; i < YEARS.length; i++) {
      const cell = ws[xlsx.utils.encode_cell({ r, c: 1 + i })];
      yearData[YEARS[i]] = (cell && typeof cell.v === 'number')
        ? parseFloat(cell.v.toFixed(3))
        : 0;
    }

    const mappedLabel = normalise(rawLabel);

    // Decide placement: child of currentParent, or direct child of segment type
    if (currentParent && PARENT_CHILDREN[currentParent].has(rawLabel)) {
      // This row IS a known child of the current parent
      result[currentGeo][currentSegType][currentParent][normalise(rawLabel)] = yearData;
    } else {
      // Direct child of segment type; also clear any parent context
      currentParent = null;
      result[currentGeo][currentSegType][mappedLabel] = yearData;
    }
  }

  return result;
}

// ── Main ────────────────────────────────────────────────────────────────────

function addParentTotals(data) {
  for (const geoKey of Object.keys(data)) {
    for (const segTypeKey of Object.keys(data[geoKey])) {
      const segTypeNode = data[geoKey][segTypeKey]
      for (const segKey of Object.keys(segTypeNode)) {
        const segNode = segTypeNode[segKey]
        if (typeof segNode !== 'object') continue
        const childKeys = Object.keys(segNode).filter(k => !/^\d{4}$/.test(k))
        const hasYearData = Object.keys(segNode).some(k => /^\d{4}$/.test(k))
        if (childKeys.length > 0 && !hasYearData) {
          // Pure parent container — compute year totals from children
          YEARS.forEach(y => {
            let total = 0
            childKeys.forEach(ck => {
              const child = segNode[ck]
              if (child && typeof child[y] === 'number') total += child[y]
            })
            segNode[y] = parseFloat(total.toFixed(3))
          })
        }
      }
    }
  }
  return data
}

console.log('Parsing Value sheet...');
const valueData = parseSheet('Value');
const geos = Object.keys(valueData);
console.log(`  Geographies found: ${geos.length}`);

console.log('\nAdding parent totals (Gas Analyzers, Oil and Gas)...');
addParentTotals(valueData);

console.log('\nParsing Volume sheet...');
const volumeData = parseSheet('Volume');
addParentTotals(volumeData);

// ── Verification: double-count check for Gas Analyzers in Global ─────────────
console.log('\n=== Verification: Global By Analyzer Type ===');
const globalAT = valueData['Global']?.['By Analyzer Type'] || {};
for (const [k, v] of Object.entries(globalAT)) {
  if (typeof v === 'object' && !v['2021']) {
    // parent — show children
    const children = Object.keys(v);
    const sum2021  = children.reduce((s, c) => s + (v[c]['2021'] || 0), 0);
    console.log(`  ${k} (parent): 2021 children sum = ${sum2021.toFixed(2)}`);
  } else {
    console.log(`  ${k} (leaf): 2021 = ${v['2021']}`);
  }
}

console.log('\n=== Verification: Global By End Use Industry ===');
const globalEU = valueData['Global']?.['By End Use Industry'] || {};
for (const [k, v] of Object.entries(globalEU)) {
  if (typeof v === 'object' && !v['2021']) {
    const children = Object.keys(v);
    const sum2021  = children.reduce((s, c) => s + (v[c]['2021'] || 0), 0);
    console.log(`  ${k} (parent): 2021 children sum = ${sum2021.toFixed(2)}`);
  } else {
    console.log(`  ${k} (leaf): 2021 = ${v['2021']}`);
  }
}

// ── Write output ──────────────────────────────────────────────────────────────
fs.writeFileSync('public/data/value.json',  JSON.stringify(valueData,  null, 2), 'utf8');
console.log('\nWrote public/data/value.json');

fs.writeFileSync('public/data/volume.json', JSON.stringify(volumeData, null, 2), 'utf8');
console.log('Wrote public/data/volume.json');

console.log('\nDone!');
