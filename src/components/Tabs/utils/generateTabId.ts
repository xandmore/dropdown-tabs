import { Tab } from "../types";

function generateTabId(tab: Tab) {
  return `tab-${tab.key}`;
}

export default generateTabId;
