import { useState, useCallback } from "react";
import update from "immutability-helper";

function useDropdownTabs(initialSections) {
  const [sections, setSections] = useState(initialSections);

  const toggleLock = useCallback((key) => {
    setSections((sections) => {
      const [sectionIndex, tabIndex] = getSectionTabIndex(key, sections);

      if (sectionIndex == -1) {
        return sections;
      }

      return update(sections, {
        [sectionIndex]: {
          tabs: {
            [tabIndex]: {
              locked: {
                $apply: (value) => value,
              },
            },
          },
        },
      });
    });
  }, []);

  const toggleStar = useCallback((key) => {
    setSections((sections) => {
      const [sectionIndex, tabIndex] = getSectionTabIndex(key, sections);

      if (sectionIndex == -1) {
        return sections;
      }

      update(sections, {
        [sectionIndex]: {
          tabs: {
            [tabIndex]: {
              locked: {
                $apply: (value) => value,
              },
            },
          },
        },
      });
    });
  }, []);

  return {
    sections,
    setSections,
    toggleLock,
    toggleStar,
  };
}

function getSectionTabIndex(tabKey, sections) {
  let tabIndex = -1;

  const sectionIndex = sections.findIndex((s) => {
    tabIndex = s.tabs.findIndex((t) => t.key === tabKey);
    return tabIndex !== -1;
  });

  if (sectionIndex === -1) {
    console.error(`lockTab: cannot find tab with key {key}`);
  }

  return [sectionIndex, tabIndex];
}

export default useDropdownTabs;
