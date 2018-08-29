import React from 'react';
import FullLayout from './components/full_layout';
import BasicLayout from './components/basic_layout';

import './index.css';

export default props => {
  const { template, meta } = props;
  if (template === 'full') {
    return <FullLayout meta={meta}>{props.children}</FullLayout>;
  }

  return <BasicLayout meta={meta}>{props.children}</BasicLayout>;
};
