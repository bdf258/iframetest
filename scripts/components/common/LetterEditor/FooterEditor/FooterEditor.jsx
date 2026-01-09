import CKEditor from "@electedtech/electedtech-ckeditor";
import React from "react";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const FooterEditor = ({ onChange, onFocus, footerContent }) => {
  const classes = useStyles();

  return (
    <CKEditor
      type={"inline"}
      onFocus={onFocus}
      name="letterFooter"
      data={footerContent ? footerContent : ""}
      onChange={(e) => onChange(e.target.value)}
      customClassNames={{ container: classes.footerCKE }}
      style={{
        height: 200,
        border: "1px solid #efefef",
        marginBottom: 5,
      }}
    />
  );
};

FooterEditor.propTypes = propTypes;

export default FooterEditor;
