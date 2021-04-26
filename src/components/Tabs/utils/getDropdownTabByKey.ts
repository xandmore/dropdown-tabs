import { DropdownTab, Section, TabKey } from "../types";

function getTabByKey(key: TabKey | null | undefined, sections: Section[]) {
  let target: DropdownTab | null = null;
  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key) ?? null;
  }

  return target;
}

export default getTabByKey;
