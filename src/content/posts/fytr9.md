---
author: "Charles Hood"
pubDatetime: 2026-07-11T13:27:44.000Z
title: "Two Days, Four AIs, One Arcade Game"
description: "I had four AI models write the plan and Claude Code build the game. Two days later there is a playable arcade demo you can try in your browser."
ogImage: "https://charleshood.net/blog-images/fytr9/media/og-card.jpg"
draft: false
tags:
  - "AI"
  - "Claude Code"
  - "Godot"
  - "Game Development"
  - "Retro Gaming"
---

Back in the dinosaur days I fed a lot of quarters into a certain 1981 arcade cabinet. You flew a little ship over a planet that wrapped around forever, shooting alien raiders and rescuing the poor colonists they kept trying to carry off the top of the screen. I won't name it, for boring trademark reasons, but if you were there, you know exactly the one. I played it at the arcade and at home on my Atari 2600. I was never great at it. Didn't matter. It was leading-edge stuff for its day and I liked it very very much.

I bring this up because, as of this week, I have my own.

A while back I saw a post somewhere on the internet (probably X, and of course I can't find it now) where someone told [Claude Code](https://claude.com/claude-code) to build them a game, and it just... did. The poster seemed kind of amazed. It stuck with me. I have all these AI tools at my fingertips. Why not me?

So this week I did it. I'm on day two, two long-ish sessions total, and there is now a game called **FYTR9**: a "fast single-player panoramic rescue shooter," where any resemblance to a certain 1981 arcade classic is purely intentional. It's pre-alpha. The art is deliberately placeholder geometry. Only the core rescue loop exists so far. But it runs, it's honestly playable, the [repo is public](https://github.com/charles-hood/fytr9), and you can fly it in your browser right now, a little further down this page.

Here's how it happened.

## Step one: I made the AIs argue about the plan

Confession: I'm an LLM nerd. I pay for a Claude subscription and a ChatGPT subscription (at a much lower tier), and I frequently play the two off each other. Codex has turned out to be very good at reviewing and QA-ing what Claude Code writes. More recently I signed up at [Fireworks.AI](https://fireworks.ai/), which gives me API access to the open-weight models everyone's been talking about, GLM 5.2 and DeepSeek v4 among them, for pocket change. Before anyone pictures some baller running four AI subscriptions on a maxed-out Mac Studio: it's all hosted, it's all API calls, and the open models cost almost nothing.

So I had four good models from four different labs, with genuinely different training and philosophies, sitting there. Why not use them all?

I asked each one, independently, to write a complete implementation plan for the same game: the wrapping planet, the abductions, the rescues, free tools only, original names and art. Claude, Codex, DeepSeek, and GLM each produced their own plan, cold. Then the plans got unified, the unifications got merged, and the merged plan went back out for independent review by ChatGPT and by Claude on the web, twice. Every finding was resolved into a final document: `fytr9-plan-v4.md`, about a thousand lines, which lives in the repo as the single source of truth.

Was that overkill for a retro arcade game? Absolutely. But the reviews caught real problems, not nitpicks. One catch: an early draft used a single random number generator for everything, which meant a cosmetic particle tweak could silently change the "deterministic" enemy schedule. The plan now mandates three separately scoped RNG streams. Another: what exactly happens when the last colonist dies was under-specified in a way that would have bitten during implementation. One review even corrected a false claim another draft had introduced about a Godot command-line flag. Different models really do miss different things, which is the whole reason I bothered.

The plan also opens with standing orders to Claude Code: build one milestone at a time, stop and report at each exit criterion, write headless tests for the tricky math, put every tuning value in a config resource instead of scattering magic numbers, and record any judgment calls in a decisions file. No feature creep. Ideas that aren't in the plan go to a backlog file, not into the code.

## The part where I learned what Godot is

Here's a detail I found genuinely interesting: all four models, independently, picked the same game engine. **[Godot](https://godotengine.org/)**. I'd barely heard of it, so I read up, and now I get it.

Godot is a free, open-source game engine under the MIT license. No royalties, no revenue share, no per-seat fees. It's particularly strong for 2D games, with the camera, collision, particle, and parallax machinery a game like this needs already built in. And one project exports to Windows, macOS, Linux, and the browser via WebAssembly. The plans spelled out the reasoning against the alternatives: Pygame and LÖVE have no editor and you hand-roll everything, Phaser is browser-only and makes desktop builds a chore, and Unity and Unreal have licensing tiers that violate the everything-free constraint. When four differently-trained models converge on the same answer unprompted, that's a pretty strong signal.

## Then Claude Code built it

For the actual coding I stuck with Claude Code running Fable 5, because in my humble experience it's the best at this. I'm no expert, I just know what I know from all my vibe coding.

I pointed it at the plan and said, in effect, go. Milestone 0 set up the repo, the Godot project, the test runner, and the licensing files. Milestone 1 was the "flight laboratory": the looping ring world, the flight model with momentum and that satisfying brake-and-reverse, the terrain, the camera that leads your movement. The world is three screens wide and wraps seamlessly. Fly one direction for ten seconds and you lap the planet without ever seeing the seam.

Milestone 2, finished last night, is the heart of the game: the rescue loop. Snatchers patrol, pick a colonist, descend, grab, and climb. Shoot the carrier and the colonist drops. Catch them with your ship and they hang below it while you carry them down to safety. Miss, and a short fall is survivable but a long one isn't. A scanner across the top of the screen shows the whole ring, and off-screen trouble gets an edge arrow pointing the short way around the world.

The part that impressed me most wasn't the features, it was the discipline. The project has 13 test suites running 1,071 checks, all headless from the command line: wrap-around math, scanner mapping, the colonist state machine, deterministic wave schedules from a seed, scoring rules. And the tests earned their keep. An integration test caught a real bug before it shipped, a mismatch between the grab offset and the carry offset that clipped carried colonists into the terrain and made falls uncatchable. My AI programmer buddy found its own bug with its own tests and reported it to me in the milestone summary.

## The state of the game (playable, after a fashion)

What exists today is one full wave of the real game: ten colonists, four snatchers, catch and carry and deliver, scoring with bonuses, instant retry. No lives yet, no bombs, no hyperspace, and the enemies don't shoot back. Placeholder shapes stand in for all the art, per the plan, until the core loop is fully proven.

See for yourself. This is the actual game, exported to WebAssembly and served off the same $18 DigitalOcean droplet that hosts this blog. Click the game to give it keyboard focus, then press Space. WASD or arrows to fly, Space or J to fire. A gamepad works too. Desktop browser recommended; there are no touch controls yet.

<div style="position:relative;width:100%;aspect-ratio:16/9;margin:1.5rem 0;">
  <iframe src="https://fytr9.rockofpages.com/" title="FYTR9 playable pre-alpha demo" style="position:absolute;inset:0;width:100%;height:100%;border:1px solid #444;border-radius:8px;" allow="autoplay; fullscreen; gamepad" loading="lazy"></iframe>
</div>
<p style="text-align: center; font-size: 0.85em; opacity: 0.75; margin: 0 0 24px 0;"><em>FYTR9, pre-alpha. Click the game, then press Space. If the frame gives you trouble, <a href="https://fytr9.rockofpages.com/">play it full-page here</a>.</em></p>

<img src="/blog-images/fytr9/media/rescue-slice.png" alt="FYTR9 gameplay screenshot: a Snatcher carrying a Settler upward while the player ship closes in, with the ring scanner across the top of the screen" style="width: 100%; height: auto; margin: 0 0 8px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<p style="text-align: center; font-size: 0.85em; opacity: 0.75; margin: 0 0 24px 0;"><em>An abduction in progress. The scanner up top shows the whole ring; the settler count at right is about to get personal.</em></p>

## The roadmap

The plan runs through seven milestones, and the next four are already specified in detail:

- **Milestone 3, the complete arcade loop**: lives and player death, the Pulse Bomb, hyperspace with a per-difficulty failure roll, waves 1 through 5, and three difficulty presets.
- **Milestone 4, the full roster**: five more enemy types, including the fast mutant that an escaped snatcher becomes, plus the planet-collapse ending when every colonist is lost. If you played the original, you know exactly how much dread that mechanic carries.
- **Milestone 5**: menus, saves, options, accessibility, and a real art and sound pass.
- **Milestone 6**: balancing, playtesting, and release builds for Windows, macOS, Linux, and the web.

## The repo is public

Everything is at [github.com/charles-hood/fytr9](https://github.com/charles-hood/fytr9), MIT licensed: the game, the tests, and the full plan lineage, from the four original model plans through v4. If you want to poke at it, playtest it, or contribute, the README has a quick start (install Godot, clone, run) and a list of the feedback that helps most right now, which is mostly about how the flight feels.

## Why this delighted me

I want to be clear about what this is and isn't. Nobody should mistake FYTR9 for a finished game, and I didn't write a line of it. What I did was decide what to build, set up a planning process I was curious about, review milestone reports, and playtest. Claude Code did the rest.

And that's the part that gets me. I came up on these games. The people who made them were wizards to me, working in assembly against memory measured in kilobytes. I never became a game programmer. But forty-some years later I described the game I remembered loving, spent two days checking in on the work between other things, and now there's a version of it running in a browser tab.

The barrier between "I've always wanted to" and "here, click this" has gotten awfully thin. If you have a game rattling around in your head from your own arcade days, I can report it's a very good time to let it out.
