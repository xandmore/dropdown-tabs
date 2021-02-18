function getTabByKey(key, tabs, sections) {
  let target = null;
  for (let i = 0; !target && i < sections?.length; i++) {
    target = sections[i].tabs?.find((t) => t.key === key);
  }

  return target;
}

export default getTabByKey;
