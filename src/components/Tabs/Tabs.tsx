import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TabComponent from "./TabComponent";
import bem from "../../helpers/bem";
import DropdownTabComponent from "./DropdownTab/DropdownTabComponent";
import { Section, Tab, TabKey } from "./types";
import Slider from "./Slider/Slider";
import getDropdownTabByKey from "./utils/getDropdownTabByKey";
import useSlider from "./Tabs/hooks/useSlider";

const bemTabs = bem("tabs");

type SliderRenderingInfo = {
  keys: string;
  tabsElements: Record<Tab["key"], HTMLDivElement | null>;
};

let rerender = 0;
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

  const { elementsRef, sliderDisplayInfo } = useSlider(activeTabKey, sections);

  // const allKeysJoined = useMemo(() => {
  //   return tabs
  //     .map((t) => t.key)
  //     .concat(sections.flatMap((s) => s.tabs.map((t) => t.key)))
  //     .join(";");
  // }, [tabs, sections]);
  //
  // if (allKeysJoined !== tabsRef.current.keys) {
  //   console.log("set", allKeysJoined);
  //   tabsRef.current.keys = allKeysJoined;
  // }

  console.log("RERENDER", rerender++);

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
        />
      )}

      {sliderDisplayInfo.isDisplayed && (
        <Slider left={sliderDisplayInfo.left} width={sliderDisplayInfo.width} />
      )}
    </div>
  );
}
export default TabsComponent;
