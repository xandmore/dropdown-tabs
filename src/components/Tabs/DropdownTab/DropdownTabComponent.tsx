import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";
import useWatchOutsideClick from "../DropdownTabMenu/hooks/useWatchOutsideClick";
import getDropdownTabByKey from "../utils/getDropdownTabByKey";
import { ReactComponent as DropdownIcon } from "../../../assets/arrow_drop_down_24dp.svg";

const bemTab = bem("tab");
const bemDropdownTab = bem("dropdown-tab");

export type DropdownTabProps = {
  onChange: (key: TabKey) => void;
  sections: Section[];
  activeKey: TabKey | null;
  defaultKey?: TabKey;
  placeholder?: React.ReactNode;
  onWidthChange: (width: number) => void;
};

const DropdownTabComponent = React.forwardRef<HTMLDivElement, DropdownTabProps>(
  function DropdownTabComponent(
    {
      onWidthChange,
      onChange,
      sections,
      activeKey,
      defaultKey,
      placeholder = "ACTIVE TABS",
    },
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
      setActiveTabInfo((tabInfo) => {
        let newInfo = getDropdownTabByKey(activeKey, sections);

        if (!newInfo.tab) {
          newInfo = getDropdownTabByKey(tabInfo.tab?.key, sections);
        }

        if (
          newInfo.tab !== tabInfo.tab ||
          newInfo.section !== tabInfo.section
        ) {
          return newInfo;
        }

        return tabInfo;
      });
    }, [sections, activeKey]);

    const isActive = activeTabInfo.tab?.key === activeKey;

    const onClick = useCallback(() => {
      setIsOpen((open) => {
        if (open) {
          return false;
        }

        if (isActive) {
          return !open;
        }

        return !activeTabInfo.tab;
      });

      if (activeTabInfo.tab) {
        onChange(activeTabInfo.tab.key);
      }
    }, [isActive, activeTabInfo.tab, onChange]);

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

    const prevTabWidth = useRef<number | null>(null);
    const innerTabRef = useRef<HTMLDivElement>({} as HTMLDivElement);

    const closeOutsideClick = useCallback(() => {
      setIsOpen(false);
    }, []);

    useWatchOutsideClick(innerTabRef, closeOutsideClick);

    useLayoutEffect(() => {
      const width = innerTabRef.current.clientWidth ?? 0;
      if (prevTabWidth.current !== width) {
        prevTabWidth.current = width;
        onWidthChange?.(width);
      }
    });

    const title = activeTabInfo.tab?.title;
    const sectionTitle = activeTabInfo.section?.title;
    const starred = activeTabInfo.tab?.starred;
    const locked = activeTabInfo.tab?.locked;

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

          innerTabRef.current = el as HTMLDivElement;
        }}
        className={bemTab({ active: isActive, dropdown: true })}
        style={{ position: "relative" }}
        onClick={onClick}
      >
        {activeTabInfo.tab && (
          <SelectedTabInfo
            isOpen={isOpen}
            sectionTitle={sectionTitle}
            title={title}
            starred={starred}
            locked={locked}
          />
        )}
        {!activeTabInfo.tab && placeholder}

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

type SelectedTabInfoProps = {
  isOpen: boolean;
  sectionTitle: Section["title"];
  title: DropdownTab["title"];
  starred: DropdownTab["starred"];
  locked: DropdownTab["locked"];
};

function SelectedTabInfo({
  isOpen,
  sectionTitle,
  title,
  starred,
  locked,
}: SelectedTabInfoProps) {
  return (
    <div className={bemDropdownTab()}>
      <span className={bemDropdownTab("section-title", ["text-truncate"])}>
        {sectionTitle}
      </span>
      <span className={bemDropdownTab("title", ["text-truncate"])}>
        {title}
      </span>
      {starred && (
        <span className={bemDropdownTab("indicator", { star: true })} />
      )}
      {locked && (
        <span className={bemDropdownTab("indicator", { lock: true })} />
      )}
      <DropdownIcon
        className={bemDropdownTab("dropdown-icon", { open: isOpen })}
      />
    </div>
  );
}

export default DropdownTabComponent;
