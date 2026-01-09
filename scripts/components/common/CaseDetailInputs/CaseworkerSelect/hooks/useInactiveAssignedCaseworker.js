import { useEffect, useState } from "react";

/**
 * Returns a caseworker if they are assigned and also inactive, otherwise returns undefined
 * @param caseworkers
 * @param assignedCaseworkerId
 */

export const useInactiveAssignedCaseworker = (
  caseworkers = [],
  assignedCaseworkerId
) => {
  const [assignedInactiveCaseworker, setAssignedInactiveCaseworker] =
    useState(undefined);

  const hasAssignedInactiveCaseworker = (caseworkers) =>
    caseworkers.reduce((acc, caseworker) => {
      if (parseInt(caseworker.id) === assignedCaseworkerId) {
        if (!caseworker.active) {
          return caseworker;
        }
      }

      return acc;
    }, undefined);

  useEffect(() => {
    if (!assignedCaseworkerId) return;
    if (!caseworkers.length > 0) return;

    setAssignedInactiveCaseworker(hasAssignedInactiveCaseworker(caseworkers));
  }, [caseworkers, assignedCaseworkerId]);

  return [assignedInactiveCaseworker];
};
