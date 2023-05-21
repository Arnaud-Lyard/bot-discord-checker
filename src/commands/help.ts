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
      embeds: [
        primaryEmbed(
          "help",
          `*You must fallow all next steps to use the bot.* \n
          **Rules :** Read and accept the rules of the server. \n
          **Register :** Contact an admin. \n
          **Create a character :** Use the command /addhero. \n
          **See your rank :** Use the command /rank \n
          **See the leaderboard :** Use the command /leaderboard \n
      `
        ),
      ],
    });
  }

  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand.toJSON();
  }
}
