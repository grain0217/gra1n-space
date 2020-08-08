import React from "react"
import { Link, graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/Layout"
import Footer from "../components/Footer"
import SEO from "../components/SEO"

class TagTemplate extends React.Component {
  render () {
    const posts = get(this.props, 'data.allMarkdownRemark.edges');
    const tag = get(this.props, 'pageContext.tag')
    return (
      <Layout>
        <SEO title="Tags" />
        <h2>{tag}</h2>
        <ul>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title');
            return (
              <li key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
        <Footer hideTag={true} />
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
