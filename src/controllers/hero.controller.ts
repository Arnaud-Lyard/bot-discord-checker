import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { User } from "../models/user.model";
import { Player } from "../models/player.model";
import { Hero } from "../models/hero.model";
import { discordLogger } from "../utils/logger";

export const addHero = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");
  const { username, discriminator } = userInterraction?.user!;
  const heroInterraction = interaction.options.get("hero");
  const { value: hero } = heroInterraction!;
  const classeInterraction = interaction.options.get("classe");
  const { value: classe } = classeInterraction!;

  const userExist = await User.findOne({
    where: { username, discriminator },
  });

  if (!userExist) {
    return interaction.reply({
      embeds: [primaryEmbed("rank", `User ${username} is not registered`)],
    });
  }

  const playerToUpdate = await Player.findOne({
    where: { userId: userExist.id },
  });

  if (!playerToUpdate) {
    return interaction.reply({
      embeds: [primaryEmbed("addhero", `Player not found`)],
    });
  }
  try {
    const heroToAdd = await Hero.create({
      hero: hero,
      playerId: playerToUpdate.id,
      class: classe,
    });
    return interaction.reply({
      embeds: [primaryEmbed("addhero", `Hero has been created`)],
    });
  } catch (error: any) {
    discordLogger.debug(error);
    return interaction.reply({
      embeds: [primaryEmbed("addhero", `Error when creating hero`)],
    });
  }
};
