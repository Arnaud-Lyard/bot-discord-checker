import { Hero } from "../models/hero.model";
import { Player } from "../models/player.model";
import { bnetApi } from "./api";
import { discordLogger } from "./logger";

export const updateLeaderboardCron = async (): Promise<void> => {
  const playersList = await Player.findAll({});
  const playersListPromises: Promise<unknown>[] = [];

  for (let index = 0; index < playersList.length; index++) {
    const player = playersList[index];
    const battletag: string = player.battletag;
    const discriminator: number = player.discriminator;
    const heroesList = await Hero.findAll({ where: { playerId: player.id } });
    for (let index = 0; index < heroesList.length; index++) {
      playersListPromises.push(
        bnetApi.query(
          `/d3/profile/${battletag}-${discriminator}/hero/${heroesList[index].hero}`
        )
      );
    }
  }
  try {
    const isFulfilled = <T>(
      p: PromiseSettledResult<T>
    ): p is PromiseFulfilledResult<T> => p.status === "fulfilled";

    const results = await Promise.allSettled(playersListPromises);
    const fulfilledValues: Record<string, any> = results
      .filter(isFulfilled)
      .map((p) => p.value);

    for (let index = 0; index < fulfilledValues.length; index++) {
      const { level, id, name } = fulfilledValues[index];
      await Hero.update({ level: level, name: name }, { where: { hero: id } });
    }
  } catch (err) {
    discordLogger.debug(`Error while auto updating leaderboard`, err);
  }
};
