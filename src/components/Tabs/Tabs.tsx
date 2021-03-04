import React, { useCallback, useMemo, useState } from "react";
import TabComponent from "./TabComponent";
import bem from "../../helpers/bem";
import DropdownTabComponent from "./DropdownTab/DropdownTabComponent";
import { Section, Tab } from "./types";
import useTabs from "./hooks/useTabs";
// import { TabsInnerContextProvider } from "./TabContent";

const bemTabs = bem("tabs");

export type TabsProps = {
  // tabs: Tab[];
  // sections: Section[];
  defaultActiveKey: Tab["key"];
};

function TabsComponent({
  // tabs,
  // sections,
  onChange: onChangeProp,
  activeKey: activeKeyProp,
  defaultActiveKey,
}: // defaultDropdownKey,
TabsProps) {
  // const { sections, activeKey, onTabClose, removeTabs } = useTabs();

  const [activeKeyInner, setActiveKeyInner] = useState(() =>
    activeKey !== undefined ? activeKey : defaultActiveKey ?? null
  );

  const onChange = useCallback(
    (key) => {
      if (onChangeProp && key !== Symbol.for("dropdownTab")) {
        onChangeProp(key);
      }

      setActiveKeyInner(key);
    },
    [onChangeProp]
  );

  const activeTabKey =
    activeKeyProp !== undefined ? activeKeyProp : activeKeyInner;

  const isDropdownTabDisplayed = useMemo(
    () => sections.some((s) => s.tabs.length),
    [sections]
  );

  return (
    <div className="tabs">
      {tabs.map((t) => (
        <TabComponent
          key={t.key}
          title={t.title}
          onClick={() => onChange(t.key)}
          active={activeTabKey === t.key}
        />
      ))}

      {isDropdownTabDisplayed && (
        <DropdownTabComponent
          activeKey={activeTabKey}
          onChange={onChange}
          sections={sections}
          defaultKey={defaultDropdownKey}
        />
      )}
      {/* <Slider /> */}
    </div>
  );
}

function Slider(props) {
  const style = {
    width: 80,
  };

  return <span class="tabs__slider" {...props} style={style}></span>;
}

export default TabsComponent;
