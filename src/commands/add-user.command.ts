import SlashCommand from "../structures/Command";
import {
  Client,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { addUser } from "../services/user.service";

export default class SaveUserCommand extends SlashCommand {
  constructor() {
    super("adduser", "Add a new user.", {
      requiredPermissions: ["Administrator"],
    });
  }

  async exec(interaction: CommandInteraction) {
    addUser(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user to add.")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .toJSON();
  }
}
