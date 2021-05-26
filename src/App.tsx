import React, { useContext } from "react";

import { Section } from "./components/Tabs/types";
import {
  TabsContext,
  TabsContextProvider,
} from "./components/Tabs/TabsContext/TabsContext";
import TabsWithContext from "./components/TabsWithContext";
import TabPanesContainer from "./components/Tabs/TabPane/TabPanesContaner";
import getDropdownTabByKey from "./components/Tabs/utils/getDropdownTabByKey";

export default function App() {
  const tabs = [
    {
      key: "0",
      title: "OVERVIEW",
    },
  ];

  const sections: Section[] = [
    {
      key: "s0",
      title: "Active",
      tabs: [
        {
          key: "dropdownTab0",
          title: "Tab 0",
        },
        {
          key: "dropdownTab1",
          title: "Tab 2",
          locked: true,
          starred: true,
        },
      ],
    },
    {
      key: "s1",
      title: new Array(4).fill("Long Section Title").join(" "),
      tabs: [
        {
          key: "dropdownTab2",
          title: new Array(3).fill("Dropdown menu item 2").join(" "),
          starred: true,
        },
        {
          key: "dropdownTab3",
          title: "Tab 3",
          locked: true,
        },
      ],
    },
    {
      key: "s2",
      title: "Empty Section",
      tabs: [],
    },
  ];

  return (
    <TabsContextProvider
      defaultActiveKey={"0"}
      initialTabs={tabs}
      initialSections={sections}
    >
      <main style={{ padding: 100 }}>
        <TabsWithContext />
        <TabPanesContainer />
        <Buttons />
      </main>
    </TabsContextProvider>
  );
}

let newTabsCounter = 10;
function Buttons() {
  const {
    activeKey,
    setActiveKey,
    toggleStar,
    toggleLock,
    sections,
    closeDropdownTab,
    addTabs,
  } = useContext(TabsContext);

  const onToggleStar = () => {
    if (activeKey) {
      toggleStar(activeKey);
    }
  };

  const onToggleLock = () => {
    if (activeKey) {
      toggleLock(activeKey);
    }
  };

  const onCloseDropdown = () => {
    if (activeKey) {
      closeDropdownTab(activeKey);
    }
  };

  const isDropdownTab = !!getDropdownTabByKey(activeKey, sections)?.tab;

  const onAdd = () => {
    const key = `dropdownTab${newTabsCounter++}`;
    addTabs({
      dropdownTabs: {
        s0: [
          {
            key: key,
            title: "New Tab",
          },
        ],
      },
    });

    setActiveKey(key);
  };

  return (
    <div style={{ borderTop: "1px solid", marginTop: 24, padding: 8 }}>
      <p>Dropdown tab actions</p>

      <button disabled={!isDropdownTab} onClick={onToggleStar}>
        Toggle Star
      </button>
      <button disabled={!isDropdownTab} onClick={onToggleLock}>
        Toggle Lock
      </button>
      <button disabled={!isDropdownTab} onClick={onCloseDropdown}>
        Close
      </button>
      <button onClick={onAdd}>Add</button>
    </div>
  );
}
