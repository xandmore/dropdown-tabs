import React, { useCallback, useMemo, useRef, useState } from "react";
import TabComponent from "./TabComponent";
import DropdownTabComponent from "../DropdownTab/DropdownTabComponent";
import { Section, Tab, TabKey, TabsRef } from "../types";
import Slider from "../Slider/Slider";
import useSlider from "./hooks/useSlider";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import { DropdownTabContextProvider } from "../DropdownTab/DropdownTabContext/DropdownTabContextProvider";
import generateTabId from "../utils/generateTabId";
import { DropdownTabContextValue } from "../DropdownTab/DropdownTabContext/DropdownTabContext";

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
    dropdownTab: {
      id: DROPDOWN_TAB_KEY,
      element: null,
      container: null,
    },
    dropdownItems: {},
  } as TabsRef);

  const { sliderDisplayInfo, onDropdownTabWidthChange } = useSlider(
    activeTabKey,
    sections,
    tabsRef
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { focusedTabId, handlers } = useKeyboardNavigation({
    tabsRef,
    isMenuOpen,
    setIsMenuOpen,
  });

  const onCloseMenuItem = useCallback<
    DropdownTabContextValue["onCloseMenuItem"]
  >(
    (tabKey, initiatedByKeyboard) => {
      onDropdownTabClose(tabKey);

      const dropdownTabs = Object.entries(tabsRef.current.dropdownItems);

      const focusTheFirstTabOrContainer = () => {
        if (tabsRef.current.tabs[0]?.element) {
          tabsRef.current.tabs[0].element!.focus();
        } else {
          tabsRef.current.container?.focus();
        }
      };

      if (tabKey === activeTabKey) {
        if (dropdownTabs.length > 1) {
          tabsRef.current.dropdownTab.element?.focus({
            hideRipple: !initiatedByKeyboard,
          });
        } else {
          focusTheFirstTabOrContainer();
        }
        return;
      }

      // set focus on prev menuItems if possible
      if (dropdownTabs.length > 1) {
        const index = +dropdownTabs.find(
          ([, tab]) => tab.tab.key === tabKey
        )![0];

        const newIndex = index === 0 ? 1 : index - 1;
        tabsRef.current.dropdownItems[newIndex].element?.focus({
          hideRipple: !initiatedByKeyboard,
        });
      } else {
        focusTheFirstTabOrContainer();
      }
    },
    [onDropdownTabClose, activeTabKey]
  );

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
          onBlur={handlers.onTabBlur}
          onFocus={() => handlers.onTabFocus(tab)}
        />
      ))}

      <DropdownTabContextProvider
        menuItemRef={useCallback((el, tab, index) => {
          if (!el) {
            delete tabsRef.current.dropdownItems[index];
            return;
          }

          tabsRef.current.dropdownItems[index] = {
            tab: tab,
            element: el,
          };
        }, [])}
        onMenuItemFocus={handlers.onItemFocus}
        focusedTabId={focusedTabId}
        onCloseMenuItem={onCloseMenuItem}
        onActivateMenuItem={useCallback(
          (tabKey) => {
            tabsRef.current.dropdownTab.element?.focus();
            setIsMenuOpen(false);
            onChange(tabKey);
          },
          [onChange]
        )}
      >
        {isDropdownTabDisplayed && (
          <DropdownTabComponent
            containerRef={(el) => {
              tabsRef.current.dropdownTab.container = el;
            }}
            onContainerBlur={handlers.onDropdownTabContainerBlur}
            ref={(el) => {
              tabsRef.current.dropdownTab.element = el;
            }}
            onFocus={(e) => {
              handlers.onDropdownTabFocus(DROPDOWN_TAB_KEY, e);
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
