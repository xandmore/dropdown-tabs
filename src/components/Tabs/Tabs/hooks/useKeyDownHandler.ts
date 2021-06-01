import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Tab, TabKey, TabsRef } from "../../types";

enum KeyCode {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Escape = "Escape",
  Home = "Home",
  End = "End",
}

type Handlers = {
  onTabFocus: (tab: Tab, e?: React.FocusEvent) => void;
  onTabBlur: (e?: React.FocusEvent) => void;
  onDropdownTabFocus: (id: Symbol, e?: React.FocusEvent) => void;
  onItemFocus: (tab: Tab, e: React.FocusEvent) => void;
};

function nextOrFirst(currentIndex: number, max: number) {
  return currentIndex === max ? 0 : currentIndex + 1;
}

function prevOrLast(currentIndex: number, max: number) {
  return currentIndex === 0 ? max : currentIndex - 1;
}

function useKeyDownHandler({
  tabsRef,
  isMenuOpen,
  setIsMenuOpen,
}: {
  tabsRef: React.MutableRefObject<TabsRef>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [focusedTabId, setFocusedTabId] = useState<TabKey | null | Symbol>(
    null
  );

  const handlers: Handlers = {
    onTabFocus: (tab) => {
      setFocusedTabId(tab.key);
    },
    onTabBlur: () => {
      setFocusedTabId(null);
    },
    onDropdownTabFocus: (id) => {
      setFocusedTabId(id);
    },
    onItemFocus: (tab, e) => {
      e?.stopPropagation();
      setFocusedTabId(tab.key);
    },
  };

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const tabsContainer = tabsRef.current.container;

      if (!tabsContainer?.contains(e.target as Node)) {
        return;
      }

      const tabKeys = Object.keys(tabsRef.current?.tabs ?? {}).sort();
      const focusedTabIndex = tabKeys.findIndex(
        (key) => tabsRef.current?.tabs[+key].tab.key === focusedTabId
      );
      const maxTabIndex = tabKeys.length - 1;

      if (focusedTabIndex !== -1) {
        handleKeyDownOnTab(
          e.code as KeyCode,
          focusedTabIndex,
          maxTabIndex,
          tabsRef.current
        );
        return;
      }

      const isDropdownTabFocused =
        focusedTabId === tabsRef.current.dropdownTab.id;

      if (isDropdownTabFocused) {
        handleDropdownTabKeydown(
          e.code as KeyCode,
          maxTabIndex,
          tabsRef.current,
          {
            isMenuOpen: isMenuOpen,
            openMenu: () => setIsMenuOpen(true),
            closeMenu: () => setIsMenuOpen(false),
          }
        );
        return;
      }

      const menuItemsKeys = Object.keys(
        tabsRef.current?.dropdownItems ?? {}
      ).sort();

      const focusedMenuItemIndex = menuItemsKeys.findIndex(
        (key) => tabsRef.current?.dropdownItems[+key].tab.key === focusedTabId
      );

      const isMenuItemFocused = focusedMenuItemIndex !== -1;

      if (isMenuItemFocused) {
        handleDropdownMenuItemKeyDown(
          e.code as KeyCode,
          focusedMenuItemIndex,
          maxTabIndex,
          tabsRef.current,
          () => setIsMenuOpen(false)
        );
        return;
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [focusedTabId, tabsRef, isMenuOpen, setIsMenuOpen]);

  return {
    focusedTabId,
    handlers,
  };
}

function handleKeyDownOnTab(
  keyCode: KeyCode,
  focusedIndex: number,
  maxTabIndex: number,
  tabsInfo: TabsRef
) {
  const dropdownTabElement = tabsInfo.dropdownTab.element;

  switch (keyCode) {
    case KeyCode.ArrowLeft:
      if (dropdownTabElement && focusedIndex === 0) {
        dropdownTabElement?.focus();
      } else {
        tabsInfo.tabs[prevOrLast(focusedIndex, maxTabIndex)].element?.focus();
      }
      break;

    case KeyCode.ArrowRight:
      if (dropdownTabElement && focusedIndex === maxTabIndex) {
        dropdownTabElement.focus();
      } else {
        tabsInfo.tabs[nextOrFirst(focusedIndex, maxTabIndex)].element?.focus();
      }
      break;

    case KeyCode.Home:
      tabsInfo.tabs[0]?.element?.focus();
      break;

    case KeyCode.End:
      if (dropdownTabElement) {
        dropdownTabElement?.focus();
      } else {
        tabsInfo.tabs[maxTabIndex]?.element?.focus();
      }
      break;

    default:
      break;
  }
}

function handleDropdownMenuItemKeyDown(
  keyCode: KeyCode,
  focusedMenuItemIndex: number,
  maxTabIndex: number,
  tabsInfo: TabsRef,
  closeMenu: () => void
) {
  const maxMenuItemIndex = Object.keys(tabsInfo.dropdownItems).length - 1;
  switch (keyCode) {
    case KeyCode.ArrowLeft:
      tabsInfo.tabs[maxTabIndex]?.element?.focus();
      closeMenu();
      break;

    case KeyCode.ArrowRight:
      tabsInfo.tabs[0]?.element?.focus();
      closeMenu();
      break;

    case KeyCode.ArrowUp:
      {
        const nextIndex = prevOrLast(focusedMenuItemIndex, maxMenuItemIndex);
        tabsInfo.dropdownItems[nextIndex]?.element?.focus();
      }
      break;

    case KeyCode.ArrowDown:
      {
        const nextIndex = nextOrFirst(focusedMenuItemIndex, maxMenuItemIndex);
        tabsInfo.dropdownItems[nextIndex]?.element?.focus();
      }
      break;

    case KeyCode.Home:
      tabsInfo.dropdownItems[0]?.element?.focus();
      break;

    case KeyCode.End:
      tabsInfo.dropdownItems[maxMenuItemIndex]?.element?.focus();
      break;

    case KeyCode.Escape:
      tabsInfo.dropdownTab.element?.focus();
      closeMenu();
      break;

    default:
      break;
  }
}

function handleDropdownTabKeydown(
  keyCode: KeyCode,
  maxTabIndex: number,
  tabsInfo: TabsRef,
  {
    isMenuOpen,
    closeMenu,
    openMenu,
  }: {
    isMenuOpen: boolean;
    closeMenu: () => void;
    openMenu: () => void;
  }
) {
  const menuItems = tabsInfo.dropdownItems;
  const maxMenuItemIndex = Object.keys(menuItems).length - 1;

  switch (keyCode) {
    case KeyCode.ArrowLeft:
      {
        const tabElement = tabsInfo.tabs[maxTabIndex].element;
        if (tabElement) {
          tabElement.focus();
          closeMenu();
        }
      }
      break;

    case KeyCode.ArrowRight:
      {
        const tabElement = tabsInfo.tabs[0]?.element;
        if (tabElement) {
          tabElement.focus();
          closeMenu();
        }
      }
      break;

    case KeyCode.ArrowUp:
      if (isMenuOpen) {
        menuItems[maxMenuItemIndex].element?.focus();
      } else {
        openMenu();
      }
      break;

    case KeyCode.ArrowDown:
      if (isMenuOpen) {
        menuItems[0].element?.focus();
      } else {
        openMenu();
      }
      break;

    case KeyCode.Home:
      tabsInfo.tabs[0].element?.focus();
      closeMenu();
      break;

    case KeyCode.Escape:
      closeMenu();
      break;

    default:
      break;
  }
}

export default useKeyDownHandler;
