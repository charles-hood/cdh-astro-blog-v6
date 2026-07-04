---
author: "Charles Hood"
pubDatetime: 2025-07-27T00:00:00.000Z
title: "My Blog Migration Journey: From Gatsby to Astro"
description: "Why I moved my personal blog from Gatsby to Astro, what I learned, and how it turned out."
draft: false
tags:
  - "Web Development"
  - "Astro"
  - "Gatsby"
  - "Static Sites"
  - "Tech"
---

<div style="float: right; margin: 0 0 15px 20px; width: 200px;">
  <a href="https://astro.build" target="_blank" rel="noopener noreferrer" title="Visit Astro website">
    <img src="/blog-images/2025-01-27--blog-migration-journey/media/astro-logo-dark-official.png" alt="Astro - The web framework for content-driven websites" class="block dark:hidden" style="width: 100%; border-radius: 8px;">
    <img src="/blog-images/2025-01-27--blog-migration-journey/media/astro-logo-light-gradient.png" alt="Astro - The web framework for content-driven websites" class="hidden dark:block" style="width: 100%; border-radius: 8px;">
  </a>
</div>

Well, it finally happened. After months of my blog sitting there looking a bit stale (okay, *really* stale), I decided it was time for a change. Not just new content, but a complete tech stack overhaul. Let me tell you about my journey from Gatsby to [Astro](https://astro.build), and why it was one of the best decisions I've made for my digital presence. 🚀

## The Problem with My Old Setup

Don't get me wrong, Gatsby served me well for a couple of years. The Lumen theme was clean, my content was organized, and everything *worked*. But here's the thing: it felt like maintaining a vintage car. Sure, it looked good, but every time I wanted to make a simple change or add a new post, I'd run into some complexity that made me postpone the update.

The build times were getting slower, the dependency tree was getting more complex, and honestly? I just wasn't excited about working on it anymore. You know that feeling when a project starts to feel like work instead of fun? That was my Gatsby blog.

## Why Astro Caught My Eye 👀

I'd been hearing buzz about Astro in the tech community for a while. The promise of "bringing your own framework" and super-fast static sites sounded appealing, but what really sold me was the philosophy: **ship less JavaScript to the browser**.

As someone who writes about tech for regular people, I love tools that prioritize performance and simplicity. Astro's approach of rendering everything to static HTML by default, with the option to add interactivity only where needed, just made sense.

Plus, the AstroPaper theme looked clean and modern. Exactly the aesthetic I was going for.

## The Migration Process: Easier Than Expected

Here's the thing that surprised me most: the migration was actually straightforward. I was expecting days of wrestling with configurations and broken links, but the process was pretty smooth:

### Content Migration
- **19 blog posts** moved over with all formatting intact
- **Images and media** copied to the new structure with updated paths
- **Frontmatter** converted from Gatsby format to Astro's content collections

### Configuration Updates
- **Site settings** updated with my personal info
- **Social links** configured for X, LinkedIn, Facebook, and email
- **Navigation** customized with About and Contact pages
- **Bio picture** added to both homepage and About page

### The Little Touches
- Updated my location from Woodstock to Canton (life changes!)
- Changed the homepage greeting from generic "Welcome" to "Hey there!"
- Added my LinkedIn photo as the favicon to match the original site
- Even "freshened up" some post dates to make the blog feel more current 😉

## What I Love About the New Setup

### Performance 🏎️
The build times are *significantly* faster. What used to take minutes now takes seconds. And the site itself? Lightning fast. Astro's static generation means visitors get content immediately.

### Simplicity 
Adding a new post is now as simple as dropping a Markdown file in a folder. No complex GraphQL queries, no wrestling with gatsby-config.js. Just write and publish.

### Modern Development Experience
TypeScript out of the box, excellent VS Code integration, and a development server that actually feels responsive. It's a joy to work with.

### Deployment Magic
The whole thing deploys automatically to Netlify whenever I push to GitHub. No build step complexity, no environment variables to manage. It just works.

## The Tech Stack Rundown

For those curious about the technical details:

- **Framework**: Astro 5.12+ with AstroPaper theme
- **Styling**: Tailwind CSS (utility-first approach)
- **Content**: Markdown with frontmatter, stored in content collections
- **Search**: Pagefind for static search functionality
- **Hosting**: Netlify with automatic deployments from GitHub
- **Domain**: Still using charleshood.net (plus .org and .me mirrors)

## Lessons Learned 📝

1. **Don't wait for the "perfect" time to migrate**. I put this off for months thinking I needed a big block of time. The actual migration took an afternoon.

2. **Modern static site generators are incredibly mature**. The tooling around Astro made the whole process smooth and predictable.

3. **Sometimes the best upgrade is starting fresh**. Instead of trying to incrementally improve the old setup, starting with a clean slate was liberating.

4. **Good documentation matters**. Astro's docs made the learning curve almost non-existent.

## What's Next?

Now that the technical foundation is solid, I'm excited to get back to what this blog is really about: sharing thoughts on tech, tunes, and travel. The migration gave me a renewed enthusiasm for writing and a platform that makes publishing a pleasure rather than a chore.

I've got a running list of post ideas (including this meta post about the migration itself), and with the new setup, there's no friction between having an idea and getting it published.

## Should You Consider a Migration?

If you're running an older static site and feeling that maintenance friction, it might be worth exploring modern alternatives. The ecosystem has evolved dramatically in the past few years, and tools like Astro, Next.js, and others offer compelling benefits over older solutions.

That said, don't migrate just for the sake of migrating. Do it when your current setup is holding you back from creating content or when you're genuinely excited about the possibilities a new platform offers.

For me, this migration wasn't just about changing technologies. It was about rekindling my enthusiasm for maintaining my own corner of the internet. And that's worth its weight in gold. ✨

**Share with me:** Have you migrated a website or blog recently? What drove your decision, and how did it turn out? I'd love to hear your experiences in the comments below! 💬