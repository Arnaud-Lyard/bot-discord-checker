import SlashCommand from "../structures/Command";
import { CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";

export default class HelpCommand extends SlashCommand {
  constructor() {
    super("example", "An example command.", {
      requiredPermissions: ["MentionEveryone"],
    });
  }

  exec(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [primaryEmbed("title", "Yay this works!")],
    });
  }
}
