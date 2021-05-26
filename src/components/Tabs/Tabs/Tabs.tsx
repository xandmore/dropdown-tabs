import React, { useCallback, useMemo, useRef, useState } from "react";
import TabComponent from "./TabComponent";
import DropdownTabComponent from "../DropdownTab/DropdownTabComponent";
import { Section, Tab, TabKey, TabsRef } from "../types";
import Slider from "../Slider/Slider";
import useSlider from "./hooks/useSlider";
import useKeyDownHandler from "./hooks/useKeyDownHandler";
import { DropdownTabContextProvider } from "../DropdownTab/DropdownTabContext/DropdownTabContextProvider";
import generateTabId from "../utils/generateTabId";

const DROPDOWN_TAB_KEY = Symbol();

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
    (key: TabKey | null) => {
      if (onChangeProp) {
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

  const tabsRef = useRef<TabsRef>({
    tabs: {},
    container: null,
    dropdownTab: {},
    dropdownItems: {},
  } as TabsRef);

  const { sliderDisplayInfo, onDropdownTabWidthChange } = useSlider(
    activeTabKey,
    sections,
    tabsRef
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    focusedTabId,
    onDropdownTabFocus,
    onTabFocus,
    onTabBlur,
    onItemFocus,
  } = useKeyDownHandler({ tabsRef, isMenuOpen, setIsMenuOpen });

  return (
    <div
      className="tabs"
      role="tablist"
      ref={(el) => {
        tabsRef.current.container = el;
      }}
    >
      {tabs.map((tab, index) => (
        <TabComponent
          key={tab.key}
          id={generateTabId(tab)}
          ref={(el) => {
            if (!el) {
              delete tabsRef.current.tabs[index];
              return;
            }

            tabsRef.current.tabs[index] = {
              element: el,
              tab: tab,
            };
          }}
          title={tab.title}
          active={activeTabKey === tab.key}
          onClick={() => onChange(tab.key)}
          onBlur={onTabBlur}
          onFocus={() => onTabFocus(tab.key)}
        />
      ))}

      <DropdownTabContextProvider
        menuItemRef={(el, tab, index) => {
          if (!el) {
            delete tabsRef.current.dropdownItems[index];
            return;
          }

          tabsRef.current.dropdownItems[index] = {
            tab: tab,
            element: el,
          };
        }}
        onMenuItemFocus={(tab, e) => {
          onItemFocus(tab.key, e);
        }}
        focusedTabId={focusedTabId}
        onCloseMenuItem={onDropdownTabClose}
        onActivateMenuItem={useCallback(
          (tabKey) => {
            tabsRef.current.container?.focus();
            setIsMenuOpen(false);
            onChange(tabKey);
          },
          [onChange]
        )}
      >
        {isDropdownTabDisplayed && (
          <DropdownTabComponent
            ref={(el) => {
              tabsRef.current.dropdownTab = {
                id: DROPDOWN_TAB_KEY,
                element: el,
              };
            }}
            onFocus={(e) => {
              onDropdownTabFocus(DROPDOWN_TAB_KEY, e);
            }}
            activeKey={activeTabKey}
            onChange={onChange}
            sections={sections}
            defaultKey={defaultActiveKey}
            onWidthChange={onDropdownTabWidthChange}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </DropdownTabContextProvider>

      {sliderDisplayInfo.isDisplayed && (
        <Slider left={sliderDisplayInfo.left} width={sliderDisplayInfo.width} />
      )}
    </div>
  );
}

export default TabsComponent;
