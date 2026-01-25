export const BASE_URL = 'https://www.pbr.com';

export const URLS = {
  HOME: BASE_URL,
  ATHLETES: `${BASE_URL}/athletes`,
  ROOKIE_OF_YEAR: `${BASE_URL}/athletes/riders/rookie-of-the-year/`,
  BULL_STANDINGS: `${BASE_URL}/athletes/bulls/standings/`,
  MVP_RACE: `${BASE_URL}/standings/teams/mvp-race/`,
  EVENT_SCHEDULE: `${BASE_URL}/events`,
} as const;

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 60000,
  NAVIGATION: 60000,
} as const;

export const SELECTORS = {
  COOKIE_BANNER: '#onetrust-accept-btn-handler',
  ATHLETE_HEAD: '.athleteHead',
  ATHLETE_BLOCK: '.athleteBlock',
  STANDINGS_TABLE: '#standingsTable',
} as const;