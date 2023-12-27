import axios from "axios";
import { ChannelType, TextChannel } from "discord.js";
import { client } from "..";
import { Domain } from "../models/domain.model";
import safeConfig from "../utils/env";
import { discordLogger } from "../utils/logger";
import { DomainStatus } from "../types/types";

export async function domainCron() {
  setInterval(() => {
    discordLogger.info("Execute domain cron.");
    handleDomainsAlert();
  }, safeConfig.HANDLE_DOMAINS_ALERT_SPEED);
}

async function handleDomainsAlert() {
  try {
    const domains = await getAllDomains();
    if (!domains) {
      return;
    }

    const promises = domains.map(async (domain) => {
      try {
        const response = await axios.get(domain.url);
        return { domain, status: response.status };
      } catch (error: any) {
        return { domain, error: error.message };
      }
    });

    const results = await Promise.allSettled(promises);

    const channelId = safeConfig.DISCORD_NOTIFICATION_CHANNEL_ID;
    const channel = client.channels.cache.get(channelId) as TextChannel;

    results.forEach(async (result) => {
      if (result.status === "fulfilled") {
        const { domain, status } = result.value;
        if (status === 200 && domain.status !== "online") {
          await updateDomainStatus(domain.url, "online");
        }
        if (status !== 200) {
          channel.send(
            `Le site ${domain.url} a retourné le code de statut ${status}. @here`
          );
          await updateDomainStatus(domain.url, "error");
        }
      } else {
        const { domain, reason } = result.reason;
        channel.send(`Le site ${domain.url} est en erreur : ${reason} @here`);
        await updateDomainStatus(domain.url, "error");
      }
    });
  } catch (error) {
    discordLogger.error(error);
  }
}

async function getAllDomains(): Promise<Domain[] | undefined> {
  try {
    const domains = await Domain.findAll();
    return domains;
  } catch (error) {
    discordLogger.error(error);
  }
}

async function updateDomainStatus(domain: string, status: DomainStatus) {
  try {
    await Domain.update({ status }, { where: { url: domain } });
  } catch (error) {
    discordLogger.error(error);
  }
}
