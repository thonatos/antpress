import is from 'is';
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import appLocaleDataZH from 'react-intl/locale-data/zh';
import appLocaleDataEN from 'react-intl/locale-data/en';
import App from './index';

const antpress = JSON.parse(process.env.REACT_APP_ANTPRESS);

const locales = {
  en: {
    locale: 'en-US',
    data: appLocaleDataEN,
    messages: antpress.data['messages.en'],
  },
  zh: {
    locale: 'zh-CN',
    data: appLocaleDataZH,
    messages: antpress.data['messages.zh'],
  },
};

const state = window.__INIT_STATE__;
const store = is.empty(state) ? { lang: 'en', props: {} } : state;

const appLocale = locales[store.lang];
addLocaleData(...appLocale.data);

ReactDOM.hydrate(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <App {...store.props} />
  </IntlProvider>,
  document.getElementById('root'),
);
