import {
  DependencyList,
  MutableRefObject,
  Ref,
  useImperativeHandle,
} from "react";

function useImperativeHandleProxy<T, T1, R extends object & Partial<T>>(
  ref: Ref<T> | undefined,
  wrappedRef: MutableRefObject<T1>,
  init: () => R,
  deps?: DependencyList
): void {
  useImperativeHandle(
    ref,
    () => {
      return (new Proxy<R>(init(), {
        get(target, prop) {
          if (target?.hasOwnProperty(prop)) {
            return (target as any)[prop];
          }

          const wrapped = wrappedRef.current as any;
          if (typeof wrapped?.[prop] === "function") {
            return function () {
              return (wrappedRef.current as any)[prop](...arguments);
            };
          }

          return wrapped?.[prop];
        },
      }) as unknown) as T;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
}

export default useImperativeHandleProxy;
