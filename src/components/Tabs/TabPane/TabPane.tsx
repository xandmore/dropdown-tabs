import React, { memo } from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Tab } from "../types";
import TabContent from "./TabContent/TabContent";
import generateTabId from "../utils/generateTabId";

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
      aria-hidden={!active}
      aria-controls={generateTabId(tab)}
    >
      <TabContent>
        {/* TODO: Tab.component and DropdownTab.component props */}
        <p>Content of {tab.title}</p>
      </TabContent>
    </div>
  );
}

export default memo(TabPane);
