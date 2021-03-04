import React from "react";
import "./styles.css";

import Tabs from "./components/Tabs/Tabs";
// import TabContent from "./components/TabContent";
// import useDropdownTabs from "./components/useDropdownTabs";

export default function App() {
  const tabs = [
    {
      key: "0",
      title: "Normal Tab",
    },
  ];

  const sections = [
    {
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
      title: "Another Section",
      tabs: [
        {
          key: "dropdownTab2",
          title: "Another Section Item 1",
        },
      ],
    },
    {
      title: "Empty Section",
    },
  ];

  return (
    <main>
      <Tabs tabs={tabs} sections={sections} />
      <div></div>
    </main>
  );
}
