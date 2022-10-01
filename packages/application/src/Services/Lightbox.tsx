import { withHttpScraping } from "@srenauld-co-uk/lightbox-client";
import { LightboxLocale } from "@srenauld-co-uk/lightbox-client/dist/types";
import { createContext } from "react";

type ValueProps = {
    locale: LightboxLocale
}
const defaultValue = ({ locale }:ValueProps) => withHttpScraping({
    language: locale,
    credentials: {
        email: "",
        password: ""
    }
})

const Context = createContext(defaultValue({ locale: LightboxLocale.English}));

const Provider = Context.Provider;
const Consumer = Context.Consumer;

export { Consumer, Context, Provider, defaultValue};