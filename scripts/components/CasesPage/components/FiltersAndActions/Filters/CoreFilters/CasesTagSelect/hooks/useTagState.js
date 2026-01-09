import { useEffect, useState } from "react";

import api from "@electedtech/api";

const tagExists = (tags, tagID) => tags?.find((tag) => tag.id === tagID);

const useTagState = (state) => {
  const [tags, setTags] = useState();

  /**
   * any initial tagID(s) that exist in state have come from URL param strings
   * and will need an api call to get the tags text
   */
  useEffect(() => {
    if (
      [...state.filters.tagged.tagID, ...state.filters.notTagged.tagID]
        .length === 0
    )
      setTags([]);

    const promises = [
      ...state.filters.tagged.tagID.map(
        (tagID) =>
          tagExists(tags, tagID) ||
          api.getTag(tagID).catch(() => ({
            id: null,
          }))
      ),
      ...state.filters.notTagged.tagID.map(
        (tagID) =>
          tagExists(tags, tagID) ||
          api
            .getTag(tagID)
            .then(({ id, tag }) => ({ id, tag: `- ${tag}` }))
            .catch(() => ({
              id: null,
            }))
      ),
    ];

    Promise.all(promises).then((fetchedTags = []) =>
      setTags(fetchedTags.filter(({ id }) => id !== null))
    );
  }, [state.filters.tagged.tagID, state.filters.notTagged.tagID]);

  return [tags, setTags];
};

export default useTagState;
