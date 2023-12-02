"use client";

import { useContext, createContext, useState, useEffect } from "react";

const StylingContext = createContext();

export const StylingContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const headingSize = "text-5xl";
  const headingWeight = "font-extrabold";
  const subheadingSize = "text-3xl";
  const subheadingWeight = "font-bold";
  const textSize = "text-xl";
  const textWeight = "font-bold";
  const subtextSize = "text-lg";
  const subtextWeight = "font-semibold ";

  return (
    <StylingContext.Provider value={
        { 
            headingSize, headingWeight, 
            subheadingSize, subheadingWeight,
            textSize, textWeight,
            subtextSize, subtextWeight }
        }>
      {children}
    </StylingContext.Provider>
  );
};

export const useStyling = () => {
  return useContext(StylingContext);
};