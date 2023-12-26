import { CacheType, CommandInteraction, InteractionResponse } from "discord.js";
import { Domain } from "../models/domain.model";
import { User } from "../models/user.model";
import { primaryEmbed } from "../utils/embeds";
import { discordLogger } from "../utils/logger";

export const addDomain = async (
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> => {
  try {
    const userInterraction = interaction.options.get("user");
    if (!userInterraction?.user) {
      return interaction.reply({
        embeds: [primaryEmbed("adddomain", `You should provide a user`)],
      });
    }
    const { username } = userInterraction.user;
    const domainInterraction = interaction.options.get("domain");
    if (!domainInterraction) {
      return interaction.reply({
        embeds: [primaryEmbed("adddomain", `You should provide a domain`)],
      });
    }
    const { value: domain } = domainInterraction;

    const userExist = await User.findOne({
      where: { username },
    });

    if (!userExist) {
      return interaction.reply({
        embeds: [
          primaryEmbed("adddomain", `User ${username} is not registered`),
        ],
      });
    }

    const domainExist = await Domain.findOne({
      where: { url: domain },
    });

    if (domainExist) {
      return interaction.reply({
        embeds: [primaryEmbed("adddomain", `Domain ${domain} already exist`)],
      });
    }

    await Domain.create({
      userId: userExist.id,
      url: domain,
      status: "progress",
    });

    return interaction.reply({
      embeds: [
        primaryEmbed(
          "adddomain",
          `Domain ${domain} for user ${username} have been created`
        ),
      ],
    });
  } catch (error: any) {
    discordLogger.debug(error);
    return interaction.reply({
      embeds: [primaryEmbed("adddomain", `Error when adding domain`)],
    });
  }
};

export async function listDomain(
  interaction: CommandInteraction<CacheType>
): Promise<InteractionResponse<boolean>> {
  try {
    const userInterraction = interaction.options.get("user");
    if (!userInterraction?.user) {
      return interaction.reply({
        embeds: [primaryEmbed("listdomain", `You should provide a user`)],
      });
    }
    const { username } = userInterraction.user;
    const userExist = await User.findOne({
      where: { username },
    });

    if (!userExist) {
      return interaction.reply({
        embeds: [
          primaryEmbed("listdomain", `User ${username} is not registered`),
        ],
      });
    }
    const domainList = await Domain.findAll({
      where: { userId: userExist.id },
    });
    if (!domainList) {
      return interaction.reply({
        embeds: [primaryEmbed("listdomain", `No domain for user ${username}`)],
      });
    }

    const domainListFormatted: string[] = domainList.map(
      (domain) => `${domain.url} : ${domain.status}`
    );

    return interaction.reply({
      embeds: [primaryEmbed("listdomain", `${domainListFormatted.join("\n")}`)],
    });
  } catch (error: any) {
    discordLogger.debug(error);
    return interaction.reply({
      embeds: [primaryEmbed("listdomain", `Error when listing domain`)],
    });
  }
}
