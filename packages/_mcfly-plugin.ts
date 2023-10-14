import { NitroApp } from "nitropack";
import config from "../mcfly.config";

export default defineNitroPlugin((event: NitroApp) => {
  const { onBuild } = config();
  if (onBuild?.length > 0)
    onBuild.forEach((callBack) => {
      callBack(event);
    });
});
