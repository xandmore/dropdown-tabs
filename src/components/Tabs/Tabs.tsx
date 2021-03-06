import React, { useCallback, useMemo, useState } from "react";
import TabComponent from "./TabComponent";
import bem from "../../helpers/bem";
import DropdownTabComponent from "./DropdownTab/DropdownTabComponent";
import { Section, Tab, TabKey } from "./types";

const bemTabs = bem("tabs");

export type TabsProps = {
  tabs: Tab[];
  sections: Section[];
  onChange: (key: TabKey | null) => void;
  onDropdownTabClose: (key: TabKey) => void;
  activeKey?: TabKey | null;
  defaultActiveKey?: TabKey;
};

function TabsComponent({
  tabs,
  sections,
  onChange: onChangeProp,
  onDropdownTabClose,
  activeKey: activeKeyProp,
  defaultActiveKey,
}: TabsProps) {
  const [activeKeyInner, setActiveKeyInner] = useState(() =>
    activeKeyProp !== undefined ? activeKeyProp : defaultActiveKey ?? null
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
          defaultKey={defaultActiveKey}
        />
      )}
      {/* <Slider /> */}
    </div>
  );
}

// function Slider(props) {
//   const style = {
//     width: 80,
//   };
//
//   return <span class="tabs__slider" {...props} style={style}></span>;
// }

export default TabsComponent;
