const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/Post.js');

    // 首页
    createPage({
      path: '/',
      component: path.resolve('./src/templates/Home.js'),
      context: {
        langKey: 'zh-hans',
      },
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    tag
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // 1. 博客内容页
        const posts = result.data.allMarkdownRemark.edges;
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });

        // 2. tag页面：某个标签下的所有文章
        let tags = [];
        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.tag')) {
            tags = tags.concat(edge.node.frontmatter.tag);
          }
        });
        tags = _.uniq(tags);
        tags.forEach(tag => {
          createPage({
            path: `/tag/${tag}`,
            component: path.resolve('./src/templates/Tags.js'),
            context: {
              tag,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // markdown
  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    });
  }
};
