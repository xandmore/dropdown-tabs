import getDropdownTabByKey from "../../utils/getDropdownTabByKey";
import { Section, Tab, TabKey } from "../../types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type SliderRenderingInfo = {
  tabsElements: Record<Tab["key"], HTMLDivElement | null>;
  dropdownTabElement: HTMLDivElement | null;
};

export type SlideDisplayInfo = {
  isDisplayed: boolean;
  width: number;
  left: number;
};

function useSlider(activeTabKey: TabKey | null, sections: Section[]) {
  // console.log("useSlider", activeTabKey);
  const elementsRef = useRef<SliderRenderingInfo>({
    tabsElements: {},
    dropdownTabElement: null,
  });

  // window.requestAnimationFrame(() => {
  //   console.log("Requested");
  // });

  const displayInfoRef = useRef<SlideDisplayInfo>(null);
  const [, forceRerender] = useState<SlideDisplayInfo>({
    isDisplayed: false,
    width: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    if (activeTabKey != null) {
      console.log(
        "layout",
        elementsRef.current.dropdownTabElement?.clientWidth
      );
    }
  });

  useEffect(() => {
    if (activeTabKey != null) {
      console.log(
        "use effect ",
        elementsRef.current.dropdownTabElement?.clientWidth,
        elementsRef.current.dropdownTabElement?.getBoundingClientRect(),
        elementsRef.current.dropdownTabElement
      );
    }
  });

  if (activeTabKey == null) {
    const displayInfo: SlideDisplayInfo = {
      isDisplayed: false,
      width: 0,
      left: 0,
    };

    // forceRerender((s) => {
    //   console.log("!!!!!!!!" + isEqual(s, displayInfo));
    //   return s;
    // });
    //
    // forceRerender((s) => {
    //   return isEqual(s, displayInfo) ? s : displayInfo;
    // });

    return {
      elementsRef,
      sliderDisplayInfo: displayInfo,
    };
  }

  let tabElement = elementsRef.current.tabsElements[activeTabKey];

  if (!tabElement) {
    const isDropdownTab = !!getDropdownTabByKey(activeTabKey, sections);
    tabElement = isDropdownTab ? elementsRef.current.dropdownTabElement : null;
  }

  const displayInfo: SlideDisplayInfo = {
    isDisplayed: !!tabElement,
    width: tabElement?.clientWidth ?? 0,
    left: tabElement?.offsetLeft ?? 0,
  };

  // if (displayInfo)
  // setSliderDisplayInfo((s) => {
  //   return isEqual(s, displayInfo) ? s : displayInfo;
  // });

  // forceRerender((s) => {
  //   console.log("!!!!!!!!" + isEqual(s, displayInfo));
  //   return s;
  // });

  return {
    elementsRef,
    sliderDisplayInfo: displayInfo,
  };
}

function isEqual(obj1: SlideDisplayInfo, obj2: SlideDisplayInfo) {
  console.log(obj1, obj2);
  return (
    obj1.isDisplayed === obj2.isDisplayed &&
    obj1.left === obj2.left &&
    obj1.width === obj2.width
  );
}
export default useSlider;
