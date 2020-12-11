import { Link, graphql } from 'gatsby';
import React from 'react';
import get from 'lodash/get';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { formatPostDate } from '../utils/helpers';

class HomeTemplate extends React.Component {
  render() {
    const posts = get(this.props, 'data.allMarkdownRemark.edges');

    return (
      <Layout>
        <SEO />
        <main>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title');
            const date = get(node, 'frontmatter.date');
            return (
              <article key={node.fields.slug} className="home-post">
                <Link className="post-title" to={node.fields.slug}>
                  {title}
                </Link>
                <span className="sub-title">{formatPostDate(date)}</span>
              </article>
            );
          })}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default HomeTemplate;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
