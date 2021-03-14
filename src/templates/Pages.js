import { Link, graphql } from 'gatsby';
import React from 'react';
import get from 'lodash/get';

import { rhythm } from '../utils/typography';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { formatPostDate } from '../utils/helpers';

class HomeTemplate extends React.Component {
  render() {
    const posts = get(this.props, 'data.allMarkdownRemark.edges');
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

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

        <ul className="page">
          {!isFirst && (
            <Link to={prevPage} rel="prev" className="page-prev">
              上一页
            </Link>
          )}
          {Array.from({ length: numPages }, (_, pageNo) => (
            <li
              key={pageNo}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${pageNo === 0 ? '' : pageNo + 1}`}
                className={pageNo + 1 === currentPage ? 'current-page' : ''}
                style={{
                  padding: rhythm(1 / 4),
                }}
              >
                {pageNo + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next" className="page-next">
              下一页
            </Link>
          )}
        </ul>
        <Footer />
      </Layout>
    );
  }
}

export default HomeTemplate;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
