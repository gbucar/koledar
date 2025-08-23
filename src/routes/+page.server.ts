import fs from "fs";
import { parseHolidays } from "$lib/date";
import type { Date } from "$lib/date";

export const load = async () => {
  let holidays: Date[] = [];
  try {
    const holidaysString = await fs.readFileSync("./holidays.txt", {
      encoding: "utf8",
    });
    holidays = parseHolidays(holidaysString);
  } catch (error) {
    console.error("Error reading holidays.txt file, defaulting to no holidays");
    console.error(error);
  }

  return { holidays };
};
