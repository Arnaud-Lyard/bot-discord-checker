import {
  ChatInputCommandInteraction,
  Client,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10";

export type SlashCommandOptions = {
  requiredPermissions: PermissionResolvable[];
  addUserOption?: addUserOption;
  addStringOption?: addStringOption;
};

export type addUserOption = {
  name: string;
  description: string;
};

export type addStringOption = {
  name: string;
  description: string;
};

export default class SlashCommand {
  name: string;
  description: string;
  options: SlashCommandOptions | undefined;

  constructor(
    name: string,
    description: string,
    options?: SlashCommandOptions
  ) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  exec(interaction: ChatInputCommandInteraction) {
    throw new Error("Method not implemented.");
  }

  build(
    client: Client,
    command: SlashCommandBuilder
  ): SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody {
    return command;
  }
}
