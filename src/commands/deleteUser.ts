import SlashCommand from "../structures/Command";
import { CommandInteraction } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { deleteUser } from "../controllers/user.controller";

export default class DeleteUserCommand extends SlashCommand {
  constructor() {
    super("deleteuser", "Delete a user and his battletag", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    deleteUser(interaction);
    interaction.reply({
      embeds: [primaryEmbed("deleteuser", "Yay this works!")],
    });
  }
}
