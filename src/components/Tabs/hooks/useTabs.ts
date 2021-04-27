import { useContext } from "react";
import { TabsContext } from "../TabsContext/TabsContext";

function useTabs() {
  return useContext(TabsContext);
}

export default useTabs;
