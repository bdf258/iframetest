import React, { useContext, useEffect, useState } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import ViewPDF from "../../../common/ViewPDF.jsx";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const print = (title, handleLetterPrinted) => {
  const iframe = window.frames[title] || document.getElementById(title);
  if (iframe) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    handleLetterPrinted();
  }
};

const saveAsPDF = (url, title) => {
  const download = document.createElement("a");
  download.setAttribute("href", url);
  download.setAttribute(
    "download",
    `${title}${title.endsWith(".pdf") ? "" : ".pdf"}`
  );
  download.click();
};

const LetterPreview = ({
  pdfURL,
  letterID,
  title,
  handleLetterPrinted = () => {},
  showPrint,
  showSave,
  signed,
}) => {
  const classes = useStyles();
  const [url, setUrl] = useState(pdfURL);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    if (letterID && !pdfURL) {
      const getPDF = signed ? api.getSignedLetterAsPDF : api.getLetterAsPDF;
      getPDF(letterID).then((letter) => {
        const blob = new Blob([letter], {
          type: "application/pdf",
        });
        setUrl(URL.createObjectURL(blob));
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className={classes.buttons}>
        {showSave && (
          <Button
            size="small"
            onClick={() => saveAsPDF(url, title)}
            customClassNames={classes.saveAsPdfButton}
          >
            {iln.gettext("Save as PDF")}
          </Button>
        )}
        {showPrint && (
          <Button
            size="small"
            onClick={() => print(title, handleLetterPrinted)}
          >
            {iln.gettext("Print")}
          </Button>
        )}
      </div>
      <ViewPDF pdfURL={url} title={title} />
    </React.Fragment>
  );
};

LetterPreview.propTypes = propTypes;

export default LetterPreview;
