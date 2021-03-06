import React from "react";
import useTabsContext from "./Tabs/hooks/useTabsContext";
import Tabs from "./Tabs/Tabs/Tabs";

function TabsWithContext() {
  const {
    tabs,
    sections,
    activeKey,
    setActiveKey,
    closeDropdownTab,
  } = useTabsContext();

  return (
    <Tabs
      activeKey={activeKey}
      tabs={tabs}
      sections={sections}
      onChange={setActiveKey}
      onDropdownTabClose={closeDropdownTab}
    />
  );
}

export default TabsWithContext;
