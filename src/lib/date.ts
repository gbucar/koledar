// year:  full year:    any integer 2025, -321, 149
// month: full month:   1-12        3, 6, 12
// day  : day of month: 1-31        1, 15, 31

export type Date = {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
};

const isLeapYear = (year: number): boolean => {
  if (year % 100 === 0) {
    return year % 400 === 0;
  }
  return year % 4 === 0;
};

// integer division towards zero (positive values rounded down, negative values rounded up)
const iDiv = (a: number, b: number) => Math.trunc(a / b);

// returns julian day number for selected date
const getJDN = (year: number, month: number, day: number) =>
  iDiv(1461 * (year + 4800 + iDiv(month - 14, 12)), 4) +
  iDiv(367 * (month - 2 - 12 * iDiv(month - 14, 12)), 12) -
  iDiv(3 * iDiv(year + 4900 + iDiv(month - 14, 12), 100), 4) +
  day -
  32075;

const getDayOfWeek = (year: number, month: number, day: number) => {
  const jdn = getJDN(year, month, day);
  return (jdn % 7) + 1;
};

const getNumOfDays = (year: number, month: number) => {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    daysInMonths[1] = 29;
  }
  return daysInMonths[month - 1];
};

// returns an array of days for this month
export const getDates = (year: number, month: number): Date[] => {
  const numOfDays = getNumOfDays(year, month);
  const days = [];
  for (let day = 1; day <= numOfDays; day++) {
    days.push({
      year,
      month,
      day,
      dayOfWeek: getDayOfWeek(year, month, day),
    });
  }
  return days;
};

const parseDate = (date: string): Date => {
  const [year, month, day] = date.split("-").map((x) => parseInt(x));
  return {
    year,
    month,
    day,
    dayOfWeek: getDayOfWeek(year, month, day),
  };
};

export const parseHolidays = (holidays: string): Date[] => {
  return holidays.split("\n").map((holiday) => {
    const [date, repeats] = holiday.split(" ");
    return parseDate(date);
  });
};
