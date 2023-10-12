import components from "./packages/custom-elements";
import defineConfig from "./packages/define-config";

export default defineConfig({
  integrations: [components()],
});
