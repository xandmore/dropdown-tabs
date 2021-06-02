import { useContext } from "react";
import { TabsContext } from "../TabsContext/TabsContext";

function useTabsContext() {
  return useContext(TabsContext);
}

export default useTabsContext;
