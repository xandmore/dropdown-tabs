import React from "react";
import bem from "../../../helpers/bem";

const bemTabPane = bem("tab-pane");

export type TabPaneProps = {
  className?: string;
  active: boolean;
  children: React.ReactNode;
};

function TabPane({ className, active, children }: TabPaneProps) {
  return (
    <div
      className={bemTabPane({ active: active, hidden: !active }, [className])}
      role="tabpanel"
    >
      {children}
    </div>
  );
}

export default TabPane;
