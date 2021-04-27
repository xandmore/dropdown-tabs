import React from "react";
import bem from "../../../helpers/bem";
import { DropdownTab, Section, TabKey } from "../types";
import { ReactComponent as CloseIcon } from "../../../assets/close_24dp.svg";
import { ReactComponent as LockIcon } from "../../../assets/lock_24dp.svg";
import { ReactComponent as StarIcon } from "../../../assets/star_outline_24dp.svg";

const bemMenu = bem("dropdown-menu");
const bemMenuItem = bem("dropdown-menu-item");
const bemIcon = bem("icon");

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
    <>
      <div className={bemMenu("section-title")}>
        <span className={"text-truncate"}>{title}</span>
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
    </>
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
        <StarIcon
          className={bemIcon({ small: true }, [bemMenuItem("star-icon")])}
        />
      )}

      {locked && (
        <LockIcon
          className={bemIcon({ small: true }, [bemMenuItem("lock-icon")])}
        />
      )}

      <span className={bemMenuItem("title", ["text-truncate"])}>{title}</span>

      {!locked && (
        <CloseIcon
          className={bemIcon({ small: true }, [bemMenuItem("close-icon")])}
        />
      )}
    </li>
  );
}

export default DropdownMenu;
