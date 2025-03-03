export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject('Failed to convert file to Base64');
      }
    };

    reader.onerror = () => reject('Error reading file');
    reader.readAsDataURL(file);
  });
};
