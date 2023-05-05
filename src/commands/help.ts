import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";

export default class HelpCommand extends SlashCommand {
  constructor() {
    super("help", "An help command.", {
      requiredPermissions: ["MentionEveryone"],
    });
  }

  exec(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [primaryEmbed("help", "Yay this works!")],
    });
  }

  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addBooleanOption((boolean) =>
        boolean
          .setName("boolean")
          .setDescription("test boolean option")
          .setRequired(true)
      )
      .addStringOption((string) =>
        string
          .setName("string")
          .setDescription("test string option")
          .setRequired(true)
      )
      .toJSON();
  }
}
