import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { updateLeaderboard } from "../controllers/player.controller";

export default class UpdateLeaderboardCommand extends SlashCommand {
  constructor() {
    super("updateleaderboard", "Update the leaderboard manually.", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    updateLeaderboard(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .toJSON();
  }
}
