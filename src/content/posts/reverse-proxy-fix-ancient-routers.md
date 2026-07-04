---
author: "Charles Hood"
pubDatetime: 2025-08-12T14:00:00.000Z
title: "How I Spent $5.50/month to Fix What Three Tech Giants Wouldn't"
description: "A Tale of Ancient Routers and Modern Apathy"
draft: false
tags:
  - "Networking"
  - "Infrastructure"
  - "DevOps"
  - "Problem Solving"
  - "Humor"
coverImage:
  src: "/blog-images/reverse-proxy-fix/media/steve-router-2015.png"
  alt: "Ancient router with 'Do NOT remove - Steve 2015' sticky note"
---

<img src="/blog-images/reverse-proxy-fix/media/steve-router-2015.png" alt="Ancient router with 'Do NOT remove - Steve 2015' sticky note" class="router-image" />

<style>
.router-image {
  float: right;
  margin: 0 0 10px 10px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

@media (min-width: 768px) {
  .router-image {
    width: 250px;
    height: 250px;
    margin: 0 0 20px 20px;
  }
}
</style>

## Or: Why I'm Running a Reverse Proxy to Access My Own Websites from My Own House

Picture this: You're a web developer. You've built some websites. They're hosted on Netlify, a modern CDN service owned by a company valued at hundreds of millions of dollars. Your internet comes from AT&T GigaFiber, one of America's largest ISPs. The whole thing runs on AWS, Amazon's trillion-dollar cloud infrastructure.

You type in your website's URL from your home computer.

It doesn't load.

Welcome to my Tuesday.

## The Crime Scene

Here's what's happening when I try to visit my own websites (charleshood.me, charleshood.org, charleshood.net) from my home:

```bash
$ dig charleshood.me +short
98.84.224.111
18.208.88.157

$ ping 98.84.224.111
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
# ... crickets forever ...

$ ping 18.208.88.157  
64 bytes from 18.208.88.157: icmp_seq=0 ttl=246 time=3.089 ms
# Works perfectly!
```

Netlify returns two IPs. One works. One is completely blocked by AT&T. It's a 50/50 coin flip whether my website loads or times out.

## The Investigation

A little WHOIS detective work reveals the smoking gun:

**98.84.224.111 (The Blocked IP):**
- Originally registered: 2005 (19 years ago!)
- Transferred to Amazon: 2018
- What it probably was: Residential/business IP space
- What AT&T thinks it still is: A Romanian spam farm from 2015

**18.208.88.157 (The Working IP):**
- Native AWS infrastructure
- AT&T: "This one's fine"

Somewhere in an AT&T datacenter, there's probably an ancient Cisco router with this config:

```
! Added by Steve 2015-03-14 - blocking Romanian spam farm
access-list 101 deny ip 98.84.224.0 0.0.0.255 any
! DO NOT REMOVE - critical for network stability (what? -Dave 2018)
```

## The "Customer Support" Experience

**Netlify Support:** "All sites at Netlify are hosted on all CDN nodes at once. The complexity of this configuration means that it is not possible to prevent your sites from using that IP address."

Translation: "Our entire architecture makes it impossible to work around your ISP's firewall rule from the Bush administration."

**AT&T Support (hypothetically, I didn't even try):** "Have you tried restarting your router?"

**AWS Support (also hypothetical):** "This is an ISP issue, not an AWS issue."

## The Nuclear Option

So I did what any reasonable person would do: I built my own internet infrastructure.

For less than the price of a Starbucks latte, I:
1. Spun up a DigitalOcean droplet
2. Installed Caddy (a web server)
3. Configured it as a reverse proxy
4. Updated my DNS to point to my proxy instead of Netlify

Now when someone visits charleshood.me:
1. DNS returns my DigitalOcean IP (167.71.24.36)
2. Request hits my proxy
3. Proxy fetches from Netlify (always finding a working route)
4. Returns the content to the visitor
5. AT&T's ancient blocklist is completely bypassed

## The Configuration

Here's my entire Caddy config that fixes what three multi-billion dollar companies wouldn't:

```caddy
# Charleshood domains - proxy to Netlify app
charleshood.me, www.charleshood.me,
charleshood.org, www.charleshood.org,
charleshood.net, www.charleshood.net {
    reverse_proxy https://charleshood.netlify.app {
        header_up Host charleshood.netlify.app
        header_up X-Real-IP {remote}
        header_up X-Forwarded-For {remote}
        header_up X-Forwarded-Proto {scheme}
        transport http {
            tls
            tls_insecure_skip_verify
        }
        header_down +Cache-Control "public, max-age=3600"
    }
}
```

That's it. That's the whole fix. 15 lines of config.

## The Beautiful Irony

Here's the kicker: My $5.50/month reverse proxy is now MORE RELIABLE than accessing Netlify directly. For the cost of a Big Mac, I'm routing around a problem that three companies with a combined market cap exceeding $2 trillion can't coordinate to fix.

- Going to charleshood.net (through my proxy): **Always works**
- Going to charleshood.netlify.app (direct to Netlify): **Sometimes fails**

From my house, my dinky little DigitalOcean droplet is more reliable than a globally distributed CDN. Not because Netlify's infrastructure is broken, but because my proxy sidesteps an ancient firewall rule that nobody at AT&T will touch.

## Why This Will Never Get Fixed

The fix would take 5 minutes. Any competent network engineer would immediately understand the problem:

1. AT&T has outdated blocklists from when these IPs were residential
2. Remove the block
3. Done

But here's why it won't happen:

**AT&T's Perspective:**
- "We can't update that blocklist because:"
- It's running IOS 12.something from 2008
- The guy who configured it retired in 2019
- Our Cisco SmartNet contract expired in 2020
- "If we touch it and something breaks, half of Texas loses internet"
- Affects 0.001% of customers = Priority: Low

**Amazon's Perspective:**
- Has massive leverage (AT&T probably runs on AWS!)
- Could fix this with one phone call
- But the cost of leaving it broken is externalized to customers (specifically, $5.50/month to me)
- The cost of fixing it (meetings, engineering time) would be internal
- Therefore: ¯\_(ツ)_/¯

**Netlify's Perspective:**
- "Not our problem, we just use AWS IPs"
- Architecturally unable to exclude specific IPs
- Would need to restructure entire CDN approach

## The Philosophical Crisis

We've built an internet that can:
- Orchestrate Kubernetes clusters across continents
- Train AI models with trillions of parameters
- Stream 4K video to billions of devices
- Process millions of financial transactions per second

But we can't update a firewall rule from 2015 because nobody wants to touch the ancient router.

## The Eternal Future

This will NEVER get fixed. That blocked IP will survive the heat death of the universe. 

My great-grandkids will still be paying $5.50/month to DigitalOcean, not knowing why. Then one day they'll find this old blog post, whisper "Who was Steve?" and the prophecy will be fulfilled.

The last black hole will evaporate, the universe will reach maximum entropy, and in the final nanosecond before total heat death, that ancient Cisco will still be denying packets to 98.84.224.0/24.

## The Lesson

This is the modern internet in a nutshell: Incomprehensible complexity built on legacy infrastructure that very few people fully understand anymore, held together by digital duct tape and monthly subscriptions to work around problems that would take 5 minutes to actually fix.

But hey, at least my websites load now! 🎉😭

---

*PS: If any deep core engineers from AWS or AT&T read this and chuckle and have the power to fix this... please 🙏, it would save me $5.50/month. (Sorry DigitalOcean)*

*PPS: Steve, if you're reading this and you're the one who added that block in 2015 - I get it, man. Those Romanian spam farms were annoying. But it's 2025 now. Amazon owns those IPs. Please come back from retirement and fix your ACL.*

*PPPS: But let's be real. This will never get fixed. That blocklist will outlive us all.*