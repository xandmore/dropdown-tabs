import { useCallback } from "react";

function useMergeHandlers<T extends Function>(...handlers: (T | undefined)[]) {
  return useCallback(function () {
    for (const handler of handlers) {
      handler?.(...arguments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, handlers);
}

export default useMergeHandlers;
