import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { saveUser } from "../controllers/user.controller";

export default class SaveUserCommand extends SlashCommand {
  constructor() {
    super("saveuser", "Add a battletag for a user.", {
      requiredPermissions: ["Administrator"],
    });
  }

  async exec(interaction: CommandInteraction) {
    saveUser(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("The user to add.")
          .setRequired(true)
      )
      .addStringOption((battletag) =>
        battletag
          .setName("battletag")
          .setDescription("The battletag to add.")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .toJSON();
  }
}
