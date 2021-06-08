import getDropdownTabByKey from "../../utils/getDropdownTabByKey";
import { Section, Tab, TabKey, TabsRef } from "../../types";
import {
  useCallback,
  useLayoutEffect,
  useState,
  MutableRefObject,
} from "react";

export type SliderRenderingInfo = {
  tabsElements: Record<Tab["key"], HTMLButtonElement | null>;
  dropdownTabElement: HTMLButtonElement | null;
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

function useSlider(
  activeTabKey: TabKey | null,
  sections: Section[],
  tabsRef: MutableRefObject<TabsRef>
) {
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

    let targetElement: HTMLElement | null =
      Object.values(tabsRef.current.tabs).find(
        (t) => t.tab.key === activeTabKey
      )?.element ?? null;

    if (!targetElement) {
      const isDropdownTab = !!getDropdownTabByKey(activeTabKey, sections)?.tab;
      targetElement = isDropdownTab
        ? (tabsRef.current.dropdownTab.element?.parentNode as HTMLElement)
        : null;
    }

    const newDisplayInfo: SlideDisplayInfo = {
      isDisplayed: !!targetElement,
      width: targetElement?.getBoundingClientRect().width ?? 0,
      left: targetElement?.offsetLeft ?? 0,
    };

    setDisplayInfo((d) => (isEqual(d, newDisplayInfo) ? d : newDisplayInfo));
  });

  const onDropdownTabWidthChange = useCallback(() => {
    const node = tabsRef.current.dropdownTab.element?.parentNode as HTMLElement;

    setDisplayInfo((prev) => {
      return {
        ...prev,
        width: node?.getBoundingClientRect().width ?? 0,
        left: node?.offsetLeft ?? 0,
      };
    });
  }, [tabsRef]);

  return {
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
