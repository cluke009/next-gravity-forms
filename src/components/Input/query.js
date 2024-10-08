import { conditionalLogicFragment } from "../../fragments";

export const textFieldFragment = /* GraphQL */ `
  ... on TextField {
    adminLabel
    autocompleteAttribute
    canPrepopulate
    conditionalLogic {
      ${conditionalLogicFragment}
    }
    cssClass
    defaultValue
    description
    descriptionPlacement
    errorMessage
    hasAutocomplete
    inputMaskValue
    inputName
    isPasswordInput
    isRequired
    label
    labelPlacement
    layoutGridColumnSpan
    maxLength
    placeholder
    shouldAllowDuplicates
    size
    value
  }
`;

export const hiddenFieldFragment = /* GraphQL */ `
  ... on HiddenField {
    canPrepopulate
    defaultValue
    inputName
    label
    value
  }
`;
