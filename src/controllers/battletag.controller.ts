import { bnetApi } from "../utils/api";
import { IBattletag } from "../types/add";
import { Player } from "../models/player.model";

export const saveBattletag = async (
  battletagInput: IBattletag
): Promise<IBattletag> => {
  try {
    const battletagAlreadyExist = await Player.findOne({
      where: { battletag: battletagInput },
    });
    if (battletagAlreadyExist) {
      throw new Error(`Battletag ${battletagAlreadyExist} already exist`);
    }
    const battletag = await Player.create({ battletagInput });
    return battletag;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while saving battletag ${battletagInput}`);
  }
};
