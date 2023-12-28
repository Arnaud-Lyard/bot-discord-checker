import {
  Client,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { listDomain } from "../services/domain.service";
import SlashCommand from "../structures/Command";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("listdomain", "See full domain list.");
  }

  exec(interaction: CommandInteraction) {
    listDomain(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user owner of domain list")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .toJSON();
  }
}
