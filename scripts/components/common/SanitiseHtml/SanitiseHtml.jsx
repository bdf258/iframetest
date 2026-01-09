import React from "react";
import propTypes from "prop-types";
import sanitiseHtmlString from "../../../helpers/sanitiseHtmlString";

const SanitiseHtml = ({ children, htmlString, parent = <span /> }) => {
  return (
    <parent.type
      {...parent.props}
      dangerouslySetInnerHTML={{
        __html: sanitiseHtmlString(htmlString || children),
      }}
    />
  );
};

SanitiseHtml.propTypes = {
  children: propTypes.string,
  htmlString: propTypes.string,
  parent: propTypes.node,
};

export default SanitiseHtml;
