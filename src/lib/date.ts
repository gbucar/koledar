// year:  full year:    any integer 2025, -321, 149
// month: full month:   1-12        3, 6, 12
// day  : day of month: 1-31        1, 15, 31

// integer division towards zero (positive values rounded down, negative values rounded up)
const iDiv = (a: number, b: number) => Math.trunc(a / b);

export class Date {
  year;
  month;
  day;
  repeats: string;

  constructor(year: number, month: number, day: number, repeats: string = "n") {
    this.year = year;
    this.month = month;
    this.day = day;
    this.repeats = repeats;
  }

  // parses string in format yyyy-mm-dd and returns Date object
  static fromString(date: string, repeats: string = "n"): Date {
    const [year, month, day] = date.split("-").map((x) => parseInt(x));
    return new Date(year, month, day, repeats);
  }

  // compares this to other Date, returns true if dates collide at any date
  compareTo(other: Date): boolean {
    return (
      (this.year === other.year ||
        this.repeats === "y" ||
        other.repeats === "y") &&
      (this.month === other.month ||
        this.repeats === "m" ||
        other.repeats === "m") &&
      (this.day === other.day || this.repeats === "d" || other.repeats === "d")
    );
  }

  // returns julian day number for selected date
  getJDN(year: number, month: number, day: number): number {
    return (
      iDiv(1461 * (year + 4800 + iDiv(month - 14, 12)), 4) +
      iDiv(367 * (month - 2 - 12 * iDiv(month - 14, 12)), 12) -
      iDiv(3 * iDiv(year + 4900 + iDiv(month - 14, 12), 100), 4) +
      day -
      32075
    );
  }

  // returns day of week for this Date (1-7)
  get dayOfWeek() {
    const jdn = this.getJDN(this.year, this.month, this.day);
    return (jdn % 7) + 1;
  }

  get dayOfWeekShortName() {
    return ["pon", "tor", "sre", "čet", "pet", "sob", "ned"][
      this.dayOfWeek - 1
    ];
  }

  get dayOfWeekLongName() {
    return [
      "ponedeljek",
      "torek",
      "sreda",
      "četrtek",
      "petek",
      "sobota",
      "nedelja",
    ][this.dayOfWeek - 1];
  }
}

const isLeapYear = (year: number): boolean => {
  if (year % 100 === 0) {
    return year % 400 === 0;
  }
  return year % 4 === 0;
};

const getNumOfDays = (year: number, month: number) => {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    daysInMonths[1] = 29;
  }
  return daysInMonths[month - 1];
};

// returns an array of days for this month
export const getDatesForMonth = (year: number, month: number): Date[] => {
  const numOfDays = getNumOfDays(year, month);
  const days = [];
  for (let day = 1; day <= numOfDays; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

export const padDates = (year, month, dates: Date[]): Date[] => {
  if (dates[0].dayOfWeek === 1) return dates;

  let previousYear = year;
  let previousMonth = month;

  if (month === 1) {
    previousYear -= 1;
    previousMonth = 12;
  } else {
    previousMonth -= 1;
  }

  const previousMonthDates = getDatesForMonth(previousYear, previousMonth);
  console.log(previousMonthDates);
  return [...previousMonthDates.slice(-(dates[0].dayOfWeek - 1)), ...dates];
};

export const getPaddedDates = (year, month) => {
  let dates = getDatesForMonth(year, month);
  return padDates(year, month, dates);
};

export const parseHolidays = (holidays: string): Date[] => {
  return holidays.split("\n").map((holiday) => {
    const [date, repeats] = holiday.split(" ");
    return Date.fromString(date, repeats);
  });
};

export const monthToString = (month: number): string =>
  [
    "januar",
    "febuar",
    "marec",
    "april",
    "maj",
    "junij",
    "julij",
    "avgust",
    "september",
    "oktober",
    "november",
    "december",
  ][month];
