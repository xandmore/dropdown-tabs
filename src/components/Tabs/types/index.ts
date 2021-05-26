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

export type TabsRef = {
  container: HTMLDivElement | null;

  tabs: Record<
    number,
    {
      element: HTMLButtonElement | null;
      tab: Tab;
    }
  >;

  dropdownTab: {
    element: HTMLButtonElement | null;
    id: Symbol;
  };

  dropdownItems: Record<
    number,
    {
      element: HTMLButtonElement | null;
      tab: Tab;
    }
  >;
};

export type TabKey = Tab["key"];
