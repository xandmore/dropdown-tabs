import React, {
  useReducer,
  createContext,
  PropsWithChildren,
  useCallback,
} from "react";

import { reducer, ActionType, PayloadType, State } from "./reducer";
import { TabKey, Tab, Section } from "../types";

type TabsContextProps = {
  activeKey: TabKey | null;
  setActiveKey: (key: TabKey | null) => void;
  tabs: Tab[];
  sections: Section[];

  addTabs: (payload: PayloadType[ActionType.AddTabs]) => void;
  removeTabs: (keys: TabKey | TabKey[]) => void;
  closeDropdownTab: (keys: TabKey, newActiveTab: TabKey) => void;
  onTabClose: (key: TabKey) => void;

  lockTabs: (keys: TabKey | TabKey[]) => void;
  unlockTabs: (keys: TabKey | TabKey[]) => void;
  toggleLock: (keys: TabKey | TabKey[]) => void;

  starTabs: (keys: TabKey | TabKey[]) => void;
  unstarTabs: (keys: TabKey | TabKey[]) => void;
  toggleStar: (keys: TabKey | TabKey[]) => void;

  setState: (state: React.SetStateAction<State>) => void;
};

const TabsContext = createContext({} as TabsContextProps);

type TabsContextProviderProps = {
  defaultActiveKey?: TabKey | null;
  initialTabs?: Tab[];
  initialSections?: Section[];
};

const TabsContextProvider = ({
  defaultActiveKey,
  initialTabs,
  initialSections,
  children,
}: PropsWithChildren<TabsContextProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, {
    activeKey: defaultActiveKey ?? null,
    tabs: initialTabs ?? [],
    sections: initialSections ?? [],
  });

  const setActiveKey: TabsContextProps["setActiveKey"] = useCallback((key) => {
    dispatch({ type: ActionType.SetActiveKey, payload: key });
  }, []);

  const addTabs: TabsContextProps["addTabs"] = useCallback((payload) => {
    dispatch({ type: ActionType.AddTabs, payload });
  }, []);

  const removeTabs: TabsContextProps["removeTabs"] = useCallback((keys) => {
    dispatch({ type: ActionType.RemoveTabs, payload: keys });
  }, []);

  const closeDropdownTab: TabsContextProps["closeDropdownTab"] = useCallback(
    (key, newActiveTab) => {
      dispatch({
        type: ActionType.CloseTabs,
        payload: { key: key, newActiveKey: newActiveTab },
      });
    },
    []
  );

  const onTabClose: TabsContextProps["onTabClose"] = useCallback((key) => {
    dispatch({ type: ActionType.RemoveTabs, payload: key });
  }, []);

  const lockTabs: TabsContextProps["lockTabs"] = useCallback((keys) => {
    dispatch({
      type: ActionType.LockTabs,
      payload: { keys: keys, mode: "lock" },
    });
  }, []);

  const unlockTabs: TabsContextProps["unlockTabs"] = useCallback((keys) => {
    dispatch({
      type: ActionType.LockTabs,
      payload: { keys: keys, mode: "unlock" },
    });
  }, []);

  const toggleLock: TabsContextProps["toggleLock"] = useCallback((keys) => {
    dispatch({
      type: ActionType.LockTabs,
      payload: { keys: keys, mode: "toggle" },
    });
  }, []);

  const starTabs: TabsContextProps["starTabs"] = useCallback((keys) => {
    dispatch({
      type: ActionType.StarTabs,
      payload: { keys: keys, mode: "star" },
    });
  }, []);

  const unstarTabs: TabsContextProps["unstarTabs"] = useCallback((keys) => {
    dispatch({
      type: ActionType.StarTabs,
      payload: { keys: keys, mode: "unstar" },
    });
  }, []);

  const toggleStar: TabsContextProps["toggleStar"] = useCallback((keys) => {
    dispatch({
      type: ActionType.StarTabs,
      payload: { keys: keys, mode: "toggle" },
    });
  }, []);

  const setState: TabsContextProps["setState"] = useCallback((state) => {
    dispatch({ type: ActionType.SetState, payload: state });
  }, []);

  return (
    <TabsContext.Provider
      value={{
        ...state,
        addTabs,
        removeTabs,
        setActiveKey,
        onTabClose,
        closeDropdownTab,
        lockTabs,
        unlockTabs,
        toggleLock,
        starTabs,
        unstarTabs,
        toggleStar,
        setState,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export { TabsContext, TabsContextProvider };
