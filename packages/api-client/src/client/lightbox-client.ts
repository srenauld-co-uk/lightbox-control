import listDiets from "./actions/list-diets";
import { HtmlClient } from "./html-client";

export class LightboxClient extends HtmlClient {
  async diets() {
    return this.execute(listDiets);
  }
}
