import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { rank } from "../controllers/player.controller";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("rank", "Get my rank in leaderboard.");
  }

  exec(interaction: CommandInteraction) {
    rank(interaction);
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
