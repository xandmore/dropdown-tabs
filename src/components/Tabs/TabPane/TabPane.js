import React from "react";
import bem from "../../../helpers/bem";

const bemTabPane = bem("tab-pane");

function TabPane({ className, active, children }) {
  return (
    <div className={bemTabPane({ active: active }, className)} role="tabpanel">
      {children}
    </div>
  );
}

export default TabPane;
