import SlashCommand from "../structures/Command";
import { CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { deletePlayer } from "../controllers/player.controller";

export default class DeletePlayerCommand extends SlashCommand {
  constructor() {
    super("deleteplayer", "Delete a battletag for a user", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    deletePlayer(interaction);
    interaction.reply({
      embeds: [primaryEmbed("deleteplayer", "Yay this works!")],
    });
  }
}
