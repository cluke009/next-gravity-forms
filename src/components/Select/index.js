import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../../components/InputWrapper";
import { valueToLowerCase } from "../../utils/helpers";
import { useSettings } from "../../providers/SettingsContext";

const Select = ({ fieldData, name, ...wrapProps }) => {
  const { strings } = useSettings();

  const { choices, cssClass, isRequired, size, errorMessage } = fieldData;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={name}
      {...wrapProps}
    >
      <select
        aria-invalid={errors}
        aria-required={isRequired}
        //TODO: GF uses select2 library and classes, need to figure out how to handle here if we're mimicing their functionality
        className={classnames(
          "gravityform__field__input",
          "gravityform__field__input__select",
          "gfield_select",
          cssClass,
          valueToLowerCase(size)
        )}
        id={name}
        name={name}
        {...register(name, {
          required: true && (errorMessage || strings.errors.required),
        })}
      >
        {choices.map(({ isSelected, text, value }, index) => {
          return (
            <option
              defaultValue={isSelected}
              key={`${name}-${index}`}
              value={value}
            >
              {text}
            </option>
          );
        })}
      </select>
    </InputWrapper>
  );
};

export default Select;

Select.propTypes = {
  fieldData: PropTypes.shape({
    choices: PropTypes.array,
    cssClass: PropTypes.string,
    isRequired: PropTypes.bool,
    size: PropTypes.string,
  }),
  register: PropTypes.func,
  wrapProps: PropTypes.object,
};
