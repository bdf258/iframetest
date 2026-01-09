import api from "@electedtech/api";

const getConstituentConnections = async (constituentID, { relatesTo }) => {
  if (constituentID && relatesTo) {
    api.getConnectionsFromConstituent(constituentID).then((connections) => {
      return [
        {
          connectionConstituentID: 0,
          connectionName: "This Stakeholder Only",
        },
      ].concat(
        connections
          .filter((item) => {
            return !item.deleted;
          })
          .map((item) => {
            if (item.childID == Number(constituentID)) {
              return {
                connectionConstituentID: item.parentID,
                connectionName:
                  item.connectionName +
                  " <- " +
                  (item.role || item.connectionType),
              };
            } else {
              return {
                connectionConstituentID: item.childID,
                connectionName:
                  item.connectionName +
                  " -> " +
                  (item.role || item.connectionType),
              };
            }
          })
      );
    });
  } else {
    return [];
  }
};

export default getConstituentConnections;
