import PropTypes from "prop-types";
import React from "react";

const TextMatch = ({ children }) => (
  <span
    style={{ color: "#FFF", backgroundColor: "#689665", borderRadius: "5px" }}
  >
    {children}
  </span>
);
TextMatch.propTypes = { children: PropTypes.node.isRequired };

const findAllOccurrences = (str, substr) => {
  if (substr === "") return [];

  const occurrences = [];
  const lowerStr = str.toLowerCase();
  const lowerSubstr = substr.toLowerCase();

  let index = lowerStr.indexOf(lowerSubstr);
  while (index !== -1) {
    occurrences.push(index);
    index = lowerStr.indexOf(lowerSubstr, index + 1);
  }
  return occurrences;
};

const highlightMatchingText = (
  searchTerm = "",
  searchAgainstText,
  { replaceAsString } = {}
) => {
  // The start and end indexes of all matches
  const matches = findAllOccurrences(searchAgainstText, searchTerm).map(
    (index) => ({ matchStart: index, matchEnd: index + searchTerm.length })
  );

  // an array of nodes (highlighted text) and strings (non highlighted text)
  const highlightedNodeArray = matches.reduce(
    (allNodes, { matchStart, matchEnd }, index) => {
      const toReturn = [];

      if (index === 0) {
        if (matchStart !== 0)
          toReturn.push(searchAgainstText.substring(0, matchStart));
      } else {
        const previousMatchEnd = matches[index - 1].matchEnd;
        toReturn.push(
          searchAgainstText.substring(previousMatchEnd, matchStart)
        );
      }

      toReturn.push(
        replaceAsString ? (
          `<span style="color: #FFF; background-color: #689665; border-radius: 5px;">${searchAgainstText.substring(
            matchStart,
            matchEnd
          )}</span>`
        ) : (
          <TextMatch key={index}>
            {searchAgainstText.substring(matchStart, matchEnd)}
          </TextMatch>
        )
      );

      if (index + 1 === matches.length)
        toReturn.push(searchAgainstText.substring(matchEnd));

      return [...allNodes, ...toReturn];
    },
    []
  );

  if (highlightedNodeArray.length > 0)
    return replaceAsString
      ? highlightedNodeArray.join("")
      : highlightedNodeArray;
  else return searchAgainstText;
};

export default highlightMatchingText;
