export const dateHelperYear = (date: Date | string) => {
  try {
    const dateV = new Date(date);
    return dateV.getFullYear();
  } catch (err) {
    return '';
  }
};
export const dateHelperDMY = (date: Date | string) => {
  try {
    const dateV = new Date(date);
    return (
      dateV.getDate() +
      '.' +
      dateHelperDigitMonth(dateV.getMonth()) +
      '.' +
      dateV.getFullYear()
    );
  } catch (err) {
    return '';
  }
};

const dateHelperDigitMonth = (singleDigitMonth) => {
  return ('0' + (singleDigitMonth + 1)).slice(-2);
};
