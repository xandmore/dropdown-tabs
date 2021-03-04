import React, { PropsWithChildren } from "react";

export type TabContentProps = PropsWithChildren<{
  tag?: keyof JSX.IntrinsicElements;
}>;

function TabContent({ children, tag = "section" }: TabContentProps) {
  const TabContentContainer = tag;

  return <TabContentContainer>{children}</TabContentContainer>;
}

export default TabContent;
