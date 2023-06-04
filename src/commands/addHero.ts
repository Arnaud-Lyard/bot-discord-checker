import SlashCommand from "../structures/Command";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { addHero } from "../controllers/hero.controller";

export default class SaveUserCommand extends SlashCommand {
  constructor() {
    super("addhero", "Add a hero for a user.");
  }

  exec(interaction: CommandInteraction) {
    addHero(interaction);
  }
  build(client: Client<boolean>, defaultCommand: SlashCommandBuilder) {
    return defaultCommand
      .addUserOption((user) =>
        user
          .setName("user")
          .setDescription("Add a hero for a user.")
          .setRequired(true)
      )
      .addStringOption((hero) =>
        hero
          .setName("hero")
          .setDescription("The hero to add.")
          .setRequired(true)
      )
      .addStringOption((classe) =>
        classe
          .setName("classe")
          .setDescription("the choosen classe")
          .setRequired(true)
          .addChoices(
            { name: "Barbarian", value: "BRB" },
            { name: "Sorcerer", value: "SRC" },
            { name: "Druid", value: "DRU" },
            { name: "Rogue", value: "ROG" },
            { name: "Necromancer", value: "NEC" }
          )
      )
      .toJSON();
  }
}
