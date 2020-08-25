import React from 'react';
import { graphql, Link } from 'gatsby';
import { kebabCase, get } from 'lodash';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// 所有tag标签
class TagIndex extends React.Component {
  render() {
    const allTags = get(this.props, 'data.allMarkdownRemark.group');
    return (
      <Layout>
        <div>
          <SEO title="分类" />
          <h2>分类</h2>
          <ul>
            {allTags.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer hideTag={true} />
      </Layout>
    );
  }
}

export default TagIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`;
