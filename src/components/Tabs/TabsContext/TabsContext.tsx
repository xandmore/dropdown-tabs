import React, {
  useReducer,
  createContext,
  PropsWithChildren,
  useCallback,
  Dispatch,
} from "react";

import { reducer, ActionType, ReducerAction } from "./reducer";
import { TabKey, Tab, Section } from "../types";

type TabsContextProps = {
  activeKey: TabKey | null;
  tabs: Tab[];
  sections: Section[];
  // setActiveKey: (key: TabKey) => void;
  // removeTabs: (keys: TabKey | TabKey[]) => void;
  // onTabClose: (key: TabKey) => void;
  dispatch: Dispatch<ReducerAction<ActionType>>;
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

  const setActiveKey = useCallback((key: TabKey | null) => {
    dispatch({ type: ActionType.SetActiveKey, payload: key });
  }, []);

  return (
    <TabsContext.Provider
      value={{
        ...state,
        // removeTabs: removeTabs,
        // setActiveKey: setActiveKey,
        // onTabClose,
        dispatch,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export { TabsContext, TabsContextProvider };
