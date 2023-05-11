import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { primaryEmbed } from "../utils/embeds";
import { savePlayer } from "../controllers/player.controller";

export default class SavePlayerCommand extends SlashCommand {
  constructor() {
    super("saveplayer", "Add a battletag for a user.", {
      requiredPermissions: ["Administrator"],
    });
  }

  exec(interaction: CommandInteraction) {
    savePlayer(interaction);
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
      .toJSON();
  }
}
