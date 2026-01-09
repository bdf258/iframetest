import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const height = "calc(100vh - 300px)";
const width = "80vw";

const useStyles = createUseStyles({
  preview: {
    height: height,
    width: width,
  },
  letter: {
    height: "calc(100% - 25px)",
    width: "100%",
  },
});

const ViewPDF = ({ title, pdfURL, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.preview}>
      {pdfURL ? (
        <React.Fragment>
          <iframe
            id={title}
            className={classes.letter}
            title={title}
            src={pdfURL}
            type="application/pdf"
            {...props}
          />
        </React.Fragment>
      ) : (
        <Placeholder height={height} width={width} />
      )}
    </div>
  );
};

ViewPDF.propTypes = {
  pdfURL: propTypes.string,
  title: propTypes.string.isRequired,
};

export default ViewPDF;
