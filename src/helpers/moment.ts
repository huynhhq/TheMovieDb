import moment from 'moment';

// Get UTC moment
const utcMoment = (
  input?: moment.MomentInput,
  format?: moment.MomentFormatSpecification,
  strict?: boolean
) => {
  return moment.utc(input, format, strict);
};

// Format UTC date to ISO string
const toISOString = (date: moment.MomentInput): string => {
  return utcMoment(date).toISOString();
};

// Format UTC date to specific format
const format = (date: moment.MomentInput, formatString: string): string => {
  return utcMoment(date).format(formatString);
};

// Get current UTC date
const now = (): moment.Moment => {
  return utcMoment();
};

// Add time to UTC date
const add = (
  date: moment.MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationAs
): moment.Moment => {
  return utcMoment(date).add(amount, unit);
};

// Subtract time from UTC date
const subtract = (
  date: moment.MomentInput,
  amount: number,
  unit: moment.unitOfTime.DurationAs
): moment.Moment => {
  return utcMoment(date).subtract(amount, unit);
};

// Check if date is valid
const isValid = (date: moment.MomentInput): boolean => {
  return utcMoment(date).isValid();
};

// Compare two UTC dates
const isBefore = (date1: moment.MomentInput, date2: moment.MomentInput): boolean => {
  return utcMoment(date1).isBefore(utcMoment(date2));
};

const isAfter = (date1: moment.MomentInput, date2: moment.MomentInput): boolean => {
  return utcMoment(date1).isAfter(utcMoment(date2));
};

const isSame = (
  date1: moment.MomentInput,
  date2: moment.MomentInput,
  unit?: moment.unitOfTime.StartOf
): boolean => {
  return utcMoment(date1).isSame(utcMoment(date2), unit);
};

export { utcMoment, toISOString, format, now, add, subtract, isValid, isBefore, isAfter, isSame };
