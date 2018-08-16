import React from 'react';
import { Layout } from 'antd';
import styles from './footer.module.less';

const { Footer } = Layout;

export default () => {
  return <Footer className={styles.footer}>Egg.js ©2018</Footer>;
};
