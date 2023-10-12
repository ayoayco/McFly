import config from "../mcfly.config";

export default defineNitroPlugin(() => {
  const { integrations } = config();
  if (integrations?.length > 0)
    integrations.forEach((integration) => {
      integration();
    });
});
