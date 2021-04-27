import React, { useCallback, useMemo, useState } from "react";
import TabComponent from "./TabComponent";
import DropdownTabComponent from "../DropdownTab/DropdownTabComponent";
import { Section, Tab, TabKey } from "../types";
import Slider from "../Slider/Slider";
import useSlider from "./hooks/useSlider";

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

  const {
    elementsRef,
    sliderDisplayInfo,
    onDropdownTabWidthChange,
  } = useSlider(activeTabKey, sections);

  return (
    <div className="tabs">
      {tabs.map((t) => (
        <TabComponent
          key={t.key}
          title={t.title}
          ref={(el) => {
            elementsRef.current.tabsElements[t.key] = el;
          }}
          onClick={() => onChange(t.key)}
          active={activeTabKey === t.key}
        />
      ))}

      {isDropdownTabDisplayed && (
        <DropdownTabComponent
          ref={(el) => (elementsRef.current.dropdownTabElement = el)}
          activeKey={activeTabKey}
          onChange={onChange}
          sections={sections}
          defaultKey={defaultActiveKey}
          onWidthChange={onDropdownTabWidthChange}
        />
      )}

      {sliderDisplayInfo.isDisplayed && (
        <Slider left={sliderDisplayInfo.left} width={sliderDisplayInfo.width} />
      )}
    </div>
  );
}
export default TabsComponent;
