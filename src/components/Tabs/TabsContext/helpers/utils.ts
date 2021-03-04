import { Section, TabKey } from "../../types";

export function tabsToMapLike<T extends { key: string }>(
  tabs: T[]
): Record<string, T> {
  return tabs.reduce<Record<string, T>>((obj, tab: T) => {
    obj[tab.key] = tab;
    return obj;
  }, {});
}

export function getSectionTabIndex(sections: Section[], tabKey: TabKey) {
  for (let i = 0; i < sections.length; i++) {
    const tabIndex = sections[i].tabs.findIndex((t) => t.key === tabKey);

    if (tabIndex !== -1) {
      return { sectionIndex: i, tabIndex: tabIndex };
    }
  }
}
