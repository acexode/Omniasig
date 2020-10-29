export const genericErrorTexts = (errorMsg, additionalText = '') => {
  const texts = [
    {
      classes: 'text-weight-medium mb-16',
      text: 'A fost identificată o problema: ' + errorMsg,
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
