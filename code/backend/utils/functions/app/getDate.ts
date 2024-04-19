const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
};

export default getDate
