import React from "react";
import bem from "../../../helpers/bem";
import { Tab } from "../types";
import Ripple from "../Ripple/Ripple";
import useRipple from "./hooks/useRipple";
import useMergeHandlers from "./hooks/useMergeHandlers";

const bemTab = bem("tab");

export type TabProps = Omit<React.ComponentPropsWithRef<"button">, "title"> & {
  title: Tab["title"];
  active: boolean;
  id: Tab["key"];
};

const TabComponent = React.forwardRef<HTMLButtonElement, TabProps>(
  function TabComponent({ title, active, id, ...props }, ref) {
    const {
      isRippleDisplayed,
      rippleRelatedHandlers,
      pressingInfo,
    } = useRipple();

    return (
      <button
        tabIndex={active ? 0 : -1}
        ref={ref}
        className={bemTab({ active: active })}
        role="tab"
        aria-selected={active}
        id={id}
        {...props}
        onFocus={useMergeHandlers(rippleRelatedHandlers.onFocus, props.onFocus)}
        onBlur={useMergeHandlers(rippleRelatedHandlers.onBlur, props.onBlur)}
        onMouseDown={useMergeHandlers(
          rippleRelatedHandlers.onMouseDown,
          props.onMouseDown
        )}
        onMouseUp={useMergeHandlers(
          rippleRelatedHandlers.onMouseUp,
          props.onMouseUp
        )}
        onTouchStart={useMergeHandlers(
          rippleRelatedHandlers.onTouchStart,
          props.onTouchStart
        )}
        onTouchEnd={useMergeHandlers(
          rippleRelatedHandlers.onTouchEnd,
          props.onTouchEnd
        )}
        onKeyDown={useMergeHandlers(
          rippleRelatedHandlers.onKeyDown,
          props.onKeyDown
        )}
        onKeyUp={useMergeHandlers(rippleRelatedHandlers.onKeyUp, props.onKeyUp)}
      >
        <Ripple
          visible={isRippleDisplayed}
          point={pressingInfo.point}
          mode={pressingInfo.pressing ? "pressing" : "focused"}
        />
        <span className={bemTab("title")}>{title}</span>
      </button>
    );
  }
);

export default TabComponent;
