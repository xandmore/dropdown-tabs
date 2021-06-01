import React, { useMemo, useEffect, useRef } from "react";
import TabPane from "./TabPane";
import useTabsContext from "../hooks/useTabsContext";
import { TabKey } from "../types";
import bem from "../../../helpers/bem";

const bemContainer = bem("tap-panes-container");

export type TabPanesContainerProps = {
  className?: string;
  classNameInner?: string;
};

function TabPanesContainer({
  className,
  classNameInner,
}: TabPanesContainerProps) {
  const { tabs, sections, activeKey } = useTabsContext();

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

  const prevActiveKey = useRef<TabKey | null>(null);

  useEffect(() => {
    prevActiveKey.current = activeKey;
  }, [activeKey]);

  const shift = useMemo(() => {
    return flattenTabs.findIndex((t) => t.key === activeKey);
  }, [flattenTabs, activeKey]);

  return (
    <div className={bemContainer(null, [className])}>
      <div
        className={bemContainer("inner", null, [classNameInner])}
        style={{ transform: `translateX(-${shift}00%)` }}
      >
        {flattenTabs.map((t) => (
          <TabPane key={t.key} active={activeKey === t.key} tab={t} />
        ))}
      </div>
    </div>
  );
}

export default TabPanesContainer;
