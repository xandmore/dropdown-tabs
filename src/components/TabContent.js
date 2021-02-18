import React from "react";

function TabContent({ children, tag = "section" }) {
  const TabContentContainer = tag;

  return <TabContentContainer>{children}</TabContentContainer>;
}

export default TabContent;
