import React from 'react';
import { Layout } from 'antd';

import Header from './header';
// import Footer from './footer';
import Sider from './sider';
// import Breadcrumbs from './breadcrumbs';
import styles from './basic_layout.module.less';

const { Content } = Layout;

export default props => {
  return (
    <Layout>
      <Header />
      <Content>
        {
          // <Layout className={styles.breadcrumb}>
          // <Breadcrumbs />
          // </Layout>
        }
        <Layout className={styles.content}>
          <Sider />
          <Content className={styles.post}>{props.children}</Content>
        </Layout>
      </Content>
      {
        // <Footer />
      }
    </Layout>
  );
};
