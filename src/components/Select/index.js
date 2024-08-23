import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../../components/InputWrapper";
import MultiSelectEnhancedUI from "./MultiSelectEnhancedUI";
import { valueToLowerCase } from "../../utils/helpers";
import { useSettings } from "../../providers/SettingsContext";
import { Select as MuiSelect } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export const getSelectDefaultValue = ({
  defaultValue,
  options,
  isMultiselectField,
}) => {
  let value = defaultValue || options.find((i) => i.isSelected)?.value;

  if (isMultiselectField) value = value?.split(",");

  return value;
};

const Select = ({ fieldData, name, labelFor, ...wrapProps }) => {
  const { strings } = useSettings();

  const {
    choices,
    cssClass,
    isRequired,
    size,
    placeholder,
    hasEnhancedUI,
    type,
    errorMessage,
  } = fieldData;

  const isMultiselectField = valueToLowerCase(type) === "multiselect";

  // if there is placeholder we add it as first option with no value set
  const options = [
    ...(placeholder
      ? [
          {
            text: placeholder,
            value: "",
            isSelected: !choices.some((i) => i.isSelected),
            className: "gf_placeholder",
          },
          ...choices,
        ]
      : choices),
  ];

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={labelFor}
      {...wrapProps}
    >
      <FormControl fullWidth>
        {hasEnhancedUI ? (
          <MultiSelectEnhancedUI
            name={name}
            options={options}
            cssClass={cssClass}
            id={labelFor}
            isRequired={isRequired}
            size={valueToLowerCase(size)}
            control={control}
            isMulti={isMultiselectField}
          />
        ) : (
          <>
            <InputLabel>{placeholder}</InputLabel>

            <MuiSelect
              error={typeof errors?.[name] === "object" ? true : false}
              onChange={handleChange}
              defaultValue={value}
              label={placeholder}
              multiple={isMultiselectField}
              aria-invalid={!!errors?.[name]}
              aria-required={isRequired}
              className={classnames(
                "gfield_select",
                cssClass,
                valueToLowerCase(size)
              )}
              id={labelFor}
              name={name}
              {...register(name, {
                required:
                  isRequired && (errorMessage || strings.errors.required),
              })}
            >
              {options.map(({ text, value, className }, index) => {
                return (
                  <MenuItem
                    key={`${name}-${index}`}
                    value={value}
                    className={className}
                  >
                    {text}
                  </MenuItem>
                );
              })}
            </MuiSelect>
          </>
        )}
      </FormControl>
    </InputWrapper>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  labelFor: PropTypes.string,
  fieldData: PropTypes.shape({
    choices: PropTypes.array,
    cssClass: PropTypes.string,
    isRequired: PropTypes.bool,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    hasEnhancedUI: PropTypes.bool,
    errorMessage: PropTypes.string,
    type: PropTypes.string,
  }),
  register: PropTypes.func,
  wrapProps: PropTypes.object,
};
