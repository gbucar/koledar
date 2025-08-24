import fs from "fs";

export const load = async () => {
  let holidaysString;
  try {
    holidaysString = await fs.readFileSync("./holidays.txt", {
      encoding: "utf8",
    });
  } catch (error) {
    console.error("Error reading holidays.txt file, defaulting to no holidays");
    console.error(error);
  }

  return { holidaysString };
};
