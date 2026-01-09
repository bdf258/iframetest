import React, {useState} from 'react';

import CKEditor from "@electedtech/electedtech-ckeditor";
import { FlexBox } from "@electedtech/electedtech-ui";
import PropTypes from 'prop-types';
import { currentlyFocusedInstance } from "../../../helpers/ckeditor/getInstance";

let typingTimeout;

const LetterBody = ({
  letterContent = '',
  onChange,
  onFocus,
  setBodyContentPending,
  CKconfig
}) => {

  const [letter, setLetter] = useState(letterContent || '');
  return (
    <FlexBox hAlign={"center"}>
        <CKEditor
          onFocus={() => {
            if (onFocus) {
              onFocus(currentlyFocusedInstance());
            }
          }}
          name="letter"
          data={letter}
          onChange={(e) => {
            setLetter(e.target.value);
            setBodyContentPending(true);
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
              setBodyContentPending(false);
              onChange(e);
            }, 1000);
          }}
          config={CKconfig}
        />
    </FlexBox>
  );
};

LetterBody.propTypes = {
  CKconfig: PropTypes.object,
  letterContent: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  setBodyContentPending: PropTypes.func,
};

export default LetterBody;