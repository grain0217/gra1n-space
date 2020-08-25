import { Link, graphql } from 'gatsby';
import React from 'react';
import get from 'lodash/get';

import Bio from '../components/Bio';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import TagIcon from '../components/TagIcon';
import SEO from '../components/SEO';

import { rhythm } from '../utils/typography';
import { formatPostDate } from '../utils/helpers';

class HomeTemplate extends React.Component {
  render() {
    const posts = get(this.props, 'data.allMarkdownRemark.edges');

    return (
      <Layout>
        <SEO />
        <aside style={{ marginBottom: rhythm(3) }}>
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title');
            const date = get(node, 'frontmatter.date');
            const tag = get(node, 'frontmatter.tag');
            const spoiler = get(node, 'frontmatter.spoiler');
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      fontFamily:
                        '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none', color: 'var(--textTitle)' }}
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="sub-title">
                    <span
                      style={{
                        fontFamily: 'sans-serif',
                        marginRight: rhythm(1),
                      }}
                    >
                      {formatPostDate(date)}
                    </span>
                    <TagIcon />
                    <Link
                      to={`/tag/${tag}`}
                      className="tag"
                      style={{ marginLeft: rhythm(1 / 4) }}
                    >
                      {tag}
                    </Link>
                  </p>
                </header>
                <p dangerouslySetInnerHTML={{ __html: spoiler }} />
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
            spoiler
            tag
          }
        }
      }
    }
  }
`;
