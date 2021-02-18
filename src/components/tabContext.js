import { createContext } from "react";

const TabsInnerContext = createContext({
  onChange: (key) => {}
});

const TabsInnerContextProvider = ({ onChange, children }) => {
  return (
    <TabsInnerContext.Provider
      value={{
        onChange
      }}
    >
      {children}
    </TabsInnerContext.Provider>
  );
};

export default { TabsInnerContext, TabsInnerContextProvider };
