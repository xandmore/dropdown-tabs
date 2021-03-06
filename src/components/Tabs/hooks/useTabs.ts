import { useCallback, useContext } from "react";
import { TabsContext } from "../TabsContext/TabsContext";
import { TabKey } from "../types";
import { ActionType } from "../TabsContext/reducer";

function useTabs() {
  return useContext(TabsContext);
}

export default useTabs;
