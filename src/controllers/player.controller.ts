import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { Player } from "../models/player.model";
import { primaryEmbed } from "../utils/embeds";

export const rank = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");

  const { username, discriminator } = userInterraction?.user!;

  const userExist = await User.findOne({
    where: { username, discriminator },
  });

  if (!userExist) {
    return interaction.reply({
      embeds: [primaryEmbed("rank", `User ${username} is not registered`)],
    });
  }

  const player = await Player.findOne({
    where: { userId: userExist.id },
  });

  return interaction.reply({
    embeds: [
      primaryEmbed(
        "rank",
        `User ${username} is rank ${player?.dataValues.level}`
      ),
    ],
  });
};

export const leaderBoard = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const players = await Player.findAll({
    order: [["level", "DESC"]],
    limit: 10,
  });

  const playersToUpdateList = players
    .filter((player) => player.dataValues.level === null)
    .map((player, index) => {
      return `${player.battletag} 
      `;
    });

  const playersAlreadyUpdatedList = players
    .filter((player) => player.dataValues.level !== null)
    .map((player, index) => {
      return `**Rank :** ${index + 1} - **Battletag :** ${
        player.battletag
      } - **Level :** ${player.dataValues.level}`;
    });

  return interaction.reply({
    embeds: [
      primaryEmbed(
        "leaderboard",
        `${playersAlreadyUpdatedList.join(
          "\n"
        )}\n*New players waiting for update* :\n${playersToUpdateList.join(
          "\n"
        )}`
      ),
    ],
  });
};
