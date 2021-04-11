import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

class TagTemplate extends React.Component {
  render() {
    const tags = this.props.pageContext.tags;
    return (
      <Layout>
        <SEO title="Tags" />
        <h1>所有标签</h1>
        <ul>
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                to={`/tag/${kebabCase(tag)}/`}
                style={{ fontFamily: 'monospace, cursive' }}
              >
                {tag} ({count})
              </Link>
            </li>
          ))}
        </ul>
        <Footer hideTag={true} />
      </Layout>
    );
  }
}

export default TagTemplate;
