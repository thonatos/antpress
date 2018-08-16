import React from 'react';
// import NavLink from 'umi/navlink';
import { Layout, Menu } from 'antd';
import { injectIntl } from 'react-intl';
import styles from './sider.module.less';

const antpress = JSON.parse(process.env.REACT_APP_ANTPRESS);
const data = antpress.data.data;

const { Sider } = Layout;
const { SubMenu } = Menu;

export default injectIntl(props => {
  const { intl } = props;
  const prefix = intl.locale.toLocaleLowerCase() === 'zh-cn' ? '/zh-cn' : '/en';
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      theme="light"
      className={styles.side}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultOpenKeys={['0', '1', '2', '3', '4', '5']}
        className={styles.menu}
      >
        {Object.entries(data.side).map((menu, i) => {
          const [menuName, items] = menu;
          return (
            <SubMenu
              key={i}
              title={<span>{intl.messages.guide_toc[menuName]}</span>}
            >
              {Object.entries(items).map((item, j) => {
                const [itemName, url] = item;
                const to = prefix + url;
                return (
                  <Menu.Item key={`${i}_${j}`}>
                    <a href={to}>
                      {intl.messages.guide_toc[itemName] || itemName}
                    </a>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
});
