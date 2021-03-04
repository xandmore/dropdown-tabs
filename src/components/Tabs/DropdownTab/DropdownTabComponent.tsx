import React, { useCallback, useEffect, useState } from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";

const bemTab = bem("tab");

export type DropdownTabKey = TabKey | Symbol;

export type DropdownTabProps = {
  onChange: (key: DropdownTabKey) => void;
  sections: Section[];
  activeKey: DropdownTabKey;
  defaultKey?: TabKey | null;
  placeholder?: React.ReactNode;
};

function DropdownTabComponent({
  onChange,
  sections,
  activeKey,
  defaultKey,
  placeholder = "Active Tabs",
}: DropdownTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [activeTabInfo, setActiveTabInfo] = useState(() => {
    if (isSymbol(activeKey)) {
      return null;
    } else {
      return (
        getTabByKey(activeKey, sections) || getTabByKey(defaultKey!, sections)
      );
    }
  });

  useEffect(() => {
    setActiveTabInfo((tab) => {
      return getTabByKey(activeKey, sections) ?? tab;
    });
  }, [sections, activeKey]);

  const isActive =
    activeKey === Symbol.for("dropdownTab") ||
    !!getTabByKey(activeKey, sections);

  console.log("activeKey", activeKey);
  console.log("activeTabInfo", activeTabInfo);
  console.log("isActive", isActive);
  console.log("isOpen", isOpen);

  const onClick = useCallback(() => {
    setIsOpen((open) => {
      if (open) {
        return false;
      }

      if (isActive) {
        return !open;
      }

      return !activeTabInfo;
    });

    if (activeTabInfo) {
      onChange(activeTabInfo.key);
    }
  }, [isActive, activeTabInfo, onChange]);

  useEffect(() => {
    if (!isActive) {
      setIsOpen(false);
    }
  }, [isActive]);

  const title = activeTabInfo?.title ?? placeholder;

  const onSelectTab = useCallback(
    (tabKey: DropdownTabKey) => {
      onChange?.(tabKey);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div
      className={bemTab({ active: isActive })}
      style={{ position: "relative" }}
      onClick={onClick}
    >
      <span>{title}</span>
      <span style={{ marginLeft: 20 }}>🔻</span>
      {isOpen && (
        <DropdownMenu
          sections={sections}
          onChange={onSelectTab}
          activeKey={isSymbol(activeKey) ? null : activeKey}
        />
      )}
    </div>
  );
}

function getTabByKey(key: DropdownTabKey, sections: Section[]) {
  if (isSymbol(key)) {
    return null;
  }

  let target: DropdownTab | null = null;
  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key) ?? null;
  }

  return target;
}

function isSymbol<T>(key: T | Symbol): key is Symbol {
  return typeof key === "symbol";
}

export default DropdownTabComponent;
