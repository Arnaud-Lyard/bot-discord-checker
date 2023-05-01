import SlashCommand from "../structures/Command";
import { CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { saveBattletag } from "../controllers/battletag.controller";

export default class AddCommand extends SlashCommand {
  constructor() {
    super("add", "Add a battletag in list.", {
      requiredPermissions: ["Administrator"],
      addUserOption: {
        name: "user",
        description: "The user to add.",
      },
      addStringOption: {
        name: "battletag",
        description: "The battletag to add.",
      },
    });
  }

  exec(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [primaryEmbed("add", "Yay this works!")],
    });
  }
}
