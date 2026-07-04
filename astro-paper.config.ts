import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // NOTE: matches the live site's current canonical (charleshood.net).
    // Revisit at cutover — docs treat charleshood.me as the primary domain.
    url: "https://charleshood.net/",
    title: "Charles Hood",
    description: "My personal web log where I write about tech, tunes, and travel!",
    author: "Charles Hood",
    profile: "https://charleshood.me/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/New_York",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "mail", url: "mailto:charles.hood@gmail.com" },
    { name: "x", url: "https://x.com/charleshood" },
    { name: "linkedin", url: "https://www.linkedin.com/in/charleshood/" },
    { name: "facebook", url: "https://www.facebook.com/charleshood" },
    { name: "rss", url: "/rss.xml" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
