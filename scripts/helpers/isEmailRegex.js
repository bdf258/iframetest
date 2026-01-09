const emailRegex = /@{1}.+\.\w/;
export default emailRegex;

export const isEmail = (string) => emailRegex.test(string);
