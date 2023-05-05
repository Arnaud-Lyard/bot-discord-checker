import { CacheType, CommandInteraction } from "discord.js";
import { User } from "../models/user.model";

export const deleteUser = async (
  userInput: CommandInteraction<CacheType>
): Promise<number> => {
  try {
    const userInterraction = userInput.options.get("user");
    if (!userInterraction) throw new Error("No user interraction found");

    const { username, discriminator } = userInterraction.user!;

    const userAlreadyExist = await User.findOne({
      where: { username, discriminator },
    });

    if (userAlreadyExist === null)
      throw new Error(`User ${username}#${discriminator} doesn't exist`);

    const user = await User.destroy({
      where: { username, discriminator },
      cascade: true,
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while deleting user`);
  }
};
