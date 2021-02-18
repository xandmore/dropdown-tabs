import { State, addSections } from "./reducer";
import { DropdownTab, Tab, Section } from "../types";
import { addTabs } from "./addTabs";
import { closeDropdownTab } from "./closeDropdownTab";
import {
  changeTabsLockedState,
  changeTabsStarredState,
} from "./changeStarLockStates";
import { removeTabs } from "./removeTabs";

describe("removeTabs", () => {
  const state: State = {
    activeKey: null,

    tabs: [
      {
        key: "tab",
        title: "Tab",
      },
    ],

    sections: [
      {
        key: "section0",
        title: "Section 0",
        tabs: [
          {
            key: "section0-0",
            title: "Section0 Tab0",
          },
        ],
      },
    ],
  };

  test("accepts single key", () => {
    const newState = removeTabs(state, "tab");
    expect(newState.tabs).toHaveLength(0);
  });

  test("accepts array of keys", () => {
    const newState = removeTabs(state, ["tab", "non-existing-key"]);
    expect(newState.tabs).toHaveLength(0);
  });

  test("returns original state if there's no key to delete", () => {
    const newState = removeTabs(state, "non-existing-key");
    expect(newState).toBe(state);
  });

  test("removes tabs from sections", () => {
    const newState = removeTabs(state, "section0-0");
    expect(newState.sections[0].tabs).toHaveLength(0);
  });

  test("removes from both tabs and sections", () => {
    const newState = removeTabs(state, ["tab", "section0-0"]);
    expect(newState.sections[0].tabs).toHaveLength(0);
    expect(newState.tabs).toHaveLength(0);
  });
});

describe("closeTabs", () => {
  let state: State;

  beforeEach(() => {
    state = {
      activeKey: null,

      tabs: [
        {
          key: "tab",
          title: "Tab",
        },
      ],

      sections: [
        {
          key: "section0",
          title: "Section 0",
          tabs: [
            {
              key: "section0-0",
              title: "Section0 Tab0",
            },
          ],
        },
      ],
    };
  });

  test("activeKey is being kept when closing key is different", () => {
    let newState = closeDropdownTab(state, "section0-0");
    expect(newState.activeKey).toBeNull();

    state.activeKey = "tab";
    newState = closeDropdownTab(state, "section0-0");
    expect(newState.activeKey).toBe("tab");
  });

  test("removes tab from section", () => {
    let newState = closeDropdownTab(state, "section0-0");
    expect(newState.sections[0].tabs).toHaveLength(0);
  });

  test("precedence dropdown tab in the same section becomes active", () => {
    state.sections[0].tabs.push({ key: "section0-1", title: "" });
    state.activeKey = "section0-1";

    let newState = closeDropdownTab(state, "section0-1");
    expect(newState.activeKey).toBe("section0-0");
  });

  test("following dropdown tab's key in the same section becomes active if no precedence", () => {
    state.sections[0].tabs.push({ key: "section0-1", title: "" });
    state.activeKey = "section0-0";

    let newState = closeDropdownTab(state, "section0-0");
    expect(newState.activeKey).toBe("section0-1");
  });

  // if there's no precedence nor following tab is the same section, last normal tab becomes active
  test("last normal tab becomes active otherwise", () => {
    state.activeKey = "section0-0";

    let newState = closeDropdownTab(state, "section0-0");
    expect(newState.activeKey).toBe("tab");
  });

  // if there's no precedence nor following tab is the same section, nor normal tab
  test("activeKey becomes null if no available precedence tab", () => {
    state.activeKey = "section0-0";
    state.tabs = [];

    let newState = closeDropdownTab(state, "section0-0");
    expect(newState.activeKey).toBeNull();
  });
});

describe("changeTabsLockedState", () => {
  const state: State = {
    activeKey: null,
    tabs: [],
    sections: [
      {
        key: "section0",
        title: "Section 0",
        tabs: [
          {
            key: "section0-0",
            title: "Section0 Tab0",
            locked: false,
          },
          {
            key: "section0-1",
            title: "Section0 Tab1",
            locked: false,
          },
        ],
      },
    ],
  };

  it("locks single tab", () => {
    state.sections[0].tabs[0].locked = false;

    const newState = changeTabsLockedState(state, "section0-0", "lock");
    expect(newState.sections[0].tabs[0].locked).toBeTruthy();
  });

  it("locks multiple tabs", () => {
    state.sections[0].tabs[0].locked = false;
    state.sections[0].tabs[1].locked = false;

    const newState = changeTabsLockedState(
      state,
      ["section0-0", "section0-1"],
      "lock"
    );
    expect(newState.sections[0].tabs[0].locked).toBeTruthy();
    expect(newState.sections[0].tabs[1].locked).toBeTruthy();
  });

  it("returns the same state, when lock locked tab", () => {
    state.sections[0].tabs[0].locked = true;

    const newState = changeTabsLockedState(state, "section0-0", "lock");
    expect(newState.sections[0].tabs[0].locked).toBeTruthy();
    expect(newState).toEqual(state);
  });

  it("unlocks single tab", () => {
    state.sections[0].tabs[0].locked = true;

    const newState = changeTabsLockedState(state, "section0-0", "unlock");
    expect(newState.sections[0].tabs[0].locked).toBeFalsy();
  });

  it("unlocks multiple tabs", () => {
    state.sections[0].tabs[0].locked = true;
    state.sections[0].tabs[1].locked = true;

    const newState = changeTabsLockedState(
      state,
      ["section0-0", "section0-1"],
      "unlock"
    );

    expect(newState.sections[0].tabs[0].locked).toBeFalsy();
    expect(newState.sections[0].tabs[1].locked).toBeFalsy();
  });

  it("returns the same state, when unlock unlocked tab", () => {
    state.sections[0].tabs[0].locked = false;

    const newState = changeTabsLockedState(state, "section0-0", "unlock");
    expect(newState.sections[0].tabs[0].locked).toBeFalsy();
    expect(newState).toEqual(state);
  });

  it("toggles single tab", () => {
    state.sections[0].tabs[0].locked = false;

    const newState = changeTabsLockedState(state, "section0-0", "toggle");
    expect(newState.sections[0].tabs[0].locked).toBeTruthy();
  });

  it("toggles multiple tabs", () => {
    state.sections[0].tabs[0].locked = false;
    state.sections[0].tabs[1].locked = true;

    const newState = changeTabsLockedState(
      state,
      ["section0-0", "section0-1"],
      "toggle"
    );

    expect(newState.sections[0].tabs[0].locked).toBeTruthy();
    expect(newState.sections[0].tabs[1].locked).toBeFalsy();
  });
});

describe("changeTabsStarredState", () => {
  const state: State = {
    activeKey: null,
    tabs: [],
    sections: [
      {
        key: "section0",
        title: "Section 0",
        tabs: [
          {
            key: "section0-0",
            title: "Section0 Tab0",
            starred: false,
          },
          {
            key: "section0-1",
            title: "Section0 Tab1",
            starred: false,
          },
        ],
      },
    ],
  };

  it("stars single tab", () => {
    state.sections[0].tabs[0].starred = false;

    const newState = changeTabsStarredState(state, "section0-0", "star");
    expect(newState.sections[0].tabs[0].starred).toBeTruthy();
  });

  it("stars multiple tabs", () => {
    state.sections[0].tabs[0].starred = false;
    state.sections[0].tabs[1].starred = false;

    const newState = changeTabsStarredState(
      state,
      ["section0-0", "section0-1"],
      "star"
    );
    expect(newState.sections[0].tabs[0].starred).toBeTruthy();
    expect(newState.sections[0].tabs[1].starred).toBeTruthy();
  });

  it("returns the same state, when star starred tab", () => {
    state.sections[0].tabs[0].starred = true;

    const newState = changeTabsStarredState(state, "section0-0", "star");
    expect(newState.sections[0].tabs[0].starred).toBeTruthy();
    expect(newState).toEqual(state);
  });

  it("unstars single tab", () => {
    state.sections[0].tabs[0].starred = true;

    const newState = changeTabsStarredState(state, "section0-0", "unstar");
    expect(newState.sections[0].tabs[0].starred).toBeFalsy();
  });

  it("unstars multiple tabs", () => {
    state.sections[0].tabs[0].starred = true;
    state.sections[0].tabs[1].starred = true;

    const newState = changeTabsStarredState(
      state,
      ["section0-0", "section0-1"],
      "unstar"
    );

    expect(newState.sections[0].tabs[0].starred).toBeFalsy();
    expect(newState.sections[0].tabs[1].starred).toBeFalsy();
  });

  it("returns the same state, when unstar unstarred tab", () => {
    state.sections[0].tabs[0].starred = false;

    const newState = changeTabsStarredState(state, "section0-0", "unstar");
    expect(newState.sections[0].tabs[0].starred).toBeFalsy();
    expect(newState).toEqual(state);
  });

  it("toggles single tab", () => {
    state.sections[0].tabs[0].starred = false;

    const newState = changeTabsStarredState(state, "section0-0", "toggle");
    expect(newState.sections[0].tabs[0].starred).toBeTruthy();
  });

  it("toggles multiple tabs", () => {
    state.sections[0].tabs[0].starred = false;
    state.sections[0].tabs[1].starred = true;

    const newState = changeTabsStarredState(
      state,
      ["section0-0", "section0-1"],
      "toggle"
    );

    expect(newState.sections[0].tabs[0].starred).toBeTruthy();
    expect(newState.sections[0].tabs[1].starred).toBeFalsy();
  });
});

describe("addTabs", () => {
  let state: State;
  beforeEach(() => {
    state = {
      activeKey: null,
      tabs: [
        {
          key: "tab",
          title: "",
        },
      ],
      sections: [
        {
          key: "section0",
          title: "Section0",
          tabs: [
            {
              key: "section0-0",
              title: "section0-0",
            },
            {
              key: "section0-1",
              title: "section0-1",
            },
          ],
        },
        {
          key: "section1",
          title: "section1",
          tabs: [
            {
              key: "section1-0",
              title: "section1-0",
            },
          ],
        },
      ],
    };
  });

  it("adds normal tab", () => {
    const newState = addTabs(state, {
      tabs: [{ key: "tab1", title: "tab1" }],
    });
    expect(newState.tabs).toHaveLength(2);
    expect(newState.tabs[1].key).toBe("tab1");
  });

  it("adds multiple normal tab", () => {
    const newState = addTabs(state, {
      tabs: [
        { key: "tab1", title: "tab1" },
        { key: "tab2", title: "tab2" },
      ],
    });
    expect(newState.tabs).toHaveLength(3);
    expect(newState.tabs[1].key).toBe("tab1");
    expect(newState.tabs[2].key).toBe("tab2");
  });

  it("replaces normal tab, if already exist", () => {
    const newState = addTabs(state, {
      tabs: [{ key: "tab", title: "new tab" }],
    });
    expect(newState.tabs).toHaveLength(1);
    expect(newState.tabs[0].title).toBe("new tab");
  });

  it("adds dropdown tab", () => {
    const newState = addTabs(state, {
      dropdownTabs: {
        ["section0"]: [{ key: "section0-2", title: "section0-2" }],
      },
    });

    expect(newState.sections[0].tabs).toHaveLength(3);
    expect(newState.sections[0].tabs[2].key).toBe("section0-2");
  });

  it("replaces dropdown tab, if already exist", () => {
    const newState = addTabs(state, {
      dropdownTabs: {
        ["section0"]: [{ key: "section0-1", title: "section0-1" }],
      },
    });
    expect(newState.sections[0].tabs).toHaveLength(2);
    expect(newState.sections[0].tabs[1].key).toBe("section0-1");
  });

  it("adds dropdown tabs to different sections", () => {
    const newState = addTabs(state, {
      dropdownTabs: {
        ["section0"]: [{ key: "section0-2", title: "section0-2" }],
        ["section1"]: [{ key: "section1-1", title: "section1-1" }],
      },
    });

    expect(newState.sections[0].tabs).toHaveLength(3);
    expect(newState.sections[1].tabs).toHaveLength(2);

    expect(newState.sections[0].tabs[2].key).toBe("section0-2");
    expect(newState.sections[1].tabs[1].key).toBe("section1-1");
  });

  it("replaces dropdown tabs in different sections", () => {
    const firstTab: DropdownTab = {
      key: "section0-0",
      title: "updated 0-0",
    };

    const secondTab: DropdownTab = {
      key: "section1-0",
      title: "updated 1-0",
    };

    const newState = addTabs(state, {
      dropdownTabs: {
        ["section0"]: [firstTab],
        ["section1"]: [secondTab],
      },
    });

    expect(newState.sections[0].tabs).toHaveLength(2);
    expect(newState.sections[0].tabs[0]).toBe(firstTab);

    expect(newState.sections[1].tabs).toHaveLength(1);
    expect(newState.sections[1].tabs[0]).toBe(secondTab);
  });

  it("accepts both tabs and dropdown tabs", () => {
    const normalTab: Tab = {
      key: "tab1",
      title: "tab1",
    };

    const firstTab: DropdownTab = {
      key: "section0-2",
      title: "section0-2",
    };

    const secondTab: DropdownTab = {
      key: "section1-1",
      title: "section1-1",
    };

    const newState = addTabs(
      state,

      {
        tabs: [normalTab],
        dropdownTabs: {
          ["section0"]: [firstTab],
          ["section1"]: [secondTab],
        },
      }
    );

    expect(newState.tabs).toHaveLength(2);
    expect(newState.tabs[1]).toBe(normalTab);

    expect(newState.sections[0].tabs).toHaveLength(3);
    expect(newState.sections[0].tabs[2]).toBe(firstTab);

    expect(newState.sections[1].tabs).toHaveLength(2);
    expect(newState.sections[1].tabs[1]).toBe(secondTab);
  });

  it("returns the same state, if nothing to add", () => {
    let newState = addTabs(state, {});
    expect(newState).toBe(state);

    newState = addTabs(state, {
      tabs: [],
      dropdownTabs: {
        ["section0"]: [],
      },
    });
    expect(newState).toBe(state);
  });

  it("throws an error when adding dropdown tabs to non-existing section", () => {
    expect(() => {
      addTabs(state, {
        dropdownTabs: {
          ["non-existing"]: [
            {
              key: "tab of non-existing section",
              title: "",
            },
          ],
        },
      });
    }).toThrowError();
  });
});

describe("add sections", () => {
  const state: State = {
    activeKey: null,
    tabs: [],
    sections: [
      {
        key: "0",
        title: "0",
        tabs: [],
      },
    ],
  };

  it("adds sections", () => {
    const sectionToAdd: Section = {
      key: "newSection",
      title: "newSection",
      tabs: [
        {
          key: "newTab",
          title: "newTab",
        },
      ],
    };

    const updatedState = addSections(state, [sectionToAdd]);

    expect(updatedState.sections).toHaveLength(2);
    expect(updatedState.sections[1].tabs[0].key).toBe("newTab");
  });

  it("replaces existing section with the same key", () => {
    const sectionToAdd: Section = {
      key: "0",
      title: "updated",
      tabs: [
        {
          key: "newTab",
          title: "newTab",
        },
      ],
    };

    const updatedState = addSections(state, [sectionToAdd]);

    expect(updatedState.sections).toHaveLength(1);
    expect(updatedState.sections[0].title).toBe("updated");
    expect(updatedState.sections[0].tabs[0].key).toBe("newTab");
  });

  it("return the same state if nothing to add", () => {
    const updatedState = addSections(state, []);
    expect(updatedState).toBe(state);
  });
});
