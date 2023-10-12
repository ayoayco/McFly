import { NitroApp } from "nitropack";
import setUpSsr from "./set-up-ssr";

export type McFlyConfig = {
  onBuild?: Array<(event: NitroApp) => void>;
};
export default function defineConfig(config: McFlyConfig) {
  return () => ({ ...config, onBuild: [...config.onBuild, setUpSsr()] });
}
