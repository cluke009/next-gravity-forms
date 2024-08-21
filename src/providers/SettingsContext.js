// SettingsProvider component for managing global settings
import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import strings from "../utils/strings";
import fieldsSettings from "../utils/fieldsSettings";
import mergeDeep from "../utils/mergeDeep";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const SettingsContext = createContext();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#9BB8D3",
      main: "#02465F",
      dark: "#1B365D",
    },
    secondary: {
      main: "#2E1A47",
      light: "#A57FB2",
    },
    success: {
      main: "#205C40",
      light: "#6FA287",
      dark: "#244C5A",
    },
  },
});

export const getSettings = (helperFieldsSettings) => {
  return mergeDeep(fieldsSettings, helperFieldsSettings);
};

export const SettingsProvider = ({
  helperText,
  helperFieldsSettings,
  children,
  form,
  ...props
}) => {
  // Override custom strings with helperText object, allowing users to modify hardcoded strings
  const mergedStrings = mergeDeep(strings, helperText);
  const mergedSettings = getSettings(helperFieldsSettings);

  return (
    <SettingsContext.Provider
      value={{
        strings: mergedStrings,
        fieldsSettings: mergedSettings,
        databaseId: form.databaseId,
        form,
        ...props,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

SettingsProvider.propTypes = {
  helperText: PropTypes.object,
  form: PropTypes.object.isRequired,
  helperFieldsSettings: PropTypes.object,
  children: PropTypes.node.isRequired,
};
