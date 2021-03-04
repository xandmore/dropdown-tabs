import React, { useMemo } from "react";
import TabPane from "./TabPane";
import useTabs from "../hooks/useTabs";

function TabPanesContainer() {
  const { tabs, sections, activeKey } = useTabs();

  const flattenTabs = useMemo(() => {
    let flatten = tabs ? [...tabs] : [];

    flatten =
      sections?.reduce?.((flatten, s) => {
        if (s.tabs?.length) {
          flatten.push(...s.tabs);
        }

        return flatten;
      }, flatten) ?? flatten;

    return flatten;
  }, [tabs, sections]);

  return (
    <div>
      {flattenTabs.map((t) => (
        <TabPane key={t.key} active={activeKey === t.key}>
          TabPane content
        </TabPane>
      ))}
    </div>
  );
}

export default TabPanesContainer;
