// FormContext.js
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [previewData, setPreviewData] = useState(null);

  return (
    <FormContext.Provider value={{ previewData, setPreviewData }}>
      {children}
    </FormContext.Provider>
  );
};
