import { useContext } from "react";
import { DropdownTabContext } from "./DropdownTabContext";

function useDropdownTabContext() {
  return useContext(DropdownTabContext);
}

export default useDropdownTabContext;
