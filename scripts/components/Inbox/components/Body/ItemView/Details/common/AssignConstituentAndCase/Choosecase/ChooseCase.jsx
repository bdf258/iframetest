import { Link, ModalContext, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import AssignActions from "../common/AssignActions/AssignActions.jsx";
import CaseSelect from "../common/CaseSelect/CaseSelect.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import theme from "@electedtech/theme";
import { useReduxSlice } from "./ChooseCase.redux.js";
import { useStyles } from "../AssignConstituentAndCase.styles.js";

const ChooseCase = ({
  onClickCreateCase,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  onClickChooseConstituent,
  item,
  constituent,
}) => {
  const classes = useStyles(theme);
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);

  const { updateItem } = useReduxSlice();

  const [selectedCase, setSelectedCase] = useState();

  const { firstName, surname, hasCases, cases = [], id } = constituent;

  return (
    <React.Fragment>
      <p className={classes.centerText}>
        {iln.gettext("The email address: ")}
        <span className={classes.underlineText}>
          {item?.from?.email || item?.from}
        </span>{" "}
        {iln.gettext("matches the constituent")}{" "}
        <Link
          customClassNames={classes.textButton}
          href={`/viewconstituent.php?constituentID=${id}`}
          underline
        >
          {`${firstName || ""} ${surname || ""}`}
        </Link>{" "}
        {iln.gettext("who has %1 case listed.", cases.length)}
      </p>
      {hasCases && (
        <CaseSelect
          value={selectedCase}
          onChange={({ target: { value } }) => {
            setSelectedCase(value);
            value !== undefined &&
              api
                .updateEmail(
                  { emailID: item.id, caseID: value },
                  modalActions,
                  iln
                )
                .then(() => {
                  updateItem({ ...item, caseID: value });
                  sliderActions.close();
                });
          }}
          cases={cases}
        />
      )}
      <AssignActions
        onClickCreateCase={onClickCreateCase}
        onClickCreateConstituent={onClickCreateConstituent}
        onClickCreateOrganisation={onClickCreateOrganisation}
        onClickChooseConstituent={onClickChooseConstituent}
      />
    </React.Fragment>
  );
};

ChooseCase.propTypes = propTypes;

export default ChooseCase;
