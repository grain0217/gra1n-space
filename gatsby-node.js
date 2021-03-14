const _ = require('lodash');
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const catalogTemplate = path.resolve('./src/templates/Pages.js');
    const postTemplate = path.resolve('./src/templates/Post.js');
    // const tagsTemplate = path.resolve('./src/templates/Tags.js');

    resolve(
      graphql(
        `
          {
            postsRemark: allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
        // tagsGroup: allMarkdownRemark(limit: 1000) {
        //   allTags(field: frontmatter___tags) {
        //     fieldValue
        //   }
        // }
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        const posts = result.data.postsRemark.edges;

        // 博客内容页
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: postTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });

        // 博客分页
        const postsPerPage = 15;
        const numPages = Math.ceil(posts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, pageNo) => {
          createPage({
            path: pageNo === 0 ? `/` : `/${pageNo + 1}`,
            component: catalogTemplate,
            context: {
              limit: postsPerPage,
              skip: pageNo * postsPerPage,
              numPages,
              currentPage: pageNo + 1,
            },
          });
        });

        // // tag页面：某个标签下的所有文章
        // const tags = result.data.tagsGroup.group
        // tags.forEach(tag => {
        //   createPage({
        //     path: `/tag/${tag.fieldValue}`,
        //     component: tagsTemplate,
        //     context: {
        //       tag: tag.fieldValue
        //     },
        //   });
        // });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // markdown
  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
