const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // create redirects for urls in v1
  createRedirect({ fromPath: "/projects", toPath: "/about", isPermanent: true })
  createRedirect({
    fromPath: "/19/mettre_a_jour_automatiquement_ses_images_docker",
    toPath: "/blog/mettre_a_jour_automatiquement_ses_images_docker",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/18/utiliser_le_client_docker_sans_etre_root",
    toPath: "/blog/utiliser_le_client_docker_sans_etre_root",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/3/git_les_commandes_qui_sauvent_la_vie",
    toPath: "/blog/git_les_commandes_qui_sauvent_la_vie",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/1/grep_par_l_exemple",
    toPath: "/blog/grep_par_l_exemple",
    isPermanent: true,
  })

  const articleTemplate = path.resolve("./src/templates/article.js")
  const result = await graphql(
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
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const articles = result.data.allMarkdownRemark.edges

  articles.forEach(article => {
    createPage({
      path: article.node.fields.slug,
      component: articleTemplate,
      context: {
        slug: article.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = "/blog" + createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}
