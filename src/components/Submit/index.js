import React from "react";
import { useSettings } from "../../providers/SettingsContext";
import { useFormContext } from "react-hook-form";
import { checkConditionalRendering } from "../InputWrapper/helpers";
import { Button } from "@mui/material";

const SubmitButton = () => {
  const {
    loading,
    databaseId,
    form: { submitButton } = {},
    strings,
  } = useSettings();

  const { text, conditionalLogic } = submitButton || {};

  const { watch, formFields } = useFormContext();

  // check conditional logic
  const isHidden = checkConditionalRendering(
    conditionalLogic,
    watch,
    formFields?.nodes
  );

  return (
    <Button
      size="large"
      variant="contained"
      className="gravityform__button gform_button button"
      id={`gform_submit_button_${databaseId}`}
      type="submit"
      style={isHidden ? { display: "none" } : undefined}
      disabled={!!isHidden || loading}
    >
      {loading ? (
        <span className="gravityform__button__loading_span">
          {strings.loading}
        </span>
      ) : (
        text || strings.submit
      )}
    </Button>
  );
};

export default SubmitButton;
