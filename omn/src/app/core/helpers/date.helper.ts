export const dateHelperYear = (date: Date | string) => {
  try {
    const dateV = new Date(date);
    return dateV.getFullYear();
  } catch (err) {
    return '';
  }
};
