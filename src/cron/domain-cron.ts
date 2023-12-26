import { ChannelType, TextChannel } from "discord.js";
import { client } from "..";
import safeConfig from "../utils/env";

export async function domainCron() {
  setInterval(() => {
    handleDomainsAlert();
  }, safeConfig.HANDLE_DOMAINS_ALERT_SPEED);
}

async function handleDomainsAlert() {
  const channelId = safeConfig.DISCORD_NOTIFICATION_CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (channel && channel.type === ChannelType.GuildText) {
    await channel.send("Ceci est un message envoyé périodiquement par le bot.");
  }
}
