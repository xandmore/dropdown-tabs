import React from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";
const bemMenu = bem("dropdown-menu");
const bemMenuItem = bem("dropdown-menu-item");

export type DropdownMenuProps = {
  onChange: (key: TabKey) => void;
  sections: Section[];
  activeKey: TabKey | null;
};

export function DropdownMenu({
  onChange,
  sections,
  activeKey,
}: DropdownMenuProps) {
  return (
    <div className={bemMenu()} onClick={(e) => e.stopPropagation()}>
      {sections.map((s, i) => {
        return (
          !!s.tabs?.length && (
            <DropdownMenuSection
              onChange={onChange}
              {...s}
              activeKey={activeKey}
            />
          )
        );
      })}
    </div>
  );
}

export type DropdownMenuSectionProps = {
  title: Section["title"];
  tabs: DropdownTab[];
  onChange: (key: TabKey) => void;
  activeKey: TabKey | null;
};

function DropdownMenuSection({
  title,
  tabs,
  onChange,
  activeKey,
}: DropdownMenuSectionProps) {
  return (
    <div className={bemMenu("section")}>
      <div className={bemMenu("section-title")}>
        <span className={bemMenu("section-title-text", ["text-truncate"])}>
          {title}
        </span>
      </div>
      <ul className={bemMenu("section")}>
        {tabs?.map((tab) => (
          <DropdownMenuItem
            {...tab}
            onClick={() => onChange(tab.key)}
            active={activeKey === tab.key}
          />
        ))}
      </ul>
    </div>
  );
}

export type DropdownMenuItemProps = {
  active: boolean;
  disabled?: boolean;
  title: DropdownTab["title"];
  locked?: boolean;
  starred?: boolean;
  onClick: () => void;
};

function DropdownMenuItem({
  active,
  disabled,
  title,
  locked,
  starred,
  onClick,
}: DropdownMenuItemProps) {
  return (
    <li
      className={bemMenuItem({
        active: active,
        locked: locked,
        disabled: disabled,
      })}
      onClick={disabled ? undefined : onClick}
    >
      {starred && (
        <span
          role="img"
          aria-label="Starred"
          className={bemMenuItem("star-icon")}
        >
          ⭐
        </span>
      )}
      {locked && (
        <span
          role="img"
          aria-label="Locked"
          className={bemMenuItem("lock-icon")}
        >
          🔒
        </span>
      )}
      <span className={bemMenuItem("title", ["text-truncate"])}>{title}</span>
      {locked && (
        <span
          role="img"
          aria-label="Locked"
          className={bemMenuItem("lock-icon")}
        >
          🔒
        </span>
      )}
      {!locked && (
        <span
          role="img"
          aria-label="Locked"
          className={bemMenuItem("close-icon")}
        >
          ❌
        </span>
      )}
    </li>
  );
}

export default DropdownMenu;
