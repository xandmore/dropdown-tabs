import { useCallback, useContext } from "react";
import { TabsContext } from "../TabsContext/TabsContext";
import { TabKey } from "../types";
import { ActionType } from "../TabsContext/reducer";

function useTabs() {
  const { dispatch } = useContext(TabsContext);

  const removeTabs = useCallback((keys: TabKey | TabKey[]) => {
    dispatch({ type: ActionType.RemoveTabs, payload: keys });
  }, []);

  const onTabClose = useCallback((key: TabKey) => {
    dispatch({ type: ActionType.RemoveTabs, payload: key });
  }, []);

  const setActiveKey = useCallback((key: TabKey | null) => {
    dispatch({ type: ActionType.SetActiveKey, payload: key });
  }, []);

  return useContext(TabsContext);
}

export default useTabs;
