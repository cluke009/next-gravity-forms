import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useMask } from "@react-input/mask";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSettings } from "../../providers/SettingsContext";
import { valueToLowerCase } from "../../utils/helpers";
import InputWrapper from "../InputWrapper";

const PhoneField = ({ fieldData, name, labelFor, ...wrapProps }) => {
  const { strings } = useSettings();
  const { phoneFormat, isRequired, type, size, errorMessage } = fieldData;

  const isStandard = "standard" === valueToLowerCase(phoneFormat);
  const mask = {
    mask: "(___) ___-____",
    replacement: { _: /\d/ },
  };

  const inputRef = useMask(mask);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={labelFor}
      {...wrapProps}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            type="tel"
            // fieldData={{ ...fieldData, type: isStandard ? "text" : "tel" }}
            fieldData={{ ...fieldData }}
            className={classnames(valueToLowerCase(size), {
              gform_hidden: type === "HIDDEN",
            })}
            errors={errors}
            name={name}
            defaultValue={value && isStandard ? format(value, mask) : value}
            label={fieldData.placeholder}
            ref={isStandard ? inputRef : undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        rules={{
          required: isRequired && (errorMessage || strings.errors.required),
        }}
      />
    </InputWrapper>
  );
};

export default PhoneField;

PhoneField.propTypes = {
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    inputMaskValue: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
    defaultValue: PropTypes.string,
    errorMessage: PropTypes.string,
    phoneFormat: PropTypes.string,
  }),
  value: PropTypes.string,
  name: PropTypes.string,
  labelFor: PropTypes.string,
  wrapProps: PropTypes.object,
};
