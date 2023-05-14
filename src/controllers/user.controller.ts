import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { User } from "../models/user.model";
import { discordLogger } from "../utils/logger";
import { primaryEmbed } from "../utils/embeds";
import { Player } from "../models/player.model";

export const saveUser = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  const userInterraction = interaction.options.get("user");
  const { username, discriminator } = userInterraction?.user!;
  const battletagInterraction = interaction.options.get("battletag");
  const { value: battletagWithDiscriminator } = battletagInterraction!;

  const battletagWithDiscriminatorLength =
    battletagWithDiscriminator?.toString().length;
  const battletagWithDiscriminatorWithoutSharpLength =
    battletagWithDiscriminator?.toString().replace(/[^#]/g, "").length;

  if (
    (battletagWithDiscriminatorWithoutSharpLength !== undefined &&
      battletagWithDiscriminatorLength !== undefined &&
      battletagWithDiscriminatorWithoutSharpLength > 1 &&
      battletagWithDiscriminatorWithoutSharpLength <
        battletagWithDiscriminatorLength - 1) ||
    battletagWithDiscriminatorWithoutSharpLength ===
      battletagWithDiscriminatorLength
  ) {
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveuser",
          `Battletag ${battletagWithDiscriminator} is not valid`
        ),
      ],
    });
  }

  const battletagWithDiscriminatorFormatted = battletagWithDiscriminator
    ?.toString()
    .split("#");

  const playerBattletag = battletagWithDiscriminatorFormatted?.[0];
  const playerDiscriminator = battletagWithDiscriminatorFormatted?.[1];
  if (
    battletagWithDiscriminatorFormatted?.length === 1 ||
    battletagWithDiscriminatorFormatted === undefined ||
    playerDiscriminator?.length === 0
  ) {
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveuser",
          `Battletag ${battletagWithDiscriminator} is not valid`
        ),
      ],
    });
  }

  const userAlreadyExist = await User.findOne({
    where: { username, discriminator },
  });

  if (userAlreadyExist) {
    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveuser",
          `User ${username}#${discriminator} already exist`
        ),
      ],
    });
  } else {
    const battletagAlreadyExist = await Player.findOne({
      where: { battletag: playerBattletag },
    });
    if (battletagAlreadyExist) {
      return interaction.reply({
        embeds: [
          primaryEmbed(
            "saveuser",
            `Battletag ${playerBattletag} already exist`
          ),
        ],
      });
    }
    const discriminatorBattletagAlreadyExist = await Player.findOne({
      where: {
        battletag: playerBattletag,
        discriminator: playerDiscriminator,
      },
    });
    if (discriminatorBattletagAlreadyExist) {
      return interaction.reply({
        embeds: [
          primaryEmbed(
            "saveuser",
            `Battletag ${playerBattletag}#${playerDiscriminator} already exist`
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
      battletag: playerBattletag,
      discriminator: playerDiscriminator,
      userId: user.id,
    });

    return interaction.reply({
      embeds: [
        primaryEmbed(
          "saveuser",
          `User ${user.username}#${user.discriminator} and his battletag ${player.battletag}#${player.dataValues.discriminator} have been created`
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
          `User ${username}#${discriminator} and his battletag have been deleted`
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
