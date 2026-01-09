const sortInboxItems = (inboxItems, sortBy) => {
  if (!inboxItems || !inboxItems?.sort) return [];

  return inboxItems.sort(({ dateTime: dateTimeA }, { dateTime: dateTimeB }) => {
    const dateA = new Date(dateTimeA);
    const dateB = new Date(dateTimeB);

    if (sortBy === "DESC") {
      return dateB - dateA;
    } else if (sortBy === "ASC") {
      return dateA - dateB;
    } else {
      return 0;
    }
  });
};

export default sortInboxItems;
