import React, { useCallback, useMemo, useState } from "react";
import Tab from "./Tab";
import bem from "../../helpers/bem";
import DropdownTab from "./DropdownTab/DropdownTab";
// import { TabsInnerContextProvider } from "./TabContent";

const bemTabs = bem("tabs");

const dropdownTabKeySymbol = Symbol();

function Tabs({
  tabs,
  sections,
  onTabClose,
  onTabLocked,
  onTabStarred,
  onChange: onChangeProp,
  activeKey: activeKeyProp,
  defaultActiveKey,
  defaultDropdownKey
}) {
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
        <Tab
          key={t.key}
          title={t.title}
          onClick={() => onChange(t.key)}
          active={activeTabKey === t.key}
        />
      ))}

      {isDropdownTabDisplayed && (
        <DropdownTab
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
    width: 80
  };

  return <span class="tabs__slider" {...props} style={style}></span>;
}

export default Tabs;
