import React, { createContext, useState } from "react";

export const PageNavigationContext = createContext();

const PageNavigationProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    currentPage: "",
  });

  return (
    <PageNavigationContext.Provider value={[pageState, setPageState]}>
      {children}
    </PageNavigationContext.Provider>
  );
};

export default PageNavigationProvider;
