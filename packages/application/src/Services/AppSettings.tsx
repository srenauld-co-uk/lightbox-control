import React, { createContext, useState } from "react"

type Mode = "light" | "dark";
type Locale = "en" | "pl";

type Ct = {
    mode: Mode;
    locale: Locale;
}

const defaultValue:Ct = {
    mode: 'light',
    locale: 'en'
}

const Context = createContext({
    settings: defaultValue,
    setSettings: (value:Ct) => {}
});
const { Provider, Consumer } = Context;

type ProviderProps = {  
    children?:
        | React.ReactChild
        | React.ReactChild[];
}
const SettingsProvider = (props:ProviderProps) => {
    const [settings, setSettings] = useState(defaultValue);
    return <Provider value={{
        settings,
        setSettings
    }}>{props.children}</Provider>
}
export { Consumer, SettingsProvider as Provider, Context };