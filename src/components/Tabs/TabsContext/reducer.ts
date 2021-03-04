import { SetStateAction } from "react";

import { DropdownTab, Section, Tab, TabKey } from "../types";
import { closeDropdownTab } from "./closeDropdownTab";
import { removeTabs } from "./removeTabs";
import { addTabs } from "./addTabs";
import {
  changeTabsLockedState,
  changeTabsStarredState,
  TabLockAction,
  TabStarAction,
} from "./changeStarLockStates";

export interface State {
  activeKey: TabKey | null;
  tabs: Tab[];
  sections: Section[];
}

export enum ActionType {
  SetActiveKey,
  CloseTabs,
  RemoveTabs,
  AddTabs,
  LockTabs,
  StarTabs,
  SetState,
}

export type PayloadType = {
  [ActionType.SetActiveKey]: State["activeKey"];
  [ActionType.CloseTabs]: { key: TabKey; newActiveKey?: TabKey };
  [ActionType.AddTabs]: {
    tabs?: Tab[];
    dropdownTabs?: Record<DropdownTab["key"], DropdownTab[]>;
  };
  [ActionType.RemoveTabs]: TabKey | TabKey[];
  [ActionType.LockTabs]: { keys: TabKey | TabKey[]; mode: TabLockAction };
  [ActionType.StarTabs]: { keys: TabKey | TabKey[]; mode: TabStarAction };
  [ActionType.SetState]: SetStateAction<State>;
};

export type ReducerAction<T> = T extends keyof PayloadType
  ? { type: T; payload: PayloadType[T] }
  : never;

export function reducer(state: State, action: ReducerAction<ActionType>) {
  switch (action.type) {
    case ActionType.SetActiveKey: {
      return { ...state, activeKey: action.payload };
    }

    case ActionType.CloseTabs: {
      return closeDropdownTab(
        state,
        action.payload.key,
        action.payload.newActiveKey
      );
    }

    case ActionType.AddTabs: {
      return addTabs(state, action.payload);
    }

    case ActionType.StarTabs: {
      return changeTabsStarredState(
        state,
        action.payload.keys,
        action.payload.mode
      );
    }

    case ActionType.LockTabs: {
      return changeTabsLockedState(
        state,
        action.payload.keys,
        action.payload.mode
      );
    }

    case ActionType.RemoveTabs: {
      return removeTabs(state, action.payload);
    }

    case ActionType.SetState: {
      return typeof action.payload === "function"
        ? action.payload(state)
        : action.payload;
    }

    default:
      return state;
  }
}
