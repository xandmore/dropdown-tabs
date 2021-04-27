import React, { useContext } from "react";

import { Section } from "./components/Tabs/types";
import {
  TabsContext,
  TabsContextProvider,
} from "./components/Tabs/TabsContext/TabsContext";
import TabsWithContext from "./components/TabsWithContext";
import TabPanesContainer from "./components/Tabs/TabPane/TabPanesContaner";

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
          title: "Dropdown Tab 0",
        },
        {
          key: "dropdownTab1",
          title: "Menu item 1",
          locked: true,
          starred: true,
        },
      ],
    },
    {
      key: "s1",
      title:
        "Another Section Another Section Another Section Another Section Another Section Another Section",
      tabs: [
        {
          key: "dropdownTab2",
          title:
            "Another Section Item 1 Another Section Item 1 Another Section Item 1 Another Section Item 1",
          starred: true,
        },
        {
          key: "dropdownTab3",
          title: "Dropdown tab 3",
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

function Buttons() {
  const c = useContext(TabsContext);

  return (
    <div>
      <button
        onClick={() => {
          c.addTabs({
            tabs: [
              {
                key: "2",
                title: "Tab 2",
              },
            ],
          });
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          c.removeTabs(["2"]);
        }}
      >
        Remove
      </button>
    </div>
  );
}
