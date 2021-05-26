import React, { FocusEventHandler, useCallback, useMemo } from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, Tab, TabKey } from "../types";
import { ReactComponent as CloseIcon } from "../../../assets/close_24dp.svg";
import { ReactComponent as LockIcon } from "../../../assets/lock_24dp.svg";
import { ReactComponent as StarIcon } from "../../../assets/star_outline_24dp.svg";
import useTabs from "../hooks/useTabs";
import useDropdownTabContext from "../DropdownTab/DropdownTabContext/useDropdownTabContext";
import useRipple from "../Tabs/hooks/useRipple";
import Ripple from "../Ripple/Ripple";
import useMergeHandlers from "../Tabs/hooks/useMergeHandlers";
import generateTabId from "../utils/generateTabId";

const bemMenu = bem("dropdown-menu");
const bemMenuItem = bem("dropdown-menu-item");
const bemIcon = bem("icon");

export type DropdownMenuProps = {
  open: boolean;
  sections: Section[];
  activeKey: TabKey | null;
};

export function DropdownMenu({ open, sections, activeKey }: DropdownMenuProps) {
  const { menuItemRef } = useDropdownTabContext();

  const sectionsJSX = useMemo(() => {
    const [elements] = sections.reduce<[React.ReactNode[], number]>(
      ([elements, menuItemsStartIndex], section, i) => {
        elements.push(
          !!section.tabs?.length && (
            <DropdownMenuSection
              id={`tabs-section-${section.key}`}
              key={section.key}
              tabs={section.tabs}
              title={section.title}
              activeKey={activeKey}
              menuItemRef={(element, tab, index) => {
                menuItemRef(element, tab, menuItemsStartIndex + index);
              }}
            />
          )
        );

        return [elements, menuItemsStartIndex + section.tabs.length];
      },
      [[], 0]
    );

    return elements;
  }, [sections, activeKey, menuItemRef]);

  return (
    <div
      role="presentation"
      aria-hidden={!open}
      className={bemMenu({ closed: !open })}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        switch (e.nativeEvent.code) {
          case "Enter":
          case "Space":
            e.stopPropagation();
        }
      }}
    >
      {sectionsJSX}
    </div>
  );
}

export type DropdownMenuSectionProps = {
  title: Section["title"];
  id: string;
  tabs: DropdownTab[];
  activeKey: TabKey | null;
  menuItemRef: (element: HTMLButtonElement, tab: Tab, index: number) => void;
};

function DropdownMenuSection({
  id,
  title,
  tabs,
  activeKey,
  menuItemRef,
}: DropdownMenuSectionProps) {
  return (
    <>
      <div className={bemMenu("section-title")}>
        <span className={"text-truncate"} id={id}>
          {title}
        </span>
      </div>
      <ul
        role="presentation"
        aria-labelledby={id}
        className={bemMenu("section")}
      >
        {tabs?.map((tab, index) => (
          <DropdownMenuItem
            menuItemRef={(el) => menuItemRef(el!, tab, index)}
            key={tab.key}
            tab={tab}
            active={activeKey === tab.key}
          />
        ))}
      </ul>
    </>
  );
}

export type DropdownMenuItemProps = {
  tab: DropdownTab;
  disabled?: boolean;
  active: boolean;
  menuItemRef: (el: HTMLButtonElement | null) => void;
};

function DropdownMenuItem({
  tab,
  active,
  disabled,
  menuItemRef,
}: DropdownMenuItemProps) {
  const { closeDropdownTab } = useTabs();
  const {
    onActivateMenuItem,
    onMenuItemFocus,
    focusedTabId,
  } = useDropdownTabContext();

  const { locked, starred, title } = tab;

  const {
    isRippleDisplayed,
    rippleRelatedHandlers,
    pressingInfo,
  } = useRipple();

  const onFocusCallback: FocusEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onMenuItemFocus(tab, e);
    },
    [onMenuItemFocus, tab]
  );

  const onFocus = useMergeHandlers(
    onFocusCallback,
    rippleRelatedHandlers.onFocus
  );

  const tabIndex = tab.key === focusedTabId ? 0 : -1;
  return (
    <li role="presentation" style={{ position: "relative" }}>
      <button
        role="tab"
        aria-selected={active}
        id={generateTabId(tab)}
        ref={(el) => menuItemRef((el as unknown) as HTMLButtonElement)}
        className={bemMenuItem("tab", {
          active: active,
          locked: locked,
          disabled: disabled,
        })}
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={(e) => {
          onActivateMenuItem(tab.key);
        }}
        {...rippleRelatedHandlers}
        onFocus={onFocus}
      >
        <Ripple
          visible={isRippleDisplayed}
          point={pressingInfo.point}
          mode={pressingInfo.pressing ? "pressing" : "focused"}
        />

        {starred && (
          <StarIcon
            className={bemIcon({ small: true }, [bemMenuItem("star-icon")])}
          />
        )}

        {locked && (
          <LockIcon
            className={bemIcon({ small: true }, [bemMenuItem("lock-icon")])}
          />
        )}

        <span className={bemMenuItem("title", ["text-truncate"])}>{title}</span>
      </button>
      {!locked && (
        <div className={bemMenuItem("close-button-wrapper")}>
          <button
            aria-label={`close ${tab.title} tab`}
            className={bemMenuItem("close-button")}
            tabIndex={tabIndex}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              closeDropdownTab(tab.key);
            }}
          >
            <CloseIcon className={bemIcon({ small: true })} />
          </button>
        </div>
      )}
    </li>
  );
}

export default DropdownMenu;
