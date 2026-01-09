const base64Encode = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encodedFile = reader.result;
      resolve(encodedFile.substring(encodedFile.indexOf(",") + 1));
    };
    reader.onerror = (error) => reject(error);
  });

export default base64Encode;
