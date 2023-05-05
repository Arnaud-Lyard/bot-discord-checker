import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { deleteUser } from "../controllers/user.controller";

export default class DeleteUserCommand extends SlashCommand {
  constructor() {
    super("deleteuser", "Delete a user and his information", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    deleteUser(interaction);
    interaction.reply({
      embeds: [primaryEmbed("deleteuser", "Yay this works!")],
    });
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user to delete.")
          .setRequired(true)
      )
      .toJSON();
  }
}
