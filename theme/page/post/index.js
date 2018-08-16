import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Helmet } from 'react-helmet';
import uslug from 'uslug';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

import Layout from '~/layouts/';

const style = {
  fontSize: '14px',
};

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  return React.createElement(
    'h' + props.level,
    { id: uslug(text) },
    props.children,
  );
}

const renderers = { heading: HeadingRenderer };

export default class App extends Component {
  render() {
    const { meta, content, toc } = this.props;
    return (
      <Layout meta={meta}>
        <Helmet>          
          <title>{meta && meta.info.title}</title>
        </Helmet>
        <Row gutter={16}>
          <Col md={18} xs={24}>
            <div className="markdown-body" style={style}>
              <ReactMarkdown
                source={decodeURIComponent(content)}
                renderers={renderers}
              />
            </div>
          </Col>
          <Col md={6} xs={0}>
            <div className="markdown-body" style={style}>
              <ReactMarkdown source={decodeURIComponent(toc)} />
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
