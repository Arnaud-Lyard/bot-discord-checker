import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { primaryEmbed } from "../utils/embeds";
import { discordLogger } from "../utils/logger";

export const addUser = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  try {
    const userInterraction = interaction.options.get("user");
    if (!userInterraction?.user) {
      return interaction.reply({
        embeds: [primaryEmbed("adduser", `You should provide a user`)],
      });
    }
    const { username } = userInterraction.user;
    const frequencyInterraction = interaction.options.get("frequency");
    const { value: frequency } = frequencyInterraction!;

    const userAlreadyExist = await User.findOne({
      where: { username },
    });

    if (userAlreadyExist) {
      return interaction.reply({
        embeds: [primaryEmbed("adduser", `User ${username} already exist`)],
      });
    }

    const user = await User.create({
      username,
      frequency,
    });

    return interaction.reply({
      embeds: [
        primaryEmbed(
          "adduser",
          `User ${user.username} with frequency ${frequency} set have been created`
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

export const deleteUser = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  try {
    const userInterraction = interaction.options.get("user");

    if (!userInterraction?.user) {
      return interaction.reply({
        embeds: [primaryEmbed("deleteuser", `You should provide a user`)],
      });
    }
    const { username } = userInterraction.user;

    const userExist = await User.findOne({
      where: { username },
    });

    if (userExist) {
      await User.destroy({
        where: { username },
        cascade: true,
      });
      return interaction.reply({
        embeds: [
          primaryEmbed(
            "deleteuser",
            `User ${username} and all his informations have been deleted`
          ),
        ],
      });
    } else {
      return interaction.reply({
        embeds: [
          primaryEmbed("deleteplayer", `User ${username} in not registered`),
        ],
      });
    }
  } catch (error: any) {
    discordLogger.debug(error);
    return interaction.reply(
      "Something went wrong while deleting user and his battletag."
    );
  }
};
