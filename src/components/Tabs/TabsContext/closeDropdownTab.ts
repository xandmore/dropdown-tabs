import { Tab, TabKey } from "../types";
import { getSectionTabIndex } from "./helpers/utils";
import update from "immutability-helper";
import { State } from "./reducer";

export function closeDropdownTab(
  state: State,
  key: TabKey,
  newActiveKey?: TabKey
): State {
  const sectionTabIndex = getSectionTabIndex(state.sections, key);

  if (!sectionTabIndex) {
    console.error("trying to close non-existing tab");
    return state;
  }

  const { sectionIndex, tabIndex } = sectionTabIndex;

  newActiveKey = state.activeKey;

  // TODO: change the algorithm after introduce disabled tabs (disabled tab cannot be selected)
  if (state.activeKey === key) {
    const section = state.sections[sectionIndex];

    // set new tab in the same section active
    if (section.tabs.length > 1) {
      const newIndex = tabIndex ? tabIndex - 1 : 1;
      newActiveKey = section.tabs[newIndex].key;
    } else {
      // set the last tab of any of previous sections
      let targetDropdownTab: Tab | null = null;
      for (let i = sectionIndex; i >= 0; i++) {
        const tabs = state.sections[i].tabs;

        if (tabs.length) {
          targetDropdownTab = tabs[tabs.length - 1];
          break;
        }
      }

      // or the last tab if there's no precedent dropdownTab
      newActiveKey =
        targetDropdownTab?.key ?? state.tabs.length
          ? state.tabs[state.tabs.length - 1]?.key ?? null
          : null;
    }
  }

  return update(state, {
    activeKey: {
      $set: newActiveKey,
    },
    sections: {
      [sectionIndex]: {
        tabs: {
          $splice: [[tabIndex, 1]],
        },
      },
    },
  });
}
