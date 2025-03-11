export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes
    .filter((cls): cls is string => typeof cls === 'string')
    .join(' ');
};
