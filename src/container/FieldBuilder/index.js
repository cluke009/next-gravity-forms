import classnames from "classnames";
import React, { useEffect } from "react";

import Captcha from "../../components/Captcha";
import Html from "../../components/Html";
import Input from "../../components/Input";
import Email from "../../components/Email";
import Select from "../../components/Select";
import SelectorList from "../../components/SelectorList";
import Textarea from "../../components/Textarea";
import Section from "../../components/Section";
import Fileupload from "../../components/Fileupload";
import DateField from "../../components/Date";
import Honeypot from "../../components/Honeypot";
import Name from "../../components/Name";
import Phone from "../../components/Phone";
import { valueToLowerCase } from "../../utils/helpers";
import { islabelHidden } from "../../utils/inputSettings";
import { getFieldWidthClass } from "../../utils/getFieldWidthClass";
import CustomField from "../../components/CustomField";
import { useFormContext } from "react-hook-form";
import { checkConditionalRendering } from "../../components/InputWrapper/helpers";
import NumberField from "../../components/Number";

const FieldBuilder = ({
  databaseId,
  formFields,
  preOnSubmit,
  settings,
  formLayoutProps,
  customFormFields,
}) => {
  const { watch, setValue } = useFormContext();

  // Loop through fields and create
  return formFields.map((field) => {
    // Set the wrapper classes
    const {
      id,
      captchaTheme,
      description,
      descriptionPlacement,
      isRequired,
      subLabelPlacement,
      labelPlacement,
      layoutGridColumnSpan,
      type,
      visibility,
      conditionalLogic,
    } = field;

    const isHidden = checkConditionalRendering(
      conditionalLogic,
      watch,
      formFields
    );

    const fieldData = {
      ...field,
      isRequired: field.isRequired && !isHidden,
      isHidden,
    };

    const inputWrapperClass = classnames(
      "gfield",
      "gfield--type-" + valueToLowerCase(type),
      field.cssClass,
      { gfield_contains_required: isRequired },
      { gform_hidden: type === "HIDDEN" },
      { "hidden-label": islabelHidden(labelPlacement) },
      {
        [`gfield--width-${getFieldWidthClass(layoutGridColumnSpan)}`]:
          layoutGridColumnSpan,
      },
      `field_description_${
        descriptionPlacement &&
        valueToLowerCase(descriptionPlacement) !== "inherit"
          ? valueToLowerCase(descriptionPlacement)
          : valueToLowerCase(formLayoutProps?.descriptionPlacement) || "below"
      }`,
      `field_sublabel_${
        subLabelPlacement && valueToLowerCase(subLabelPlacement) !== "inherit"
          ? valueToLowerCase(subLabelPlacement)
          : valueToLowerCase(formLayoutProps?.subLabelPlacement) || "below"
      }`,
      `gfield--${description ? "has-description" : "no-description"}`,
      `gfield_visibility_${
        visibility ? valueToLowerCase(visibility) : "hidden"
      }`
    );

    const wrapId = `field_${databaseId}_${id}`;
    const name = `input_${id}`;
    const labelFor = `input_${databaseId}_${id}`;

    // this is needed in order to clear the field value once it gets hidden
    // otherwise conditional rendering won't working properly
    useEffect(() => {
      if (isHidden) {
        setValue(name, "");
      }
    }, [isHidden]);

    // check if there is custom filed to be rendered instead
    if (customFormFields[id])
      return (
        <CustomField
          fieldData={fieldData}
          key={id}
          gfId={id}
          name={name}
          labelFor={labelFor}
          wrapClassName={inputWrapperClass}
          wrapId={wrapId}
        >
          {customFormFields[id]}
        </CustomField>
      );

    switch (field.type) {
      // Add note for unsupported captcha field
      case "CAPTCHA":
        return (
          <Captcha
            captchaTheme={captchaTheme}
            fieldData={fieldData}
            gfId={id}
            key={id}
            name={name}
            labelFor={labelFor}
            ref={preOnSubmit}
            settings={settings?.recaptcha}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "HTML":
        return (
          <Html
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      // Start with the standard fields
      case "TEXT":
      case "HIDDEN":
        return (
          <Input
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
            isHidden={isHidden}
          />
        );
      case "NUMBER":
        return (
          <NumberField
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "PHONE":
        return (
          <Phone
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "DATE":
        return (
          <DateField
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "NAME":
        return (
          <Name
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "EMAIL":
        return (
          <Email
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "FILEUPLOAD":
        return (
          <Fileupload
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "TEXTAREA":
        return (
          <Textarea
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "SELECT":
      case "MULTISELECT":
        return (
          <Select
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "RADIO":
      case "CHECKBOX":
        return (
          <SelectorList
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "SECTION":
        return (
          <Section
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );
      case "HONEYPOT":
        return (
          <Honeypot
            fieldData={fieldData}
            key={id}
            gfId={id}
            name={name}
            labelFor={labelFor}
            wrapClassName={inputWrapperClass}
            wrapId={wrapId}
          />
        );

      default:
        return null;
    }
  });
};

export default FieldBuilder;
