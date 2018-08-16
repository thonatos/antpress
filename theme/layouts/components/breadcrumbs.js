import React from 'react';
import NavLink from 'umi/navlink';
import { injectIntl } from 'react-intl';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { Breadcrumb } from 'antd';
import styles from './breadcrumbs.module.less';

const Component = ({ intl, breadcrumbs }) => {
  return (
    <Breadcrumb className={styles.breadcrumb}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item key={breadcrumb.key}>
          <NavLink to={breadcrumb.props.match.url}>
            {intl.messages.breadcrumb[breadcrumb.props.children] ||
              intl.messages.guide_toc[breadcrumb.props.children] ||
              breadcrumb}
          </NavLink>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default withBreadcrumbs()(injectIntl(Component));
