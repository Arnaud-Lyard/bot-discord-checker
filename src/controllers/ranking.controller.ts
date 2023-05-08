import { CacheType, CommandInteraction } from "discord.js";
import { User } from "../models/user.model";
import { Player } from "../models/player.model";
import { discordLogger } from "../utils/logger";

export const rank = async (
  interaction: CommandInteraction<CacheType>
): Promise<number> => {
  try {
    const userInterraction = interaction.options.get("user");
    if (!userInterraction) throw new Error("No user interraction found");

    const { username, discriminator } = userInterraction.user!;

    const userExist = await User.findOne({
      where: { username, discriminator },
    });
    if (!userExist)
      throw new Error(`User ${username}#${discriminator} does not exist`);

    const usersWithPlayers = await User.findAll({
      include: {
        model: Player,
        required: true,
      },
    });

    console.log(usersWithPlayers[0].players); // Vérifiez si les joueurs sont récupérés pour chaque utilisateur

    return 1;
  } catch (error) {
    discordLogger.debug(error);
    throw new Error(`Error while getting rank for a user`);
  }
};
export const leaderBoard = async () => {};
