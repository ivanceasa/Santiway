import React, { useState } from "react";
import PropTypes from "prop-types";
import EnglishMessages from "../../../lang/en.json";
import SpanishMessages from "../../../lang/es.json";
import ItalianMessages from "../../../lang/it.json";
import GermanMessages from "../../../lang/ger.json";
import ChineseMessages from "../../../lang/chi.json";
import { IntlProvider } from "react-intl";

const langContext = React.createContext();

const LangProvider = ({ children }) => {
	let localeDefault;
	let messagesDefault;
	const lang = localStorage.getItem("lang");

	if (lang) {
		localeDefault = lang;

		if (lang === "es") {
			messagesDefault = SpanishMessages;
		} else if (lang === "en") {
			messagesDefault = EnglishMessages;
		} else if (lang === "it") {
			messagesDefault = ItalianMessages;
		} else if (lang === "ger") {
			messagesDefault = GermanMessages;
		} else if (lang === "chi") {
			messagesDefault = ChineseMessages;
		} else {
			localeDefault = "es";
			messagesDefault = SpanishMessages;
		}
	}

	const [messages, setMessages] = useState(messagesDefault);
	const [locale, setLocale] = useState(localeDefault);

	const setLanguage = language => {
		switch (language) {
			case "es":
				setMessages(SpanishMessages);
				setLocale("es");
				localStorage.setItem("lang", "es");
				break;
			case "en":
				setMessages(EnglishMessages);
				setLocale("en");
				localStorage.setItem("lang", "en");
				break;
			case "it":
				setMessages(ItalianMessages);
				setLocale("it");
				localStorage.setItem("lang", "it");
				break;
			case "ger":
				setMessages(GermanMessages);
				setLocale("ger");
				localStorage.setItem("lang", "ger");
				break;
			case "chi":
				setMessages(ChineseMessages);
				setLocale("chi");
				localStorage.setItem("lang", "chi");
				break;
			default:
				setMessages(SpanishMessages);
				setLocale("es");
				localStorage.setItem("lang", "es");
		}
	};

	return (
		<langContext.Provider value={{ setLanguage: setLanguage }}>
			<IntlProvider locale={locale} messages={messages}>
				{children}
			</IntlProvider>
		</langContext.Provider>
	);
};

LangProvider.propTypes = {
	children: PropTypes.object
};

export { LangProvider, langContext };
