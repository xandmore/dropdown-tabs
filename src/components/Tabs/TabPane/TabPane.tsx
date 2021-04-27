import React, { memo } from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Tab } from "../types";
import TabContent from "./TabContent/TabContent";

const bemTabPane = bem("tab-pane");

export type TabPaneProps = {
  className?: string;
  active: boolean;
  tab: Tab | DropdownTab;
};

function TabPane({ className, active, tab }: TabPaneProps) {
  return (
    <div
      className={bemTabPane({ active: active, hidden: !active }, [className])}
      role="tabpanel"
    >
      <TabContent>
        {/* TODO: Tab.component and DropdownTab.component props */}
        <h1>{tab.title}</h1>
      </TabContent>
    </div>
  );
}

export default memo(TabPane);
