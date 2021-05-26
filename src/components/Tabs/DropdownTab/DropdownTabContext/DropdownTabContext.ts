import { createContext, FocusEvent } from "react";
import { Tab, TabKey } from "../../types";

export type DropdownTabContextValue = {
  menuItemRef: (el: HTMLButtonElement | null, tab: Tab, index: number) => void;
  onMenuItemFocus: (tab: Tab, e: FocusEvent<HTMLButtonElement>) => void;
  focusedTabId: TabKey | null | Symbol;
  onActivateMenuItem: (key: Required<TabKey>) => void;
  onCloseMenuItem: (key: Required<TabKey>) => void;
};

export const DropdownTabContext = createContext<DropdownTabContextValue>(
  {} as DropdownTabContextValue
);
