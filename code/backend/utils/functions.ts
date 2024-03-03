import fs from "fs";

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const rewriteFileWithObject = (fileUrl: string, exercises: any) =>  fs.writeFileSync(fileUrl, JSON.stringify(exercises, null, 2), "utf8");

