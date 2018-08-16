import React from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Layout from '~/layouts/';
import './index.css';

export default injectIntl(props => {
  const { intl, meta } = props;
  
  return (
    <Layout template="full">
      <Helmet>
        <title>{(meta && meta.info.title) || 'Antpress'}</title>
      </Helmet>
      <div className="banner">
        <div className="banner-logo">
          <img
            src="https://zos.alipayobjects.com/rmsportal/JFKAMfmPehWfhBPdCjrw.svg"
            alt="home"
          />
        </div>
        <div className="banner-info">
          <h1>
            <p className="strong">Born to build</p>
            better enterprise frameworks and apps with Node.js &amp; Koa
          </h1>
          <p>{intl.messages.index.slogan}</p>
          <div className="banner-button">
            <a className="btn btn-primary" href="/en/intro/quickstart.html">
              {intl.messages.index.getstart}
            </a>
            <a
              className="btn btn-secondary"
              href="https://github.com/eggjs/egg/"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
});
