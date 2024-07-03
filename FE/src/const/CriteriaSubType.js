import CriteriaType from './CriteriaType';

export const CriteriaSubType = {
  Equals: 'Equals',
  More: 'More',
  Less: 'Less',
  'Starts with': 'StartsWith',
  'Ends with': 'EndsWith',
  From: 'From',
  To: 'To',
}

export const CriteriaTypeToSubType = {
  [CriteriaType.Amount]: {
    Equals: 'Equals',
    More: 'More',
    Less: 'Less',
  },
  [CriteriaType.Title]: {
    Equals: 'Equals',
    'Starts with': 'StartsWith',
    'Ends with': 'EndsWith',
  },
  [CriteriaType.Date]: {
    Equals: 'Equals',
    From: 'From',
    To: 'To',
  }
}
