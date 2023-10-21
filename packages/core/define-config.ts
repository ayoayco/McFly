import { NitroApp } from "nitropack";

export type McFlyConfig = {
  onBuild?: Array<(event: NitroApp) => void>;
  components: "js" | "ts";
};
export default function defineConfig(config: McFlyConfig) {
  return () => config;
}
