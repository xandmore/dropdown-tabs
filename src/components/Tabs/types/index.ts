import { ReactNode } from "react";

export interface Tab {
  key: string;
  title: ReactNode;
}

export interface DropdownTab extends Tab {
  locked?: boolean;
  starred?: boolean;
}

export interface Section {
  key: string;
  title: ReactNode;
  tabs: DropdownTab[];
}

export type TabElementWithCustomFocus = Omit<HTMLButtonElement, "focus"> & {
  focus: (
    options?: Parameters<HTMLButtonElement["focus"]>[0] & {
      hideRipple: boolean;
    }
  ) => void;
};

export type TabsRef = {
  container: HTMLDivElement | null;

  tabs: Record<
    number,
    {
      element: TabElementWithCustomFocus | null;
      tab: Tab;
    }
  >;

  dropdownTab: {
    element: TabElementWithCustomFocus | null;
    id: Symbol;
  };

  dropdownItems: Record<
    number,
    {
      element: TabElementWithCustomFocus | null;
      tab: Tab;
    }
  >;
};

export type TabKey = Tab["key"];
