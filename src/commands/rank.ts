import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { rank } from "../controllers/ranking.controller";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("rank", "Get my rank in leaderboard.", {
      requiredPermissions: ["MentionEveryone"],
    });
  }

  exec(interaction: CommandInteraction) {
    rank(interaction);
    interaction.reply({
      embeds: [primaryEmbed("rank", "Yay this works!")],
    });
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("Get rank for a user")
          .setRequired(true)
      )
      .toJSON();
  }
}
