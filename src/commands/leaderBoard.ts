import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { leaderBoard } from "../controllers/player.controller";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("leaderboard", "See full leaderboard.");
  }

  exec(interaction: CommandInteraction) {
    leaderBoard(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .toJSON();
  }
}
