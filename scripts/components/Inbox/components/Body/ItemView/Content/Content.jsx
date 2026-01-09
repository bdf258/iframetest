import ContentPlaceholder from "./ContentPlaceholder/ContentPlaceholder.jsx";
import PlainTextToggle from "./PlainTextToggle";
import React from "react";
import SanitiseHtml from "../../../../../common/SanitiseHtml/SanitiseHtml.jsx";
import { bodyFilterType } from "../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import propTypes from "./propTypes.js";
import useGetSearchableText from "../../../../hooks/useGetSearchableText.js";
import { useStyles } from "./styles";
import useToggle from "./hooks/useToggle.js";

const Content = ({ item }) => {
  const [displayPlainText, toggleDisplayPlainText] = useToggle();
  const classes = useStyles({ displayPlainText });

  const { purifiedBody, plainBody } = item || {};
  const contentValue = displayPlainText
    ? plainBody || purifiedBody
    : purifiedBody || plainBody;

  const searchableText = useGetSearchableText(contentValue, bodyFilterType, {
    replaceAsString: true,
  });

  if (!item?.fullEmail) return <ContentPlaceholder />;

  return (
    <React.Fragment>
      <div className={classes.content}>
        <SanitiseHtml>{searchableText}</SanitiseHtml>
      </div>
      <PlainTextToggle
        onClick={toggleDisplayPlainText}
        value={displayPlainText}
      />
    </React.Fragment>
  );
};

Content.propTypes = propTypes;

export default Content;
