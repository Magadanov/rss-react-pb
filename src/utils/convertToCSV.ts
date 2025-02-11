export const convertToCSV = (objArray: object[]): string => {
  if (!Array.isArray(objArray) || objArray.length === 0) return '';

  const headers = Object.keys(objArray[0]);
  const csvRows = [
    headers.join(','),
    ...objArray.map((obj) => Object.values(obj).join(',')),
  ];

  return csvRows.join('\r\n');
};
