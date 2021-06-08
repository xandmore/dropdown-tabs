import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DropdownMenu from "../DropdownTabMenu/DropdownTabMenu";
import bem from "../../../helpers/bem";
import {
  DropdownTab,
  Section,
  TabElementWithCustomFocus,
  TabKey,
} from "../types";
import useWatchOutsideClick from "../DropdownTabMenu/hooks/useWatchOutsideClick";
import getDropdownTabByKey from "../utils/getDropdownTabByKey";
import { ReactComponent as DropdownIcon } from "../../../assets/arrow_drop_down_24dp.svg";
import Ripple from "../Ripple/Ripple";
import useRipple from "../Tabs/hooks/useRipple";
import useMergeHandlers from "../Tabs/hooks/useMergeHandlers";
import useDropdownTabContext from "./DropdownTabContext/useDropdownTabContext";
import { DropdownTabContextValue } from "./DropdownTabContext/DropdownTabContext";
import { DropdownTabContextProvider } from "./DropdownTabContext/DropdownTabContextProvider";
import useImperativeHandleProxy from "../hooks/useImperativeHandleProxy";

const bemTabContainer = bem("dropdown-tab-container");
const bemDropdownTab = bem("dropdown-tab");
const bemTab = bem("tab");

export type DropdownTabProps = Omit<
  React.ComponentPropsWithRef<"button">,
  "onChange"
> & {
  onChange: (key: TabKey) => void;
  sections: Section[];
  activeKey: TabKey | null;
  defaultKey?: TabKey;
  placeholder?: React.ReactNode;
  onWidthChange: (width: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownTabComponent = React.forwardRef<
  TabElementWithCustomFocus,
  DropdownTabProps
>(function DropdownTabComponent(
  {
    isMenuOpen,
    setIsMenuOpen,
    onWidthChange,
    onChange,
    sections,
    activeKey,
    defaultKey,
    placeholder = "ACTIVE TABS",
    ...props
  },
  ref
) {
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

      if (newInfo.tab !== tabInfo.tab || newInfo.section !== tabInfo.section) {
        return newInfo;
      }

      return tabInfo;
    });
  }, [sections, activeKey]);

  const isMenuItemActive = activeTabInfo.tab?.key === activeKey;

  useEffect(() => {
    if (!isMenuItemActive) {
      setIsMenuOpen(false);
    }
  }, [isMenuItemActive, setIsMenuOpen]);

  const prevTabWidth = useRef<number | null>(null);
  const innerTabRef = useRef<HTMLButtonElement>(null!);

  const closeOutsideClick = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

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

  const onClickProp = props.onClick;
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setIsMenuOpen((open) => {
        if (open) {
          return false;
        }

        if (isMenuItemActive) {
          return !open;
        }

        return !activeTabInfo.tab;
      });

      if (activeTabInfo.tab) {
        onChange(activeTabInfo.tab.key);
      }

      onClickProp?.(e);
    },
    [setIsMenuOpen, activeTabInfo.tab, isMenuItemActive, onChange, onClickProp]
  );

  const {
    isRippleDisplayed,
    rippleRelatedHandlers,
    pressingInfo,
    setFocusInfo,
  } = useRipple();

  const { onActivateMenuItem, ...restContextValues } = useDropdownTabContext();
  const onActivateMenuItemWrapped = useCallback<
    DropdownTabContextValue["onActivateMenuItem"]
  >(
    (tabKey, isInitiatedByKeyboard) => {
      onActivateMenuItem(tabKey, isInitiatedByKeyboard);

      // if menu item is activated via click then hide ripple
      if (!isInitiatedByKeyboard) {
        setFocusInfo((fi) => ({
          ...fi,
          focused: false,
        }));
      }
    },
    [onActivateMenuItem, setFocusInfo]
  );

  const contextValueOverridden: DropdownTabContextValue = {
    ...restContextValues,
    onActivateMenuItem: onActivateMenuItemWrapped,
  };

  useImperativeHandleProxy(
    ref,
    innerTabRef,
    () => ({
      focus: (options) => {
        innerTabRef.current?.focus();

        if (options?.hideRipple) {
          setFocusInfo((prev) => ({
            ...prev,
            focused: false,
          }));
        }
      },
    }),
    [setFocusInfo]
  );

  return (
    <div className={bemTabContainer()}>
      <button
        tabIndex={isMenuItemActive ? 0 : -1}
        className={bemTab({ active: isMenuItemActive, dropdown: true })}
        ref={(el) => {
          innerTabRef.current = el as HTMLButtonElement;

          if (ref) {
            if (typeof ref === "function") {
              ref(el);
            } else {
              ref.current = el;
            }
          }
        }}
        aria-haspopup={true}
        {...props}
        onTouchStart={useMergeHandlers(
          rippleRelatedHandlers.onTouchStart,
          props.onTouchStart
        )}
        onTouchEnd={useMergeHandlers(
          rippleRelatedHandlers.onTouchEnd,
          props.onTouchEnd
        )}
        onMouseDown={useMergeHandlers(
          rippleRelatedHandlers.onMouseDown,
          props.onMouseDown
        )}
        onMouseUp={useMergeHandlers(
          rippleRelatedHandlers.onMouseUp,
          props.onMouseUp
        )}
        onKeyDown={useMergeHandlers(
          rippleRelatedHandlers.onKeyDown,
          props.onKeyDown
        )}
        onKeyUp={useMergeHandlers(rippleRelatedHandlers.onKeyUp, props.onKeyUp)}
        onFocus={useMergeHandlers(rippleRelatedHandlers.onFocus, props.onFocus)}
        onBlur={useMergeHandlers(rippleRelatedHandlers.onBlur, props.onBlur)}
        onClick={onClick}
      >
        <Ripple
          visible={isRippleDisplayed}
          point={pressingInfo.point}
          mode={pressingInfo.pressing ? "pressing" : "focused"}
        />

        {activeTabInfo.tab && (
          <SelectedTabInfo
            isOpen={isMenuOpen}
            sectionTitle={sectionTitle}
            title={title}
            starred={starred}
            locked={locked}
          />
        )}

        {!activeTabInfo.tab && placeholder}
      </button>
      <DropdownTabContextProvider {...contextValueOverridden}>
        <DropdownMenu
          open={isMenuOpen}
          sections={sections}
          activeKey={activeKey}
        />
      </DropdownTabContextProvider>
    </div>
  );
});

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
