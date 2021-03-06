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

export type TabKey = Tab["key"];
