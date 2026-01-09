import {
  AccordionContainer,
  AccordionItem,
  FlexBox,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import Categorisation from "./Categorisation";
import DeleteCategorisation from "./DeleteCategorisation/DeleteCategorisation.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CategorisationTable.propTypes";

const CategorisationTable = ({ dispatch, state }) => {
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      {state.categorytypes.length === 0 ? (
        <p>
          {iln.gettext(
            "No category types available that you have permission to view"
          )}
        </p>
      ) : (
        <AccordionContainer opened={state.opened}>
          {state.categorytypes
            .filter((category) => category?.restriction?.view)
            .map(
              (category) => (
                <AccordionItem
                  key={category.id}
                  header={
                    <FlexBox hAlign="space-between">
                      <div>{category.categorytype}</div>
                      <DeleteCategorisation
                        categorisation={category}
                        dispatch={dispatch}
                        state={state}
                      />
                    </FlexBox>
                  }
                >
                  <Categorisation
                    state={state}
                    dispatch={dispatch}
                    category={category}
                  />
                </AccordionItem>
              ),

              []
            )}
        </AccordionContainer>
      )}
    </React.Fragment>
  );
};

CategorisationTable.propTypes = propTypes;

export default CategorisationTable;
