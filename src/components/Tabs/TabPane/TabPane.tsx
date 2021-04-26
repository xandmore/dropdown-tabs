import React, { memo } from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Tab } from "../types";

const bemTabPane = bem("tab-pane");

export type TabPaneProps = {
  className?: string;
  active: boolean;
  tab: Tab | DropdownTab;
};

function TabPane({ className, active, tab }: TabPaneProps) {
  console.log(tab.title + " rerendered");
  return (
    <div
      className={bemTabPane({ active: active, hidden: !active }, [className])}
      role="tabpanel"
    >
      {tab.title}
    </div>
  );
}

export default memo(TabPane);
