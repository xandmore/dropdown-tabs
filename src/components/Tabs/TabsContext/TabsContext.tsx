import React, {
  useReducer,
  createContext,
  PropsWithChildren,
  useCallback,
} from "react";

import { reducer, ActionType } from "./reducer";
import { TabKey, Tab, Section } from "../types";

type TabsContextProps = {
  activeKey: TabKey | null;
  tabs: Tab[];
  sections: Section[];
  removeTabs: (keys: TabKey | TabKey[]) => void;
  onTabClose: (key: TabKey) => void;
};

const TabsContext = createContext({} as TabsContextProps);

type TabsContextProviderProps = {
  defaultActiveKey?: TabKey | null;
  activeKey?: TabKey | null;
  initialTabs?: Tab[];
  initialSections?: Section[];
};

const TabsContextProvider = ({
  defaultActiveKey,
  activeKey,
  initialTabs,
  initialSections,
  children,
}: PropsWithChildren<TabsContextProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, {
    activeKey: activeKey ?? defaultActiveKey ?? null,
    tabs: initialTabs ?? [],
    sections: initialSections ?? [],
  });

  const removeTabs = useCallback((keys: TabKey | TabKey[]) => {
    dispatch({ type: ActionType.RemoveTabs, payload: keys });
  }, []);

  const onTabClose = useCallback((key: TabKey) => {
    dispatch({ type: ActionType.RemoveTabs, payload: key });
  }, []);

  return (
    <TabsContext.Provider
      value={{
        ...state,
        removeTabs,
        onTabClose,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export { TabsContext, TabsContextProvider };
