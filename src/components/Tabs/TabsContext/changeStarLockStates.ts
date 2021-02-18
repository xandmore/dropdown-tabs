import { DropdownTab, TabKey } from "../types";
import { State } from "./reducer";

type TabLockAction = "lock" | "unlock" | "toggle";
type TabStarAction = "star" | "unstar" | "toggle";

export function changeTabsLockedState(
  state: State,
  tabKeys: TabKey | TabKey[],
  mode: TabLockAction
): State {
  return toggleTabProp(
    state,
    tabKeys,
    "locked",
    mode === "lock" ? true : mode === "unlock" ? false : mode
  );
}

export function changeTabsStarredState(
  state: State,
  tabKeys: TabKey | TabKey[],
  mode: TabStarAction
): State {
  return toggleTabProp(
    state,
    tabKeys,
    "starred",
    mode === "star" ? true : mode === "unstar" ? false : mode
  );
}

type DropdownTabToggleableProp = keyof Pick<DropdownTab, "locked" | "starred">;
type TogglePropValue = true | false | "toggle";

function toggleTabProp(
  state: State,
  tabKeys: TabKey | TabKey[],
  prop: DropdownTabToggleableProp,
  propValue: TogglePropValue
): State {
  const keysSet = new Set(Array.isArray(tabKeys) ? tabKeys : [tabKeys]);

  let isAnyChanged = false;
  const newSections = state.sections.map((section) => {
    let changed = false;
    const newTabs = section.tabs.map((tab) => {
      if (keysSet.has(tab.key)) {
        const newValue = propValue === "toggle" ? !tab[prop] : propValue;

        if (tab[prop] !== newValue) {
          changed = true;
          return {
            ...tab,
            [prop]: newValue,
          };
        }
      }

      return tab;
    });

    if (changed) {
      isAnyChanged = true;
      return { ...section, tabs: newTabs };
    }

    return section;
  });

  if (isAnyChanged) {
    return {
      ...state,
      sections: newSections,
    };
  }

  return state;
}
