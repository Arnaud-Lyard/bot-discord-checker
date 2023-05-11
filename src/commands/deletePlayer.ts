import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { deletePlayer } from "../controllers/player.controller";

export default class DeletePlayerCommand extends SlashCommand {
  constructor() {
    super("deleteplayer", "Delete a battletag for a user", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    deletePlayer(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user who owns battletag.")
          .setRequired(true)
      )
      .toJSON();
  }
}
