import React from 'react';
import { Link, graphql } from 'gatsby';
import { get } from 'lodash';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { formatPostDate } from '../utils/helpers';

class TagTemplate extends React.Component {
  render() {
    const tags = get(this.props, 'data.allMarkdownRemark.edges');
    const tag = get(this.props, 'pageContext.tag');
    return (
      <Layout>
        <SEO title="Tags" />
        <h1>{tag}</h1>
        {tags.map(({ node }) => {
          const title = get(node, 'frontmatter.title');
          const date = get(node, 'frontmatter.date');
          const slug = get(node, 'fields.slug');
          return (
            <article key={slug} className="home-post">
              <Link className="post-title" to={slug}>
                {title}
              </Link>
              <span className="sub-title">{formatPostDate(date)}</span>
            </article>
          );
        })}
        <Footer />
      </Layout>
    );
  }
}

export default TagTemplate;

export const query = graphql`
  query tagQuery($tag: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { frontmatter: { tag: { eq: $tag } } }
    ) {
      edges {
        node {
          frontmatter {
            tag
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
