import { PropsWithChildren, useMemo } from "react";
import {
  DropdownTabContext,
  DropdownTabContextValue,
} from "./DropdownTabContext";

export function DropdownTabContextProvider({
  children,
  ...props
}: PropsWithChildren<DropdownTabContextValue>) {
  return (
    <DropdownTabContext.Provider
      value={useMemo<DropdownTabContextValue>(() => {
        return props;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, Object.values(props))}
      children={children}
    />
  );
}
