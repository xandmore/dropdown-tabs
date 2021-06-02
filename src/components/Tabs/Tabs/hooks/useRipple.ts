import { TouchEvent, useCallback, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type PressingInfo = {
  pressing: boolean;
  point: Point | null;
};

type FocusInfo = {
  focused: boolean;
  source: string | null;
};

function useRipple() {
  const [focusInfo, setFocusInfo] = useState<FocusInfo>({
    focused: false,
    source: null,
  });

  const [pressingInfo, setIsPressingInfo] = useState<PressingInfo>({
    pressing: false,
    point: null,
  });

  const showRipple = useCallback((p?: Point) => {
    setIsPressingInfo({
      pressing: true,
      point: p || null,
    });
  }, []);

  const hideRipple = useCallback(() => {
    setIsPressingInfo({
      pressing: false,
      point: null,
    });
  }, []);

  const isMousePressed = useRef(false);

  const eventHandlers = {
    onKeyDown: useCallback(
      (e) => {
        switch (e.nativeEvent.code) {
          case "Enter":
          case "Space":
            showRipple();
            break;
          default:
            break;
        }
      },
      [showRipple]
    ),

    onKeyUp: useCallback(
      (e) => {
        switch (e.nativeEvent.code) {
          case "Enter":
          case "Space":
            hideRipple();
            break;
          default:
            break;
        }
      },
      [hideRipple]
    ),

    onMouseDown: useCallback(
      (e) => {
        isMousePressed.current = true;
        setFocusInfo((f) => ({ ...f, source: "mouse" }));
        showRipple({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        });
      },
      [showRipple]
    ),

    onMouseUp: useCallback(() => {
      isMousePressed.current = false;
      hideRipple();
    }, [hideRipple]),

    onMouseLeave: useCallback(() => {
      isMousePressed.current = false;
      hideRipple();
    }, [hideRipple]),

    onBlur: useCallback(() => {
      hideRipple();
      setFocusInfo({
        focused: false,
        source: null,
      });
    }, [hideRipple]),

    onFocus: useCallback((e) => {
      setFocusInfo({
        focused: true,
        source: isMousePressed.current ? "mouse" : "keyboard",
      });
    }, []),

    onTouchStart: useCallback(
      (e: TouchEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const rect = target.getBoundingClientRect();
        if (e.targetTouches[0]) {
          const x = e.targetTouches[0].pageX - rect.left;
          const y = e.targetTouches[0].pageY - rect.top;
          isMousePressed.current = true;
          setFocusInfo((f) => ({ ...f, source: "mouse" }));
          showRipple({
            x,
            y,
          });
        }
      },
      [showRipple]
    ),

    onTouchEnd: useCallback(() => {
      isMousePressed.current = false;
      hideRipple();
    }, [hideRipple]),
  };

  const isRippleDisplayed =
    pressingInfo.pressing ||
    (focusInfo.focused && focusInfo.source === "keyboard");

  return {
    isRippleDisplayed,
    pressingInfo,
    rippleRelatedHandlers: eventHandlers,
    setFocusInfo,
  };
}

export default useRipple;
