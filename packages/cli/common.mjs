/**
 * @type {import('citty').ArgsDef}
 */
export const commonArgs = {
  dir: {
    type: "string",
    description: "project root directory",
  },
  _dir: {
    type: "positional",
    default: ".",
    description: "project root directory (prefer using `--dir`)",
  },
};
