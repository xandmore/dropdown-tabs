import { createContext, FocusEvent } from "react";
import { Tab, TabElementWithCustomFocus, TabKey } from "../../types";

export type DropdownTabContextValue = {
  menuItemRef: (
    el: TabElementWithCustomFocus | null,
    tab: Tab,
    index: number
  ) => void;
  onMenuItemFocus: (tab: Tab, e: FocusEvent<HTMLElement>) => void;
  focusedTabId: TabKey | null | Symbol;
  onActivateMenuItem: (
    key: Required<TabKey>,
    isInitiatedByKeyboard?: boolean
  ) => void;
  onCloseMenuItem: (key: Required<TabKey>, keyboardInitiated?: boolean) => void;
};

export const DropdownTabContext = createContext<DropdownTabContextValue>(
  {} as DropdownTabContextValue
);
