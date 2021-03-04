import React, { useEffect, useMemo, useRef, useState } from "react";
import { Section, Tab, TabKey } from "./types";

export type TabsContentContainerProps = {
  tabs: Tab[];
  sections: Section[];
  activeKey: TabKey;
};

function TabsContentContainer({
  tabs,
  sections,
  activeKey,
}: TabsContentContainerProps) {
  const [shift, setShift] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let index = getTabIndex(activeKey, tabs, sections);

    if (index === -1) {
      console.error(`Cannot find tab with key ${activeKey}`);
    } else {
      setShift(containerRef.current!.getBoundingClientRect().width * index);
    }
  }, [tabs, sections, activeKey]);

  return (
    <div ref={containerRef}>
      <div style={{ transform: `translateX(${shift}px)` }}></div>
    </div>
  );
}

/**
 * Returns tab index from tabs and sections.tabs union
 */
function getTabIndex(key: TabKey, tabs: Tab[], sections: Section[]) {
  let index = tabs?.findIndex((t) => t.key === key) ?? -1;

  if (index === -1) {
    index = tabs?.length ?? 0;

    for (let i = 0, tabIndex = -1; i < sections?.length; i++) {
      tabIndex = sections[i].tabs?.findIndex((t) => t.key === key) ?? -1;

      if (tabIndex !== -1) {
        index += tabIndex + 1;
        break;
      }

      index = index + sections[i].tabs?.length ?? 0;
    }
  }

  return index;
}

export default TabsContentContainer;
