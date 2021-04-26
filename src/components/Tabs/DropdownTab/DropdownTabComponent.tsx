import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";
import { Section, TabKey } from "../types";
import useWatchOutsideClick from "../DropdownTabMenu/hooks/useWatchOutsideClick";
import getDropdownTabByKey from "../utils/getDropdownTabByKey";

const bemTab = bem("tab");

export type DropdownTabProps = {
  onChange: (key: TabKey) => void;
  sections: Section[];
  activeKey: TabKey | null;
  defaultKey?: TabKey;
  placeholder?: React.ReactNode;
};

const DropdownTabComponent = React.forwardRef<HTMLDivElement, DropdownTabProps>(
  function DropdownTabComponent(
    { onChange, sections, activeKey, defaultKey, placeholder = "Active Tabs" },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);

    const [activeTabInfo, setActiveTabInfo] = useState(() => {
      return getDropdownTabByKey(
        activeKey !== null ? activeKey : defaultKey,
        sections
      );
    });

    useEffect(() => {
      setActiveTabInfo((tab) => {
        return (
          getDropdownTabByKey(activeKey, sections) ??
          getDropdownTabByKey(tab?.key, sections)
        );
      });
    }, [sections, activeKey]);

    const isActive = activeTabInfo?.key === activeKey;

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
    const innerTabRef = useRef<HTMLDivElement | null>(null);

    const closeOutsideClick = useCallback(() => {
      setIsOpen(false);
    }, []);

    useWatchOutsideClick(innerTabRef, closeOutsideClick);

    useLayoutEffect(() => {
      console.log("!!! DD tab rerendered", innerTabRef.current?.clientWidth);
    });

    return (
      <div
        ref={(el) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(el);
            } else {
              ref.current = el;
            }
          }

          innerTabRef.current = el;
        }}
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
);

export default DropdownTabComponent;
