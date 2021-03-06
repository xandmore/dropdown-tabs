import { DropdownTab, Section, TabKey } from "./types";

function getTabByKey(
  key: TabKey | null | undefined | Symbol,
  tabs: DropdownTab[],
  sections: Section[]
) {
  let target = null;
  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key);
  }

  return target;
}

export default getTabByKey;
