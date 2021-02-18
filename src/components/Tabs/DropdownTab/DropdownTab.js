import React, { useCallback, useEffect, useState } from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";

const bemTab = bem("tab");

function DropdownTab({
  onChange,
  sections,
  activeKey,
  defaultKey,
  placeholder = "Active Tabs"
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [activeTabInfo, setActiveTabInfo] = useState(() => {
    getTabByKey(activeKey) || getTabByKey(defaultKey, sections);
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

      return activeTabInfo ? false : true;
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
    (...args) => {
      onChange?.(...args);
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
          activeKey={activeKey}
        />
      )}
    </div>
  );
}

function getTabByKey(key, sections) {
  let target = null;
  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key);
  }

  return target;
}

export default DropdownTab;
