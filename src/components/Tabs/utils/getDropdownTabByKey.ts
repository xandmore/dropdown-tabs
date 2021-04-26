import { DropdownTab, Section, TabKey } from "../types";

function getTabInfoByKey(key: TabKey | null | undefined, sections: Section[]) {
  let target: DropdownTab | null = null;
  let section: Section | null = null;

  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key) ?? null;
    section = target ? sections[i] : null;
  }

  return { tab: target, section: section };
}

export default getTabInfoByKey;
