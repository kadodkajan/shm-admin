// MyContextProvider.js
import React, { createContext, useContext } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const contextValue = { basename: '/example' };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };
