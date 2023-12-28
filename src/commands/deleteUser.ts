import {
  Client,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { deleteUser } from "../services/user.service";
import SlashCommand from "../structures/Command";

export default class DeleteUserCommand extends SlashCommand {
  constructor() {
    super("deleteuser", "Delete a user and his battletag", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    deleteUser(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user to delete.")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .toJSON();
  }
}
