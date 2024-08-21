import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSettings } from "../../providers/SettingsContext";
import getFieldError from "../../utils/getFieldError";
import { valueToLowerCase } from "../../utils/helpers";
import { ConditionalWrapper, SubLabelWrapper } from "../General";
import InputWrapper from "../InputWrapper";

const Email = ({ fieldData, name, labelFor, ...wrapProps }) => {
  const {
    isRequired,
    maxLength,
    placeholder,
    inputs,
    subLabelPlacement,
    size,
    errorMessage,
  } = fieldData;
  const [emailField, confirmEmailField] = inputs || [];
  const { strings } = useSettings();

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || errors?.[`${name}_2`] || {}}
      inputData={fieldData}
      labelFor={!confirmEmailField ? labelFor : undefined}
      {...wrapProps}
    >
      <ConditionalWrapper // render only when there is confirmation field added
        condition={!!confirmEmailField}
        wrapper={(children) => (
          <SubLabelWrapper
            subLabelPlacement={subLabelPlacement}
            id={1}
            className="ginput_left"
            {...emailField}
            name={name}
            labelFor={labelFor}
          >
            {children}
          </SubLabelWrapper>
        )}
      >
        <TextField
          fullWidth
          fieldData={{ ...fieldData }}
          type="email"
          errors={errors}
          name={name}
          label={fieldData.placeholder}
          className={valueToLowerCase(size)}
          {...register(name, {
            required: isRequired && (errorMessage || strings.errors.required),
            maxLength: maxLength > 0 && {
              value: maxLength,
              message: `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: getFieldError(
                { ...fieldData, inputMaskValue: true },
                strings
              ),
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </ConditionalWrapper>

      {confirmEmailField && (
        <SubLabelWrapper
          subLabelPlacement={subLabelPlacement}
          id={2}
          className="ginput_right"
          {...confirmEmailField}
          name={`${name}_2`}
          labelFor={`${labelFor}_2`}
        >
          <TextField
            fullWidth
            fieldData={{ ...fieldData }}
            type="email"
            errors={errors}
            name={`${name}_2`}
            label={confirmEmailField?.placeholder || placeholder}
            {...register(`${name}_2`, {
              required: isRequired && strings.errors.required,
              validate: (val) => {
                if (watch(name) != val) {
                  return strings.errors.emailsDontmatch;
                }
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </SubLabelWrapper>
      )}
    </InputWrapper>
  );
};

export default Email;

Email.propTypes = {
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
    subLabelPlacement: PropTypes.string,
    inputs: PropTypes.array,
    errorMessage: PropTypes.string,
  }),
  value: PropTypes.string,
  name: PropTypes.string,
  labelFor: PropTypes.string,
  wrapProps: PropTypes.object,
};
