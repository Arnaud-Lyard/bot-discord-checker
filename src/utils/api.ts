import safeConfig from "./env";

let response: Response;
export async function getToken(): Promise<Response | undefined> {
  try {
    response = await fetch(`${safeConfig.BNET_TOKEN_URL}`, {
      body: new URLSearchParams({
        grant_type: `${safeConfig.BNET_GRANT_TYPE}`,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${safeConfig.BNET_CLIENT_ID}:${safeConfig.BNET_CLIENT_SECRET}`
          ).toString("base64"),
      },
    });
    if (!response) throw new Error("Error while getting response");
  } catch (error) {
    console.error("error", error);
  }
  return await response.json();
}
