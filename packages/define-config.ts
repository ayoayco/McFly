import { NitroApp } from "nitropack";
import setUpSsr from "./set-up-ssr";

export type McFlyConfig = {
  onBuild?: Array<(event: NitroApp) => void>;
};
export default function defineConfig(config: McFlyConfig) {
  const onBuild = config.onBuild ?? [];
  return () => ({ ...config, onBuild: [...onBuild, setUpSsr()] });
}
