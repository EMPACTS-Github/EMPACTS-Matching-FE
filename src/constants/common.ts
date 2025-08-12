export const LANGUAGE_SPOKEN = {
  EN: 'English',
  VI: 'Vietnamese',
  JA: 'Japanese',
  ZH: 'Chinese',
  KO: 'Korean',
  FR: 'French',
  DE: 'German',
  ES: 'Spanish',
  PT: 'Portuguese',
  RU: 'Russian',
  IT: 'Italian',
  AR: 'Arabic',
  HI: 'Hindi',
  TH: 'Thai',
  ID: 'Indonesian',
  TR: 'Turkish',
  NL: 'Dutch',
  PL: 'Polish',
  SV: 'Swedish',
  EL: 'Greek',
  HE: 'Hebrew',
  MS: 'Malay',
  BN: 'Bengali',
  UK: 'Ukrainian',
  RO: 'Romanian',
  CS: 'Czech',
  HU: 'Hungarian',
  SK: 'Slovak',
  FI: 'Finnish',
  NO: 'Norwegian',
  DA: 'Danish',
} as const;

export const SDGS = {
  NO_POVERTY: 'No Poverty',
  ZERO_HUNGER: 'Zero Hunger',
  GOOD_HEALTH_AND_WELL_BEING: 'Good Health and Well Being',
  QUALITY_EDUCATION: 'Quality Education',
  GENDER_EQUALITY: 'Gender Equality',
  CLEAN_WATER_AND_SANITATION: 'Clean Water and Sanitation',
  AFFORDABLE_AND_CLEAN_ENERGY: 'Affordable and Clean Energy',
  DECENT_WORK_AND_ECONOMIC_GROWTH: 'Decent Work and Economic Growth',
  INDUSTRY_INNOVATION_AND_INFRASTRUCTURE: 'Industry Innovation and Infrastructure',
  REDUCED_INEQUALITIES: 'Reduced Inequalities',
  SUSTAINABLE_CITIES_AND_COMMUNITIES: 'Sustainable Cities and Communities',
  RESPONSIBLE_CONSUMPTION_AND_PRODUCTION: 'Responsible Consumption and Production',
  CLIMATE_ACTION: 'Climate Action',
  LIFE_BELOW_WATER: 'Life Below Water',
  LIFE_ON_LAND: 'Life on Land',
  PEACE_JUSTICE_AND_STRONG_INSTITUTIONS: 'Peace, Justice and Strong Institutions',
  PARTNERSHIPS_FOR_THE_GOALS: 'Partnerships for the Goals',
} as const;

export type LanguageSpokenCode = keyof typeof LANGUAGE_SPOKEN;
export type LanguagesSpoken = LanguageSpokenCode[];

export type SDGCode = keyof typeof SDGS;
export type SDGs = SDGCode[];
