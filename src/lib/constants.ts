export const PAY_LEVELS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

// Pay matrix based on 7th CPC
const PAY_MATRIX: Record<number, number[]> = {
  1: [18000, 18500, 19100, 19700, 20300, 20900, 21500, 22100, 22800, 23500],
  2: [19900, 20500, 21100, 21700, 22400, 23100, 23800, 24500, 25200, 26000],
  3: [21700, 22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400],
  4: [25500, 26300, 27100, 27900, 28700, 29600, 30500, 31400, 32300, 33300],
  5: [29200, 30100, 31000, 31900, 32900, 33900, 34900, 35900, 37000, 38100],
  6: [35400, 36500, 37600, 38700, 39900, 41100, 42300, 43600, 44900, 46200],
  7: [44900, 46200, 47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600],
  8: [47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600, 60400, 62200],
  9: [53100, 54700, 56300, 58000, 59700, 61500, 63300, 65200, 67200, 69200],
  10: [56100, 57800, 59500, 61300, 63100, 65000, 67000, 69000, 71100, 73200],
  11: [67700, 69700, 71800, 74000, 76200, 78500, 80900, 83300, 85800, 88400],
  12: [78800, 81200, 83600, 86100, 88700, 91400, 94100, 96900, 99800, 102800],
  13: [
    118500, 122100, 125800, 129600, 133500, 137500, 141600, 145800, 150200,
    154700,
  ],
  14: [
    144200, 148500, 153000, 157600, 162300, 167200, 172200, 177400, 182700,
    188200,
  ],
  15: [
    182200, 187700, 193300, 199100, 205100, 211300, 217600, 224100, 230800,
    237600,
  ],
  16: [
    205400, 211600, 218000, 224600, 231400, 238400, 245600, 252900, 260400,
    268100,
  ],
  17: [
    225000, 231800, 238700, 245800, 253100, 260600, 268300, 276300, 284500,
    292900,
  ],
  18: [250000],
};

export function getBasicPayOptions(payLevel: number): number[] {
  return PAY_MATRIX[payLevel] || [];
}

// Future pay matrices could be loaded from CSV files
export const FUTURE_PAY_MATRICES = {
  2026: {}, // Would be populated from pay_matrix_2026.csv
  2036: {}, // Would be populated from pay_matrix_2036.csv
  2046: {}, // Would be populated from pay_matrix_2046.csv
  2056: {}, // Would be populated from pay_matrix_2056.csv
};

// Constants for pension calculation
export const RETIREMENT_AGE = 60;
export const GRATUITY_FACTOR = 16.5; // 16.5 days per year of service
export const MAX_GRATUITY_MONTHS = 20; // Maximum 20 months
export const COMMUTATION_PERCENTAGE = 40; // 40% of pension can be commuted
export const COMMUTATION_FACTOR = 8.194; // For age 60
export const MAX_LEAVE_ENCASHMENT_DAYS = 300;
export const INFLATION_RATE = 0.04; // 4% annual inflation
export const DA_ANNUAL_INCREASE = 0.05; // 5% annual increase in DA
