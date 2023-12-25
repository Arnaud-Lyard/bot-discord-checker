import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { Player } from "../models/player.model";
import { primaryEmbed } from "../utils/embeds";
import { discordLogger } from "../utils/logger";
import { Hero } from "../models/hero.model";
import { raw } from "express";

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
  const heroes = await Hero.findAll({
    where: { playerId: player!.id },
    order: [["level", "DESC"]],
    limit: 5,
  });

  if (heroes.length === 0) {
    return interaction.reply({
      embeds: [primaryEmbed("rank", `No hero found for this username`)],
    });
  }

  const heroesAlreadyUpdatedList = heroes
    .filter((hero) => hero.dataValues.level !== null)
    .map((hero, index) => {
      return `${index + 1} - ${hero.dataValues.name} - ${
        hero.dataValues.level
      } - ${hero.dataValues.class}`;
    });

  return interaction.reply({
    embeds: [
      primaryEmbed(
        "rank",
        heroesAlreadyUpdatedList.length > 0
          ? `${heroesAlreadyUpdatedList.join("\n")}`
          : `*In progress*`
      ),
    ],
  });
};

export const leaderBoard = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const heroes = await Hero.findAll({
    order: [["level", "DESC"]],
    limit: 10,
  });

  const heroesAlreadyUpdatedList = heroes
    .filter((hero) => hero.dataValues.level !== null)
    .map((hero, index) => {
      return `Rank : **${index + 1}** - Name : **${
        hero.dataValues.name
      }** - Level : **${hero.dataValues.level}** - Class : **${
        hero.dataValues.class
      }**`;
    });

  return interaction.reply({
    embeds: [
      primaryEmbed("leaderboard", `${heroesAlreadyUpdatedList.join("\n")}`),
    ],
  });
};
