import getDropdownTabByKey from "../../utils/getDropdownTabByKey";
import { Section, Tab, TabKey } from "../../types";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type SliderRenderingInfo = {
  tabsElements: Record<Tab["key"], HTMLDivElement | null>;
  dropdownTabElement: HTMLDivElement | null;
};

export type SlideDisplayInfo = {
  isDisplayed: boolean;
  width: number;
  left: number;
};

const defaultDiplayInfo: SlideDisplayInfo = {
  isDisplayed: false,
  width: 0,
  left: 0,
};

function useSlider(activeTabKey: TabKey | null, sections: Section[]) {
  const elementsRef = useRef<SliderRenderingInfo>({
    tabsElements: {},
    dropdownTabElement: null,
  });

  const [displayInfo, setDisplayInfo] = useState<SlideDisplayInfo>({
    isDisplayed: false,
    width: 0,
    left: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (activeTabKey == null) {
      setDisplayInfo((d) =>
        isEqual(d, defaultDiplayInfo) ? d : defaultDiplayInfo
      );
      return;
    }

    let tabElement = elementsRef.current.tabsElements[activeTabKey];

    if (!tabElement) {
      const isDropdownTab = !!getDropdownTabByKey(activeTabKey, sections)?.tab;
      tabElement = isDropdownTab
        ? elementsRef.current.dropdownTabElement
        : null;
    }

    const newDisplayInfo: SlideDisplayInfo = {
      isDisplayed: !!tabElement,
      width: tabElement?.getBoundingClientRect().width ?? 0,
      left: tabElement?.offsetLeft ?? 0,
    };

    setDisplayInfo((d) => (isEqual(d, newDisplayInfo) ? d : newDisplayInfo));
  });

  const onDropdownTabWidthChange = useCallback(() => {
    setDisplayInfo((prev) => {
      return {
        ...prev,
        width:
          elementsRef.current.dropdownTabElement?.getBoundingClientRect()
            .width ?? 0,
        left: elementsRef.current.dropdownTabElement?.offsetLeft ?? 0,
      };
    });
  }, []);

  return {
    elementsRef,
    sliderDisplayInfo: displayInfo,
    onDropdownTabWidthChange: onDropdownTabWidthChange,
  };
}

function isEqual(obj1: SlideDisplayInfo, obj2: SlideDisplayInfo) {
  return (
    obj1.isDisplayed === obj2.isDisplayed &&
    obj1.left === obj2.left &&
    obj1.width === obj2.width
  );
}
export default useSlider;
