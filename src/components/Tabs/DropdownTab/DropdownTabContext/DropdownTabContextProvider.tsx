import { PropsWithChildren } from "react";
import {
  DropdownTabContextValue,
  DropdownTabContext,
} from "./DropdownTabContext";

export function DropdownTabContextProvider({
  children,
  ...props
}: PropsWithChildren<DropdownTabContextValue>) {
  return <DropdownTabContext.Provider value={props} children={children} />;
}
