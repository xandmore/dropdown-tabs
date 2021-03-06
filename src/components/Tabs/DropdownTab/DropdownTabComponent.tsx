import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";
import useWatchOutsideClick from "../DropdownTabMenu/hooks/useWatchOutsideClick";

const bemTab = bem("tab");

export type DropdownTabProps = {
  onChange: (key: TabKey) => void;
  sections: Section[];
  activeKey: TabKey | null;
  defaultKey?: TabKey;
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
    return getTabByKey(activeKey !== null ? activeKey : defaultKey, sections);
  });

  useEffect(() => {
    setActiveTabInfo((tab) => {
      return (
        getTabByKey(activeKey, sections) ?? getTabByKey(tab?.key, sections)
      );
    });
  }, [sections, activeKey]);

  const isActive = activeTabInfo?.key === activeKey;

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

  const onSelectTab = useCallback(
    (tabKey: TabKey) => {
      onChange?.(tabKey);
      setIsOpen(false);
    },
    [onChange]
  );

  const title = activeTabInfo?.title ?? placeholder;
  const tabRef = useRef<HTMLDivElement>(null);

  const closeOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  useWatchOutsideClick(tabRef, closeOutsideClick);

  return (
    <div
      ref={tabRef}
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

function getTabByKey(key: TabKey | null | undefined, sections: Section[]) {
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
