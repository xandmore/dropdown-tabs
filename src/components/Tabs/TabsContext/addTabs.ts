import { tabsToMapLike } from "./helpers/utils";
import { DropdownTab, Section, Tab } from "../types";
import update from "immutability-helper";
import { State } from "./reducer";

/** Replaces matching existing tabs */
export function addTabs(
  state: State,
  payload: {
    tabs?: Tab[];
    /** Where a key is the section key */
    dropdownTabs?: Record<Section["key"], DropdownTab[]>;
  }
): State {
  if (!Object.keys(payload).length) {
    return state;
  }

  const { tabs, dropdownTabs } = payload;

  // handling tabs
  let updatedState = tabs?.length
    ? update(state, {
        tabs: {
          $apply: (prevTabs: Tab[]) => {
            return handleAddTabs(prevTabs, tabs);
          },
        },
      })
    : state;

  // handle dropdownTabs

  if (dropdownTabs) {
    const modifyingSectionsKeys = new Set(Object.keys(dropdownTabs));
    updatedState.sections.forEach((s) => modifyingSectionsKeys.delete(s.key));

    if (modifyingSectionsKeys.size) {
      throw new Error("Trying to add dropdown tabs to non-existing section");
    }
  } else {
    return updatedState;
  }

  return update(updatedState, {
    sections: {
      $apply: (sections: Section[]) => {
        let changed = false;
        const newSections = sections.map((section) => {
          if (!dropdownTabs[section.key]?.length) {
            return section;
          }

          const newTabs = handleAddTabs(
            section.tabs,
            dropdownTabs[section.key]
          );

          if (newTabs !== section.tabs) {
            changed = true;
            return {
              ...section,
              tabs: newTabs,
            };
          }

          return section;
        });

        return changed ? newSections : sections;
      },
    },
  });
}

function handleAddTabs<T extends { key: string }>(
  original: T[],
  tabsToAdd: T[]
) {
  const tabsMapLike = tabsToMapLike(tabsToAdd);
  let changed = false;

  const newTabs = original.map((t) => {
    const newTab = tabsMapLike[t.key];

    if (newTab) {
      changed = true;
      delete tabsMapLike[t.key];
      return newTab;
    }

    return t;
  });

  const restTabs = Object.values(tabsMapLike);

  if (restTabs.length) {
    changed = true;
    newTabs.push(...restTabs);
  }

  return changed ? newTabs : original;
}
