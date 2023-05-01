import safeConfig from "./env";
import { BlizzAPI } from "blizzapi";

export const bnetApi = new BlizzAPI({
  region: "eu",
  clientId: safeConfig.BNET_CLIENT_ID,
  clientSecret: safeConfig.BNET_CLIENT_SECRET,
});
