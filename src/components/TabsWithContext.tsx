import React from "react";
import useTabs from "../components/Tabs/hooks/useTabs";
import Tabs from "../components/Tabs/Tabs";

function TabsWithContext() {
  const { tabs, sections, activeKey, setActiveKey, onTabClose } = useTabs();

  return (
    <Tabs
      activeKey={activeKey}
      tabs={tabs}
      sections={sections}
      onChange={(key) => setActiveKey(key)}
      onDropdownTabClose={onTabClose}
    />
  );
}

export default TabsWithContext;
