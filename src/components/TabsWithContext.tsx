import React from "react";
import Tabs from "./Tabs/Tabs";
import useTabs from "./Tabs/hooks/useTabs";

function TabsWithContext() {
  const { sections, tabs, onTabClose, activeKey } = useTabs();
  return <Tabs defaultActiveKey="" />;
}

export default TabsWithContext;
