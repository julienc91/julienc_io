module.exports = {
  siteMetadata: {
    title: "Julien Chaumont - Software Engineer",
    author: {
      name: "Julien Chaumont",
    },
    description: "Julien Chaumont - Software Engineer",
    siteUrl: "https://julienc.io",
  },
  trailingSlash: "never",
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "about",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-copy-linked-files", "gatsby-remark-prismjs"],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Julien Chaumont - Développeur",
        short_name: "Julien Chaumont",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#111111",
        display: "standalone",
        icon: "content/assets/logo512.png",
      },
    },
    "gatsby-plugin-meta-redirect",
    "gatsby-plugin-sitemap",
  ],
}
