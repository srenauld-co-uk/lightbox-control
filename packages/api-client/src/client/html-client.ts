import { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { LightboxLocale, LightboxCredentials } from "../types";
import { logIn } from "./actions/log-in";
import { HtmlCore } from "./interfaces/html-core";

type FnExecutor<T> = (core: HtmlCore) => Promise<T>;

export class HtmlClient {
  private core?: Promise<HtmlCore>;

  private locale: LightboxLocale = LightboxLocale.English;

  private credentials?: LightboxCredentials;

  private tainted: boolean = true;

  constructor(private instance: AxiosInstance) {}

  setCredentials(credentials: LightboxCredentials): HtmlClient {
    this.tainted = true;
    this.credentials = credentials;
    return this;
  }

  setLocale(locale: LightboxLocale): HtmlClient {
    this.tainted = true;
    this.locale = locale;
    return this;
  }

  private async prepareCore(): Promise<HtmlCore> {
    if (!this.credentials) throw new Error("FAIL");
    const jar = new CookieJar();
    this.instance.defaults.jar = jar;
    jar.setCookieSync(
      "cookie_ok=1; path=/; domain=www.lightbox.pl",
      "https://www.lightbox.pl",
    );
    const requestClient = wrapper(this.instance);
    const c = requestClient as HtmlCore;
    c.language = this.locale;
    await logIn(c, this.credentials, this.locale);
    return c;
  }

  async logIn() {
    await this.prepareCore();
  }

  private async getCore(): Promise<HtmlCore> {
    if (!this.core || this.tainted) {
      this.core = this.prepareCore();
      this.tainted = false;
    }
    return this.core;
  }

  protected async execute<T>(r: FnExecutor<T>): Promise<T> {
    const core = await this.getCore();
    return r(core);
  }
}
