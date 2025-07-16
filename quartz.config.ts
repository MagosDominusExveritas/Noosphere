import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Noosphere",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "trashp4nda.com/Noosphere/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Share Tech Mono",
        body: "Share Tech Mono",
        code: "IBM Plex Mono",
      },
      // quartz.config.ts  → theme.colors
      colors: {
        /* ── TRUE LIGHT MODE ── */
        lightMode: {
          /* Surfaces */
          light: "#E9F1FF",  // pale dataslate blue – page background
          lightgray: "#CAD6EA",  // card / border
          gray: "#8EA1B8",  // graph edges, heavier borders
          darkgray: "#0F232F",  // body text (nearly-navy for 7:1 contrast)
          dark: "#00273E",  // headers & icons

          /* Interaction */
          secondary: "#B41618",  // core crimson links / active node
          tertiary: "#E24A4C",  // oxide red hover / visited
          highlight: "rgba(0, 85, 160, 0.15)",   // soft blue halo on links / code
          textHighlight: "#1FAE0088",            // neon-green ==highlight==
        },

        /* ── DEEP-BLUE COGITATOR (dark mode) ── */
        darkMode: {
          /* Surfaces */
          light: "#081A2F",  // deep void blue page background
          lightgray: "#0F2A46",  // console panel / border
          gray: "#1A3C5D",  // graph edges
          darkgray: "#86ECAA",  // CRT green body text (AA on #081A2F)
          dark: "#E24A4C",  // brighter green headers & icons

          /* Interaction */
          secondary: "#E24A4C",  // bright crimson pops on blue
          tertiary: "#B7F7C0",  // core crimson hover / visited
          highlight: "rgba(30, 84, 135, 0.35)",  // blue glow
          textHighlight: "#1FAE0088",
        },
      },


    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
