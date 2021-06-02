import React, { useLayoutEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import bem from "../../../helpers/bem";

const bemRipple = bem("ripple");

export type RippleProps = {
  visible: boolean;
  point: { x: number; y: number } | null;
  mode: "focused" | "pressing";
};

function Ripple({ visible, mode, point }: RippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null!);
  const [innerSize, setInnerSize] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rect = rippleRef.current.getBoundingClientRect();
    setInnerSize(rect.height > rect.width ? rect.height : rect.width);
  });

  return (
    <div
      ref={rippleRef}
      className={bemRipple({
        hidden: !visible,
      })}
    >
      <div
        className={bemRipple("anchor")}
        style={{
          ...(point && {
            transform: `translateX(${point.x}px) translateY(${point.y}px)`,
          }),
        }}
      >
        <CSSTransition
          in={visible && mode === "pressing"}
          classNames="ripple"
          timeout={500}
        >
          <div
            className={bemRipple("body", {
              pulsate: mode === "focused",
            })}
            style={{
              width: innerSize,
              height: innerSize,
            }}
          />
        </CSSTransition>
      </div>
    </div>
  );
}

export default Ripple;
