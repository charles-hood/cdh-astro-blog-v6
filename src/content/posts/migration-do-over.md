---
author: "Charles Hood"
pubDatetime: 2026-07-04T02:50:15.000Z
title: "The Migration I Should Have Done the First Time"
description: "A year ago I moved this blog to Astro and called it a fork. It wasn't one. Here's the confession, the do-over to AstroPaper 6, and how Claude Code made fixing it an evening instead of a weekend."
draft: false
ogImage: "https://charleshood.net/blog-images/migration-do-over/media/og-card.jpg"
tags:
  - "Astro"
  - "Web Development"
  - "Static Sites"
  - "AI"
  - "Tech"
---

<img src="/blog-images/migration-do-over/media/hero2-light.png" alt="A monitor in a sunlit room showing a commit graph, an orange branch line curving back into a blue main line at a glowing merge point, with a dinner fork resting on the desk beside the keyboard" style="float: right; margin: 0 0 20px 20px; width: 250px; height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" class="migration-img block dark:hidden">
<img src="/blog-images/migration-do-over/media/hero2-dark.png" alt="A monitor in a dark room showing a glowing commit graph, an orange branch line curving back into a blue main line at a bright merge point, with a dinner fork resting on the desk beside the keyboard" style="float: right; margin: 0 0 20px 20px; width: 250px; height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" class="migration-img hidden dark:block">

<style>
@media (max-width: 768px) {
  .migration-img {
    width: 150px !important;
    height: 150px !important;
    margin: 0 0 15px 15px !important;
  }
}
</style>

About a year ago I wrote a post called [My Blog Migration Journey: From Gatsby to Astro](/posts/blog-migration-journey). In it, past me declared victory: new framework, clean theme, "it just works." Past me was having a great time. Past me also, and I say this with love, had no idea what he'd actually done.

This is the post where I clean up after that guy. 🧹

## The Confession

When I "migrated" to Astro last July, I didn't fork the [AstroPaper](https://github.com/satnaing/astro-paper) theme. I *downloaded* it. Copied the files into a fresh repo, typed "Initial commit," and moved on with my life. Later, feeling responsible, I added the original theme as a git remote called `upstream` so I could pull in updates someday.

Here's the thing about that remote: it was a bookmark, not a lifeline. My repo and the theme's repo shared exactly zero commits of history. Run `git merge-base` between them and git just shrugs at you. Every "update" would have been an archaeology project, so naturally I did what any reasonable person does with an archaeology project. I didn't do it.

Meanwhile, quietly, over twelve months:

- The theme moved on **861 commits** without me, including a full version 6 rewrite
- Astro went from version 5 to *7*
- Node 20, the version this site builds on, hit end-of-life and stopped getting security patches
- My laptop and my server ended up running **different dependency trees** for the same blog, because I never committed a lockfile and each machine resolved its own idea of "current" (this one genuinely embarrassed me)

And my 118 commits of "customizations"? When I finally audited them, most were ghosts. A `coverImage` field I'd dutifully added to 29 posts that nothing, anywhere, ever rendered. A "proxy-proof" theme toggle protecting against a reverse proxy I [retired in August 2025](/posts/reverse-proxy-fix-ancient-routers). A bug fix the theme author had already shipped upstream. Out of six customizations, exactly **two** turned out to be real: a Contact link in the nav, and the comments widget.

I had built a museum of solutions to problems that no longer existed, and I couldn't take updates because my fork wasn't a fork. You know how it is.

## The Do-Over 🍴

The fix wasn't "upgrade the theme." The fix was to start over correctly: make a *real* GitHub fork of AstroPaper 6, with actual shared history, and port my content onto it. That sounds like a lost weekend. It took an evening, and honestly a pretty fun one, because I did the whole thing as a conversation with Claude Code.

I had Claude work in checkpoints, each one a place where I could look at a local preview and say "keep going" or "nope":

1. **Scaffold** the fork, stock theme, dummy content
2. **Identity**: my config, my hero text, my socials
3. **Content**: all 31 posts and their images, moved verbatim
4. **Feature parity**: Contact nav, comments, favicon
5. **Audit**: diff the new site against production, mechanically
6. **Cutover**: repoint the server, keep the old site on disk as a parachute

The audit step is the one I'd evangelize. Instead of trusting anyone's notes about what got ported, Claude diffed the actual live site against the actual new build: every URL in the sitemap, the meta tags on every page type, the RSS feed item by item, tag pages, archives. All 31 post URLs came out identical, which means every old link and search result still works. The diff also caught that the new theme generates tag URLs differently (five tags moved), which became five redirect rules instead of five mystery 404s.

And for the record, the human still earned his keep: the AI ported my homepage down to the text and missed my *face*. I opened prod and the preview side by side and spotted the missing headshot in about five seconds. It had extracted the hero text with the HTML stripped out, and my photo went with it. A good reminder, for humans and robots alike: verify against the source, not your own checklist. 😄

## What's Actually Better Now

**Updates are one command.** This is the whole ballgame. The theme author ships a release, GitHub emails me, and syncing is:

```bash
git fetch upstream
git merge upstream/main
```

That merge was *impossible* before. Not hard. Impossible. (Yes, `--allow-unrelated-histories` exists. No, hand-resolving a wall of conflicts against 861 commits of divergence is not a merge. It's a punishment.)

**My delta is now just six small commits.** Config, hero, content, a nav link, a comments component, a deploy script. When upstream changes something, the surface area for conflicts is tiny and I understand every line of it. The old repo's 118 commits have been distilled down to the part that was actually mine.

**The comments widget lost its framework.** The old setup hauled in all of React to run one Giscus comments box (my 2025 fix for theme switching). Turns out the React wrapper was just a convenience around a `postMessage` API anyone can call. It's now about seventy lines of vanilla JavaScript, and every existing comment survived because they're keyed to URL paths that didn't change.

**Version 6 itself is nice.** Click-to-zoom lightbox on post images, callout boxes for asides, one typed config file instead of settings scattered across two. Nothing life-changing. The life-changing part is that when version 7 arrives, I'll actually get it.

## Lessons, Round Two 📝

Last year's post had a "Lessons Learned" section too. Those lessons were fine. These are the ones I apparently needed a year to earn:

1. **A fork is a relationship, not a download.** If you copy a theme's files instead of forking its repo, you've adopted a codebase, alone, forever. GitHub's Fork button costs one click and pays for itself the first time upstream fixes something.

2. **Audit your customizations occasionally.** Most of mine were dead code wearing a "load-bearing" costume. Every one you delete makes the next upgrade easier.

3. **Verify against reality, not your notes.** The side-by-side diff against production caught things that three rounds of "looks good to me" didn't. Your memory of what you built is not a spec.

4. **The AI makes the boring discipline cheap.** I would never have hand-diffed 136 URLs and every page's meta tags on a Friday night. Claude Code did it in minutes, tiered the findings by severity, and turned them into redirect rules. The value wasn't magic. It was that the tedious, correct process stopped being tedious.

The blog you're reading is the result. Same posts, same URLs, same comments, new bones. And for the first time since I left Gatsby, "keep the blog current" is a habit instead of a someday project.

**Share with me:** If you've got a "fork" that's secretly an orphan, or a pile of customizations you've been putting off auditing, I'd be curious how it got that way. Comments are open. 💬
