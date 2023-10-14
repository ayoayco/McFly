import { NitroApp } from "nitropack";

export type McFlyConfig = {
  onBuild?: Array<(event: NitroApp) => void>;
};
export default function defineConfig(config: McFlyConfig) {
  return () => config;
}
