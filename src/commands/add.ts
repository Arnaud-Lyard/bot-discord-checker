import SlashCommand from "../structures/Command";
import { CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";

export default class AddCommand extends SlashCommand {
  constructor() {
    super(
      "add",
      "Add a battletag in list.",
      {
        requiredPermissions: ["Administrator"],
      },
      "admin"
    );
  }

  exec(interaction: CommandInteraction) {
    // const battletag = interaction.options.getString("battletag", true);
    interaction.reply({
      embeds: [primaryEmbed("title", "Yay this works!")],
    });
  }
}
