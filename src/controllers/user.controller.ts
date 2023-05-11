import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { discordLogger } from "../utils/logger";
import { primaryEmbed } from "../utils/embeds";
export const deleteUser = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");
  const { username, discriminator } = userInterraction?.user!;

  const userExist = await User.findOne({
    where: { username, discriminator },
  });

  if (userExist) {
    await User.destroy({
      where: { username, discriminator },
      cascade: true,
    });
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "deleteuser",
          `User ${username}#${discriminator} and all his battletags have been deleted`
        ),
      ],
    });
  }
  return interaction.reply({
    embeds: [
      primaryEmbed(
        "deleteplayer",
        `User ${username}#${discriminator} in not registered`
      ),
    ],
  });
};
