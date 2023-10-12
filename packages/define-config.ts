export type McFlyConfig = {
  integrations?: Array<() => void>;
};
export default function defineConfig(config: McFlyConfig) {
  return () => config;
}
