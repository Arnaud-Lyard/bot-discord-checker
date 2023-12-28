import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { addDomain } from "../services/domain.service";
import SlashCommand from "../structures/Command";

export default class SaveUserCommand extends SlashCommand {
  constructor() {
    super("adddomain", "Add a domain for a user.");
  }

  exec(interaction: CommandInteraction) {
    addDomain(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user owning domain.")
          .setRequired(true)
      )
      .addStringOption((domain) =>
        domain
          .setName("domain")
          .setDescription("The domain to add.")
          .setRequired(true)
      )
      .toJSON();
  }
}
