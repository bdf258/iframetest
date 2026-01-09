export const concatenateNameParts = ({
  title,
  firstName,
  surname,
  knownAs,
  postNominal,
}) =>
  [title, knownAs || firstName, surname, postNominal]
    .filter((namePart) => !!namePart)
    .join(" ")
    .trim();
