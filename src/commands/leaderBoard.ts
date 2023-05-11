import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { leaderBoard } from "../controllers/ranking.controller";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("leaderboard", "See full leaderboard.", {
      requiredPermissions: ["MentionEveryone"],
    });
  }

  exec(interaction: CommandInteraction) {
    leaderBoard();
    interaction.reply({
      embeds: [primaryEmbed("leaderboard", "Yay this works!")],
    });
  }
}
