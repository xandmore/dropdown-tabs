import { Section, Tab, TabKey } from "../types";
import { closeDropdownTab } from "./closeDropdownTab";

export interface State {
  activeKey: TabKey | null;
  tabs: Tab[];
  sections: Section[];
}

export enum ActionType {
  CloseTabs,
  RemoveTabs,
  // AddTabs,
  LockTabs,
  // StarTabs,
  // SetState
}

type PayloadType = {
  [ActionType.CloseTabs]: { keys: TabKey | TabKey[]; newActiveKey?: TabKey };
  [ActionType.RemoveTabs]: TabKey | TabKey[];
  [ActionType.LockTabs]: TabKey | TabKey[];
};

export type ReducerAction<T> = T extends ActionType
  ? { type: T; payload: PayloadType[T] }
  : never;

export function reducer(state: State, action: ReducerAction<ActionType>) {
  switch (action.type) {
    case ActionType.CloseTabs: {
      return state;
    }

    case ActionType.RemoveTabs: {
      return state;
    }

    default:
      return state;
  }
}
