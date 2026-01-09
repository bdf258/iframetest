/*
 * Splits caseworkers by active key
 * Returns an object with an active and inactive key containing their respective caseworkers as an array
 */

export const splitCaseworkersByActive = (caseworkers = []) => {
  return caseworkers.reduce(
    (acc, caseworker) => {
      const { active } = caseworker;

      if (active) return { ...acc, active: [...acc.active, caseworker] };
      if (!active) return { ...acc, inactive: [...acc.inactive, caseworker] };
      return acc;
    },
    { active: [], inactive: [] }
  );
};
