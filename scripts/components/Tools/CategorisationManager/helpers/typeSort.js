const typeSort = (
  { categorytype: categorytypeA, casetype: casetypeA, statustype: statustypeA },
  { categorytype: categorytypeB, casetype: casetypeB, statustype: statustypeB }
) => {
  if (categorytypeA && categorytypeB)
    return categorytypeA < categorytypeB
      ? -1
      : categorytypeA > categorytypeB
      ? 1
      : 0;
  else if (casetypeA && casetypeB)
    return casetypeA < casetypeB ? -1 : casetypeA > casetypeB ? 1 : 0;
  else if (statustypeA && statustypeB)
    return statustypeA < statustypeB ? -1 : statustypeA > statustypeB ? 1 : 0;
};

export default typeSort;
