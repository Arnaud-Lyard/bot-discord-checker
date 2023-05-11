import { bnetApi } from "../utils/api";
import { IBattletag } from "../types/add";
import { Player } from "../models/player.model";
import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { discordLogger } from "../utils/logger";
import { primaryEmbed } from "../utils/embeds";

export const savePlayer = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");
  const { username, discriminator } = userInterraction?.user!;
  const battletagInterraction = interaction.options.get("battletag");
  const { name, value: battletagId } = battletagInterraction!;

  const userAlreadyExist = await User.findOne({
    where: { username, discriminator },
  });

  if (userAlreadyExist) {
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveplayer",
          `User ${username}#${discriminator} already exist`
        ),
      ],
    });
  } else {
    const battletagAlreadyExist = await Player.findOne({
      where: { battletag: battletagId },
    });
    if (battletagAlreadyExist) {
      return interaction.reply({
        embeds: [
          primaryEmbed(
            "saveplayer",
            `Battletag ${battletagAlreadyExist} already exist`
          ),
        ],
      });
    }
  }
  try {
    const user = await User.create({
      username,
      discriminator,
    });
    const player = await Player.create({
      battletag: battletagId,
      userId: user.id,
    });
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveplayer",
          `User ${user.username}#${user.discriminator} and his battletag ${player.battletag} have been created`
        ),
      ],
    });
  } catch (error: any) {
    discordLogger.debug(error);
    return interaction.reply(
      "Something went wrong while creating user and his battletag."
    );
  }
};

export const deletePlayer = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");
  const { username, discriminator } = userInterraction?.user!;

  const userExist = await User.findOne({
    where: { username, discriminator },
  });

  if (userExist) {
    const deleteBattletagsForExistingUser = await Player.destroy({
      where: { userId: userExist?.id },
    });

    if (!deleteBattletagsForExistingUser)
      return interaction.reply({
        embeds: [
          primaryEmbed("deleteplayer", `No battletag found for this user`),
        ],
      });
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "deleteplayer",
          `All battletags have been deleted for user ${username}#${discriminator}`
        ),
      ],
    });
  }
  return interaction.reply({
    embeds: [
      primaryEmbed(
        "deleteplayer",
        `User ${username}#${discriminator} doesn't exist`
      ),
    ],
  });
};
