import React from 'react';
import { Layout } from 'antd';
import Header from './header';
import styles from './full_layout.module.less';

const { Content } = Layout;

export default props => {
  return (
    <Layout className="layout">
      <Header />
      <Content className={styles.content}>
        <div className={styles.content_block}>{props.children}</div>
      </Content>
    </Layout>
  );
};
