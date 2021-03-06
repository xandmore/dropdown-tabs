import React from "react";
import "./styles1.scss";

import { Section } from "./components/Tabs/types";
import { TabsContextProvider } from "./components/Tabs/TabsContext/TabsContext";
import TabsWithContext from "./components/TabsWithContext";
import TabPanesContainer from "./components/Tabs/TabPane/TabPanesContaner";
import TabPane from "./components/Tabs/TabPane/TabPane";

export default function App() {
  const tabs = [
    {
      key: "0",
      title: "Normal Tab",
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
      title: "Another Section",
      tabs: [
        {
          key: "dropdownTab2",
          title: "Another Section Item 1",
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
      <main>
        <TabsWithContext />
        <TabPanesContainer />
      </main>
    </TabsContextProvider>
  );
}
