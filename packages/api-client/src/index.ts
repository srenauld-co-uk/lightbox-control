import { LightboxSettings } from "./types";
import axios from "axios";
import * as Types from "./types";
import { LightboxClient } from "./client/lightbox-client";

const withHttpScraping = (generalSettings: LightboxSettings) => {
  const http = axios.create({
    baseURL:
      generalSettings.language === Types.LightboxLocale.Polish
        ? "https://www.lightbox.pl/"
        : "https://www.lightbox.pl/en/",
  });
  const client = new LightboxClient(http);

  client.setLocale(generalSettings.language);
  client.setCredentials(generalSettings.credentials);

  return client;
};

export { withHttpScraping, LightboxClient, Types };
