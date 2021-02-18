import { State } from "./reducer";
import { Section } from "../types";
import update from "immutability-helper";

type KeysOfStringValues<
  T extends object,
  K extends keyof T
> = T[K] extends string ? K : never;

function keysBy<T extends object, Key extends keyof T>(
  array: T[],
  key: KeysOfStringValues<T, Key>
): { [key: string]: T } {
  return array.reduce((obj, value) => {
    const keyForValue = (value[key] as unknown) as string;
    obj[keyForValue] = value;
    return obj;
  }, {} as { [key: string]: T });
}

export function addSections(state: State, sections: Section[]): State {
  if (!sections.length) {
    return state;
  }

  return update(state, {
    sections: {
      $apply: (current: Section[]) => {
        const map = keysBy(sections, "key");

        // replace overlapping
        const newSections = current.reduce((sections: Section[], s) => {
          if (map[s.key]) {
            sections.push(map[s.key]);
            delete map[s.key];
          } else {
            sections.push(s);
          }

          return sections;
        }, []);

        // add new
        for (let key in map) {
          newSections.push(map[key]);
        }

        return newSections;
      },
    },
  });
}
