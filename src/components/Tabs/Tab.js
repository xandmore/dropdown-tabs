import React from "react";
import bem from "../../helpers/bem";

const bemTab = bem("tab");

function Tab({ title, active, ...rest }) {
  return (
    <div className={bemTab({ active: active })} role="tab" {...rest}>
      {title}
    </div>
  );
}

export default Tab;
