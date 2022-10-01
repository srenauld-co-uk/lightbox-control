import { AxiosInstance } from "axios";
import { z } from "zod";

export enum LightboxLocale {
  English = "en",
  Polish = "pl",
}

const lightboxCredentials = z.object({
  email: z.string(),
  password: z.string(),
});

const lightboxSettings = z.object({
  language: z.nativeEnum(LightboxLocale),
  credentials: lightboxCredentials,
});

export type LightboxCredentials = z.infer<typeof lightboxCredentials>;

export type LightboxSettings = z.infer<typeof lightboxSettings>;

export type LightboxRequestClientConstructor<
  R,
  T extends LightboxRequestClient<R>
> = new (requestclient: AxiosInstance) => T;

interface LightboxRequestClient<C> {
  authenticate(config: C): Promise<boolean>;

  setSettings(settings: LightboxSettings): boolean;
}
