import { Section } from "../types";
import { ActionType, State, ReducerAction } from "./reducer";

export function removeTabs(
  state: State,
  keys: ReducerAction<ActionType.RemoveTabs>["payload"]
): State {
  const keysToRemove = Array.isArray(keys) ? new Set(keys) : new Set([keys]);

  // handle tabs
  let updatedTabs = state.tabs.filter((t) => !keysToRemove.has(t.key));
  if (updatedTabs.length === state.tabs.length) {
    updatedTabs = state.tabs;
  }

  // handle dropdown sections
  const sectionsWillBeChanged = state.sections.some((s) =>
    s.tabs.some((t) => keysToRemove.has(t.key))
  );

  if (updatedTabs === state.tabs && !sectionsWillBeChanged) {
    return state;
  }

  const updatedSections = state.sections.reduce((sections, section) => {
    let sectionTabs = section.tabs.filter((t) => !keysToRemove.has(t.key));

    if (sectionTabs.length === section.tabs.length) {
      sections.push(section);
      return sections;
    }

    sections.push({ ...section, tabs: sectionTabs });
    return sections;
  }, [] as Section[]);

  return {
    ...state,
    tabs: updatedTabs,
    sections: updatedSections,
  };
}
