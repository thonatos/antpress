import React from 'react';
import { Layout, Row, Col, Menu, Button } from 'antd';
import { injectIntl } from 'react-intl';
import styles from './header.module.less';

import { switchLang } from '~/utils';

const antpress = JSON.parse(process.env.REACT_APP_ANTPRESS);
const data = antpress.data.data;
const logo = antpress.conf.logo;
const { Header } = Layout;

export default injectIntl(props => {
  const { intl } = props;
  const prefix = intl.locale.toLocaleLowerCase() === 'zh-cn' ? '/zh-cn' : '/en';
  return (
    <Header className={styles.header}>
      <Row type="flex">
        <Col lg={2} md={20} xs={12}>
          <div className={styles.logo}>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
        </Col>
        <Col lg={20} md={0} xs={0}>
          <Menu theme="light" mode="horizontal" className={styles.menu}>
            {Object.entries(data.menu).map((item, index) => {
              const [title, url] = item;
              return (
                <Menu.Item key={index}>
                  {url.startsWith('http') || url === '/api/' ? (
                    <a href={url}>{intl.messages.menu[title]}</a>
                  ) : (
                    <a href={`${prefix}${url}`}>{intl.messages.menu[title]}</a>
                  )}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
        <Col
          lg={2}
          md={4}
          xs={12}
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => {
              switchLang();
            }}
          >
            {intl.messages.header.translations}
          </Button>
        </Col>
      </Row>
    </Header>
  );
});
