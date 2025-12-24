import moment from 'moment';
import {utcMoment} from './moment';

function calculateDaysBetweenDates(startDate: string, endDate: string): number {
  const start = moment(startDate);
  const end = moment(endDate);

  const dayDifference = end.diff(start, 'days');

  return Math.abs(dayDifference);
}

function formatDate(dateString: string, format: string = 'YYYY-MM-DD'): string {
  return moment(dateString).format(format);
}

function dateToISOString(date?: Date | string | null) {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
}

const defaultStartDate = moment()
  .startOf('day')
  .add(30 - 1, 'days')
  .format(); // + 30 days from today's date

const defaultEndDate = moment(defaultStartDate)
  .startOf('day')
  .add(7 - 1, 'days')
  .format(); // + 7 days after start date

const modifiedDateToISOString = (date?: Date | string | null) => {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
};

const formatDate3ToDisplay = (date?: Date | string): string => {
  if (!date) return '--';
  return moment(date).format('YYYY-MM-DD');
};

const formatDateAndTime = (
  date?: Date | string | null,
  time?: string | null,
) => {
  if (!date) return '';
  return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').format(
    'YYYY-MM-DD HH:mm',
  );
};

/**
 * Convert number to string with length equal 2 and start with '0'
 * @param num
 * @returns Returns: '01'
 */
const padTo2Digits = (num: number) => num.toString().padStart(2, '0');
const convertedToHoursAndMinutes = (
  duration?: number | string,
  {
    isShort = false,
    isShorter = false,
  }: {isShort?: boolean; isShorter?: boolean} = {},
) => {
  if (duration === 0) {
    return null;
  }
  const hr = Math.floor(Number(duration) / 60);
  const mins = Math.floor(Number(duration) % 60);
  if (hr > 0 && mins === 0) {
    if (isShorter) {
      return `${padTo2Digits(hr)}h`;
    }
    if (isShort) {
      return `${padTo2Digits(hr)} ${hr === 1 ? 'hr' : 'hrs'}`;
    }
    return `${padTo2Digits(hr)} ${hr === 1 ? 'hour' : 'hours'}`;
  }
  if (hr === 0 && mins > 0) {
    if (isShorter) {
      return `${padTo2Digits(mins)}m`;
    }
    if (isShort) {
      return `${padTo2Digits(mins)} ${mins === 1 ? 'min' : 'mins'}`;
    }
    return `${padTo2Digits(mins)} ${mins === 1 ? 'minute' : 'minutes'}`;
  }
  if (isShorter) {
    return `${padTo2Digits(hr)}h ${padTo2Digits(mins)}m`;
  }
  if (isShort) {
    return `${padTo2Digits(hr)} ${hr === 1 ? 'hr' : 'hrs'} ${padTo2Digits(
      mins,
    )} ${mins === 1 ? 'min' : 'mins'}`;
  }
  return `${padTo2Digits(hr)} ${hr === 1 ? 'hour' : 'hours'} ${padTo2Digits(
    mins,
  )} ${mins === 1 ? 'minute' : 'minutes'}`;
};

export const convertedToHoursAndMinutes2 = (duration?: number | string) => {
  if (duration === 0) {
    return null;
  }
  const hr = Math.floor(Number(duration) / 60);
  const mins = Math.floor(Number(duration) % 60);
  if (hr > 0 && mins === 0) {
    return `${padTo2Digits(hr)} ${hr === 1 ? 'hour' : 'hours'}`;
  }
  if (hr === 0 && mins > 0) {
    return `${padTo2Digits(mins)} mins`;
  }
  return `${padTo2Digits(hr)} ${hr === 1 ? 'hour' : 'hours'} ${padTo2Digits(
    mins,
  )} ${mins === 1 ? 'min' : 'mins'}`;
};

const convertedToHoursAndMinutesInShort = (duration?: number | string) => {
  if (duration === 0) {
    return null;
  }
  const hr = Math.floor(Number(duration) / 60);
  const mins = Math.floor(Number(duration) % 60);
  if (hr > 0 && mins === 0) {
    return `${hr}h`;
  }
  if (hr === 0 && mins > 0) {
    return `${mins}m`;
  }
  return `${hr}h ${mins}m`;
};

function convertH2M(timeInHour?: string) {
  if (timeInHour) {
    const timeParts = timeInHour?.split(':') ?? [];
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }
  return 0;
}

const convertM2H = (totalMinutes?: number | string) => {
  const minutes = Math.round(Number(totalMinutes) % 60);
  const hours = Math.floor(Number(totalMinutes) / 60);
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

const formatDate2ToDisplay = (date?: Date | string): string => {
  if (!date) return '--';
  return moment(date).format('DD MMM YYYY, ddd');
};

const calculateDateTime = (date: string, time: string) => {
  try {
    // Combine the date and time strings
    const dateTime: string = `${date}T${time}`;

    // Convert the combined string to a Date object
    const dateObj: Date = new Date(dateTime);

    // Validate the date
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date created in calculateDateTime:', dateTime);
      return new Date().toISOString(); // Return current date as fallback
    }

    // Get the ISO 8601 string representation with the time component
    const isoString: string = dateObj?.toISOString();

    return isoString;
  } catch (error) {
    console.error(
      'Error in calculateDateTime:',
      error,
      'date:',
      date,
      'time:',
      time,
    );
    return new Date().toISOString(); // Return current date as fallback
  }
};

const calculateDaysNights = (startDateTime: string, endDateTime: string) => {
  // To calculate the number of nights between two dates and times, you can use the following logic:

  // Start Date and Time: 2024-08-09 14:00
  // End Date and Time: 2024-08-14 12:00

  // To calculate the number of nights:
  // Day 1: From 14:00 on 2024-08-09 to 14:00 on 2024-08-10 = 1 night
  // Day 2: From 14:00 on 2024-08-10 to 14:00 on 2024-08-11 = 1 night
  // Day 3: From 14:00 on 2024-08-11 to 14:00 on 2024-08-12 = 1 night
  // Day 4: From 14:00 on 2024-08-12 to 14:00 on 2024-08-13 = 1 night
  // Day 5: From 14:00 on 2024-08-13 to 14:00 on 2024-08-14 = 1 night
  // Although you check out at 12:00 on 2024-08-14, it still counts as a full night since the check-in time on 2024-08-09 was at 14:00.

  // So, the total number of nights is indeed 5.

  // Define the start and end dates with times
  const startDate: Date = new Date(startDateTime);
  const endDate: Date = new Date(endDateTime);

  // Calculate the difference in time (in milliseconds)
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert the difference in time to days
  const totalDays: number = timeDifference / (1000 * 60 * 60 * 24);

  // Since the check-out time is before the check-in time on the last day, round down
  const numberOfNights: number = Math.ceil(totalDays);
  const numberOfDays: number = numberOfNights + 1;

  // Format the duration as "X days Y nights"
  const duration = `${numberOfDays} days ${numberOfNights} nights`;

  return duration;
};

interface IGetDaysNights {
  checkInDate?: string;
  checkInTime?: string;
  checkOutDate?: string;
  checkOutTime?: string;
}

const getDaysNights = ({
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
}: IGetDaysNights) => {
  const defaultCheckInDate = '2023-06-30';
  const defaultCheckInTime = '14:00';
  const defaultCheckOutDate = '2023-07-01';
  const defaultCheckOutTime = '12:00';

  const calcCheckIn = calculateDateTime(
    utcMoment(checkInDate).format('YYYY-MM-DD') || defaultCheckInDate,
    checkInTime || defaultCheckInTime,
  );
  const calcCheckOut = calculateDateTime(
    utcMoment(checkOutDate).format('YYYY-MM-DD') || defaultCheckOutDate,
    checkOutTime || defaultCheckOutTime,
  );
  return calculateDaysNights(calcCheckIn, calcCheckOut);
};

/**
 * Format date range based on whether start and end dates are in the same month/year
 * If same month and year: "Oct 25 - 28"
 * If different month or year: "Oct 25 - Sep 28"
 * @param startDate - Start date (Date or string)
 * @param endDate - End date (Date or string)
 * @returns Formatted date range string
 */
const formatDateRange = (
  startDate?: Date | string,
  endDate?: Date | string,
): string => {
  if (!startDate || !endDate) return '--';

  const startMoment = utcMoment(startDate);
  const endMoment = utcMoment(endDate);

  // Check if same month and year
  const isSameMonth = startMoment.month() === endMoment.month();
  const isSameYear = startMoment.year() === endMoment.year();

  if (isSameMonth && isSameYear) {
    // Same month and year: "Oct 25 - 28"
    const startFormatted = startMoment.format('MMM DD');
    const endDay = endMoment.format('DD');
    return `${startFormatted} - ${endDay}`;
  } else {
    // Different month or year: "Oct 25 - Sep 28"
    const startFormatted = startMoment.format('MMM DD');
    const endFormatted = endMoment.format('MMM DD');
    return `${startFormatted} - ${endFormatted}`;
  }
};

/**
 * Generates 30-minute time slots between start and end time.
 * @param start - string in 'HH:mm' format
 * @param end - string in 'HH:mm' format
 * @param interval - number of minutes for each slot (default 30)
 * @returns Array of time slot objects
 */
const generateTimeSlots = (
  start: string,
  end: string,
  interval: number = 30,
): Array<{type: 'hour'; from: string; until: string; value: number}> => {
  const result: Array<{
    type: 'hour';
    from: string;
    until: string;
    value: number;
  }> = [];
  const [startHour, startMinute] = start.split(':').map(Number) ?? [0, 0];
  const [endHour, endMinute] = end.split(':').map(Number) ?? [0, 0];

  let current = new Date(0, 0, 0, startHour, startMinute);
  const endTime = new Date(0, 0, 0, endHour, endMinute);

  while (current < endTime) {
    const from = current.toTimeString().slice(0, 5); // 'HH:mm'
    const next = new Date(current.getTime() + interval * 60000);
    const until =
      next < endTime
        ? next.toTimeString().slice(0, 5)
        : endTime.toTimeString().slice(0, 5);

    result.push({
      type: 'hour',
      from,
      until,
      value: interval,
    });

    current = next;
  }

  return result;
};

const formatDateToDisplay = (date?: Date | string): string => {
  if (!date) return '--';
  return utcMoment(date).format('DD MMM YYYY');
};

const formatDate4ToDisplay = (date?: Date | string): string => {
  if (!date) return '--';
  return utcMoment(date).format('MMM DD, YYYY');
};

export {
  defaultStartDate,
  defaultEndDate,
  formatDate,
  convertH2M,
  convertM2H,
  getDaysNights,
  dateToISOString,
  formatDateRange,
  formatDateAndTime,
  generateTimeSlots,
  calculateDateTime,
  formatDateToDisplay,
  calculateDaysNights,
  formatDate4ToDisplay,
  formatDate2ToDisplay,
  formatDate3ToDisplay,
  modifiedDateToISOString,
  calculateDaysBetweenDates,
  convertedToHoursAndMinutes,
  convertedToHoursAndMinutesInShort,
};
