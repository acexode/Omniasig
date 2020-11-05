export const genericErrorTexts = (
  errorMsg,
  additionalText = '',
  fullError = false
) => {
  const texts = [
    {
      classes: 'text-weight-medium mb-16',
      text: !fullError
        ? 'A fost identificată o problema: ' + errorMsg
        : errorMsg,
    },
  ];
  if (additionalText === '') {
    texts.push({
      classes: '',
      text: 'Te rugăm să iei legătura cu un reprezentant OMNIASIG.',
    });
  } else if (additionalText) {
    texts.push({
      classes: '',
      text: additionalText,
    });
  }
  return texts;
};
