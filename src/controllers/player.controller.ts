import { bnetApi } from "../utils/api";
import { IBattletag } from "../types/add";
import { Player } from "../models/player.model";
import { CacheType, CommandInteraction } from "discord.js";
import { User } from "../models/user.model";

export const savePlayer = async (
  battletagInput: CommandInteraction<CacheType>
): Promise<Player> => {
  try {
    const userInterraction = battletagInput.options.get("user");
    if (!userInterraction) throw new Error("No user interraction found");

    const { username, discriminator } = userInterraction.user!;

    const userAlreadyExist = await User.findOne({
      where: { username, discriminator },
    });

    if (userAlreadyExist)
      throw new Error(`User ${username}#${discriminator} already exist`);

    const battletagInterraction = battletagInput.options.get("battletag");
    if (!battletagInterraction)
      throw new Error("No battletag interraction found");

    const { name, value: battletagId } = battletagInterraction;

    const battletagAlreadyExist = await Player.findOne({
      where: { battletag: battletagId },
    });

    if (battletagAlreadyExist)
      throw new Error(`Battletag ${battletagId} already exist`);

    const user = await User.create({
      username,
      discriminator,
    });
    const player = await Player.create({
      battletag: battletagId,
      userId: user.id,
    });
    return player;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while saving battletag`);
  }
};

export const deletePlayer = async (
  battletagInput: CommandInteraction<CacheType>
): Promise<number> => {
  try {
    const userInterraction = battletagInput.options.get("user");
    if (!userInterraction) throw new Error("No user interraction found");

    const { username, discriminator } = userInterraction.user!;

    const userAlreadyExist = await User.findOne({
      where: { username, discriminator },
    });

    if (userAlreadyExist === null)
      throw new Error(`User ${username}#${discriminator} doesn't exist`);

    const battletagInterraction = battletagInput.options.get("battletag");
    if (!battletagInterraction)
      throw new Error("No battletag interraction found");

    const { name, value: battletagId } = battletagInterraction;

    const battletagAlreadyExist = await Player.findOne({
      where: { battletag: battletagId },
    });

    if (battletagAlreadyExist === null)
      throw new Error(`Battletag ${battletagId} doesn't exist`);

    const player = await Player.destroy({
      where: { battletag: battletagId },
    });

    return player;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while deleting battletag`);
  }
};
