import React from "react";
import bem from "../../helpers/bem";
import { Tab } from "./types";

const bemTab = bem("tab");

export type TabProps = {
  title: Tab["title"];
  active: boolean;
  onClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

const TabComponent = React.forwardRef<HTMLDivElement, TabProps>(
  function TabComponent({ title, active, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={bemTab({ active: active })}
        role="tab"
        {...rest}
      >
        <span className={bemTab("title")}>{title}</span>
      </div>
    );
  }
);

export default TabComponent;
