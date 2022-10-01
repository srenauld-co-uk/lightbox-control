import { AxiosInstance } from "axios";
import { LightboxLocale } from "types";

export interface HtmlCore extends AxiosInstance {
  language: LightboxLocale;
}
