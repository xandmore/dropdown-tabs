import React from "react";
import bem from "../../../helpers/bem";
const bemMenu = bem("dropdown-menu");

function DropdownMenu({ onChange, sections, width = 250, opened, activeKey }) {
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
              key={i}
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

function DropdownMenuSection({ title, tabs, onChange, activeKey }) {
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

function DropdownMenuItem({
  active,
  disabled,
  title,
  locked,
  starred,
  onClick
}) {
  return (
    <li
      className={bemMenu("item", {
        active: active,
        locked: locked,
        disabled: disabled
      })}
      onClick={disabled ? null : onClick}
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
