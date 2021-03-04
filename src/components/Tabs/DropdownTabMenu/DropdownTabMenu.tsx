import React from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";
const bemMenu = bem("dropdown-menu");

export type DropdownMenuProps = {
  onChange: (key: TabKey) => void;
  sections: Section[];
  width?: number;
  activeKey: TabKey | null;
};

export function DropdownMenu({
  onChange,
  sections,
  width = 250,
  activeKey,
}: DropdownMenuProps) {
  return (
    <div
      className={bemMenu()}
      style={{ width: width }}
      onClick={(e) => e.stopPropagation()}
    >
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
    <div>
      <span className={bemMenu("section-title")}>{title}</span>
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
  active?: boolean;
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
      className={bemMenu("item", {
        active: active,
        locked: locked,
        disabled: disabled,
      })}
      onClick={disabled ? undefined : onClick}
    >
      {starred && (
        <span role="img" aria-label="Starred" className={bemMenu("star-icon")}>
          ⭐
        </span>
      )}
      {locked && (
        <span role="img" aria-label="Locked" className={bemMenu("lock-icon")}>
          🔒
        </span>
      )}
      <span className={bemMenu("option-title")}>{title}</span>
      {locked && (
        <span role="img" aria-label="Locked" className={bemMenu("lock-icon")}>
          🔒
        </span>
      )}
      {!locked && (
        <span role="img" aria-label="Locked" className={bemMenu("close-icon")}>
          ❌
        </span>
      )}
    </li>
  );
}

export default DropdownMenu;
