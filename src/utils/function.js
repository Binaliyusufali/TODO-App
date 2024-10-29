const setCategory = value => {
  switch (value) {
    case 0:
      return 'Sofware';
    case 1:
      return 'Desing';
    case 2:
      return 'Operation';
    default:
      return '';
  }
};

export {setCategory};
