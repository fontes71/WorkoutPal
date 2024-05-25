export const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
};

export default getDate
