import { CacheType, CommandInteraction } from "discord.js";
import { User } from "../models/user.model";
import { discordLogger } from "../utils/logger";
export const deleteUser = async (
  userInput: CommandInteraction<CacheType>
): Promise<number> => {
  try {
    const userInterraction = userInput.options.get("user");
    if (!userInterraction) throw new Error("No user interraction found");

    const { username, discriminator } = userInterraction.user!;

    const userExist = await User.findOne({
      where: { username, discriminator },
    });

    if (userExist === null)
      throw new Error(`User ${username}#${discriminator} doesn't exist`);

    const user = await User.destroy({
      where: { username, discriminator },
      cascade: true,
    });
    return user;
  } catch (error) {
    discordLogger.debug(error);
    throw new Error(`Error while deleting user`);
  }
};
