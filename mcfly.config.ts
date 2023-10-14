import defineConfig from "./packages/define-config";
import registerComponents from "./packages/register-components";

export default defineConfig({
  onBuild: [registerComponents()],
});
