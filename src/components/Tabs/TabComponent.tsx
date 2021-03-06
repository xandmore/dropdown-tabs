import React from "react";
import bem from "../../helpers/bem";
import { Tab } from "./types";

const bemTab = bem("tab");

export type TabProps = {
  title: Tab["title"];
  active: boolean;
  onClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

function TabComponent({ title, active, ...rest }: TabProps) {
  return (
    <div className={bemTab({ active: active })} role="tab" {...rest}>
      {title}
    </div>
  );
}

export default TabComponent;
