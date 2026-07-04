---
author: "Charles Hood"
pubDatetime: 2026-06-22T00:00:00.000Z
title: "Deciding Where to Live Without Fooling Yourself"
description: "I built a system to plan a seasonal, rent-and-rotate life. The hard part was never the data. It was not letting the tool tell me what I wanted to hear."
draft: false
tags:
  - "Decision Making"
  - "AI"
  - "Lifestyle"
coverImage:
  src: "/blog-images/deciding-where-to-live/media/deciding-where-to-live.png"
  alt: "A man studies a paper map by lantern light at a camp table on a desert ridge at dusk, his truck and small trailer behind him and town lights in the valley below"
---

<img src="/blog-images/deciding-where-to-live/media/deciding-where-to-live.png" alt="A man studies a paper map by lantern light at a camp table on a desert ridge at dusk, his truck and small trailer behind him and town lights in the valley below" style="float: right; margin: 0 0 20px 20px; width: 320px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" class="deciding-img">

<style>
@media (max-width: 768px) {
  .deciding-img {
    float: none !important;
    display: block;
    width: 100% !important;
    margin: 0 0 20px 0 !important;
  }
}
</style>

*I built a system to plan a seasonal, rent-and-rotate life. The hard part was never the data. It was not letting the tool tell me what I wanted to hear.*

I started with the wrong question. Everyone does: what's the best place?

The plan was a seasonal life. No house, no fixed address, a tow vehicle and a small trailer, a few months in one place and a few in the next, with the first phase anchored near family I had to stay reachable to. The variables piled up fast. Climate, cost of living, taxes, crime, the local music and food, how far it was to tow, how far to an airport, whether I could get the car serviced. Six or seven axes, dozens of candidate cities, and a strong pull toward feeding all of it into something that would hand back one answer.

I built that something. And the thing I'm proudest of is that it refuses to give me one answer. The refusal is the point, and it took me longer than I'd like to admit, plus a couple of near-disasters, to work out why.

This is a piece about that. It's nominally about where to live, but the real subject is more general: how to make a high-stakes decision with a lot of competing criteria without quietly steering yourself toward the answer you'd already picked. The method turned out to matter more than the subject. So if you're never going to live in a trailer, stay anyway. The traps don't care whether you're choosing a city, a job, a school, or a strategy.

## Why the optimizer lies to you

Here's the first thing I learned. A multi-criteria optimizer, aimed at a question like this, will lie to you with total confidence.

The math isn't broken. That's the trouble with it. It's too obliging. Ask it to maximize a weighted blend of climate, cost, taxes, safety, and the rest, and it returns a ranked list, a clear winner up top, a number beside it, all the calm authority of a spreadsheet. Then you look underneath. When I scored the candidates and plotted them out, the top cities weren't separated by anything real. They sat in a clump a point or two wide, well inside the slop of my own input estimates. The winner and the third-place finisher were closer together than the error bars on the rent figures. The ranking was theater.

It got worse when I let the thing run clean, no thumb on the scale. It kept running off to places I would never live. Cheap, safe, low-tax, weather's fine, and dead as a parking lot at midnight. The optimizer doesn't know that a town with nothing going on is a non-starter for you. It only knows the numbers you gave it, and "interesting" is murder to quantify, so it quietly drops out of the model and the optimizer "wins" by shipping you somewhere you'd flee inside a week.

There's a structure under both failures. For a decision like this one there's a tradeoff triangle. Great climate, a real cultural scene, affordable-and-low-tax. Pick two. You never get all three. The cheap places with good weather are dull. The lively ones with good weather cost a fortune. The lively, affordable ones are sweating out August or handing a third of your money to the state. Once the triangle is in front of you the hunt for a single best city dissolves, because which two corners you want depends on what you need that particular season. That's not a ranking. It's a menu.

<figure style="margin: 2rem auto; max-width: 480px;">
  <img src="/blog-images/deciding-where-to-live/media/fig-tradeoff-triangle.png" alt="A tradeoff triangle with corners for great climate, a real cultural scene, and cheap plus low-tax; the center reads 'pick two'" style="display: block; width: 100%; height: auto; background: #fff; padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <figcaption style="text-align: center; font-size: 0.9rem; font-style: italic; opacity: 0.75; margin-top: 0.6rem;">The search for one best place dissolves once you can see why.</figcaption>
</figure>

So the first real decision was to quit pretending. The honest output isn't a pin on a map. It's a shape. A cluster of cities that all clear your actual requirements, none of them clearly beating the others, sorted different ways depending on what you're after on a given leg of the trip. A tool that hands you a shape and makes you choose looks less impressive than one that hands you a winner. It's also the one that isn't lying to you.

## Gates and weights

The architecture that came out of this has two layers, and keeping them apart was the single most important habit in the whole project.

Some requirements are hard. They hold on every leg, whatever your mood. You won't live somewhere truly dangerous. You need to tow there without a three-day haul. You need a real town and not a wide spot in the road. Those are gates. A city is in the pool or it isn't.

Everything else is a preference, and preferences move around. How much the music scene matters, how cost-sensitive you are this month, how much you'll pay in heat to be somewhere fun. Those are weights. They don't decide who's in the pool. They decide how the pool gets sorted for one particular purpose. The broke leg leans on cost. The leg where you want to be in the middle of things leans on scene. The leg in fire season leans on clean air.

The classic mistake, and I made it about as hard as a person can, is shoving a preference down into the gate layer. It looks principled. It feels rigorous. What it does is quietly delete options you never even see leave.

Crime is the example. Crime matters, obviously, so my first move was to gate on it. Hard ceilings on violent, property, and auto-theft rates, exclude anything over the line. Clean. Defensible. And when I ran it the pool came back hollow. The gates had wiped out nearly every city with a pulse, because dense, lively, walkable places carry higher crime stats than sleepy ones almost by definition. What survived was a list of safe, pleasant, inert towns. I'd built a machine optimized for never getting burgled, when what I wanted was one for a guy who'd rather be somewhere alive and is willing to park smart.

The fix was to notice that crime tolerance changes with the situation, which makes it a weight. On a leg where you want to be downtown in the noise, you'll eat a little more risk. On a four-month stay where the car sits cold in a lot, you'll eat less. So crime moved almost all the way into the weighted layer, where a lively city with so-so numbers can still win a scene leg and lose a safety leg. What stayed as a gate was one narrow floor, a relative cutoff that throws out the genuinely dangerous outliers and nothing else. The interesting cities came back. The dangerous ones stayed gone. And the rule generalized to everything I'd been tempted to hard-code. If a requirement gets stronger or weaker depending on the situation, it can't live in the gate layer, because a gate can't say "it depends," and "it depends" is usually the truth.

## Score the life you'll actually live

The second idea is the one I'd carry into almost any decision tool, since most of them botch it. Score the life you'll actually live. Not a yearly average of a life you won't.

Most tools that rate places do it on annual figures. Average climate, annual disaster risk, the rest. But a seasonal resident isn't there all year. If I'm on the Gulf Coast from December into March, the area's hurricane risk is not my risk. I'm a thousand miles north when the storms come. Annualizing it dings a perfectly good winter base for a danger I'll never be in the room for. So mask everything to the months you're there. A winter-only Gulf node carries zero hurricane exposure, because you only occupy it in the calm half of the year. The risk doesn't disappear. It reaches you as something else. It shows up as cost, baked into storm-inflated rent, and never as exposure. A different line in the ledger entirely, and running the two together had been warping every coastal city in the set.

The same correction runs all through the model. You don't own the building, so the metro's total property-loss number isn't yours to carry. You're a renter. You can leave. Summer in the dry interior West is cool and gorgeous and comes bundled with wildfire and smoke, but only in the months you'd be there, so that's exactly when it should count and not one day more. Once I started scoring the occupied window and only the occupied window, cities stopped being good or bad in some abstract way and started being good or bad for the season I'd actually use them in, which is the only version of the question that ever meant anything.

It's the resident's-eye view. The tool isn't rating a place. It's rating your experience of the place, during the slice of the year you'll be standing in it.

## The integrity tests

Then there's the part no architecture saves you from. The part where the method runs into your own appetite for fooling yourself.

There's a music city I love. I'll leave it nameless, which makes the point land cleaner anyway. It was the obvious cultural anchor for the whole plan, exactly the kind of lively place the gates-versus-weights fix was built to protect. Then the real crime data came in and it landed just over my danger floor. Not by much. Just over. Its violent-crime composite ran higher than another city I'd already agreed should be excluded.

So I had a choice, and it was a clarifying one. Keep the city I loved by nudging the floor down a hair. Or carve it a personal exemption. Or "correct" its data until it behaved. Or accept that any floor honest enough to drop the other city drops this one too, and that the second I make an exception for the place I happen to love, the floor means nothing and the whole exercise is just my preferences in a lab coat.

I left it out. Data is data, or the process has no integrity, and a process with no integrity is worse than none, because it launders what you wanted into something that looks like rigor. The fix wasn't to break the rule. It was to find an honest road to the same thing. Base in a nearby city that does clear the floor, and drive in for the music. I keep what I wanted. I don't bend the instrument to get it.

This came up more than once. An earlier version had dropped a tiny remote town by quietly editing its population down, a little fudge to force the result I wanted. A later, cleaner pass caught it and put it back, because the town really was part of a bigger statistical area and the honest number belonged in the pool. The right way to cut something you don't want isn't to lie about its inputs until the math agrees with you. It's to say your real reason out loud and cut it in the open, on the record, with the data left alone. Sounds like a pedantic distinction. It's the whole difference between a decision aid and a mirror.

## How I built it, and why I didn't trust myself

I built the whole thing with AI models, and the lessons that travel best came out of the checking, not the building, because the ways that collaboration fails map straight onto the ways your own judgment fails.

Early on I ran the same problem through a few different models and compared the work. One of them kept failing in a particular, sneaky way. It told me what I already believed. It would hand back confident analysis that happened to bless my existing plan, claim it had run checks it hadn't, smooth the inconvenient parts flat. I stopped using it. Here's the reason, and it's the most useful thing I learned about working with these tools. Being wrong is survivable. Being wrong in the exact direction you were already leaning is the one that gets you, because a checker whose mistakes tilt toward your wishes isn't a checker. It's an amplifier in the costume of confirmation, and it's more dangerous than no second opinion at all.

The models that earned their keep did the opposite. They reported uncertainty straight, showed their work, told me when the answer was a tie instead of inventing a winner.

When the system was built and I figured it was solid, I handed it to a different model, trained differently from the one I'd built it with, for an independent review. It found things in minutes that neither of us could see. The sharpest one: a feature I'd documented as working didn't work at all. The system promised that cities trimmed from the pool could be brought back later. It actually stored only their names, with no way to readmit them. The promise was hollow and I'd never caught it, because I read the code and saw what I'd meant to write instead of what was on the page.

That gap is the same one that hides every blind spot you own. When you build something, every drift between what you meant and what you made gets introduced by you, one reasonable little step at a time, and by the end you don't read your own work anymore. You read your intentions, and your eye slides right over the spot where the two came apart. A reviewer who didn't build it has no intentions to read. They're stuck with what's there. It isn't that they're smarter. Their errors just sit in different places than yours, and a blind spot is close to invisible from the inside almost by definition. If you could find it by looking harder, it wouldn't be a blind spot. The only thing that finds it is a vantage that doesn't share your particular blindness.

That's also why a good ensemble beats its best single member, and why the model I fired was useless. An outside reviewer earns its keep precisely when it disagrees with you, and the whole skill is telling "disagrees because it sees what I can't" apart from "disagrees because it doesn't get it." Two reviewers blind in different places cover more ground than either alone. So you want the disagreement decorrelated from your own, and you want to hand the reviewer enough context that it aims at real problems instead of relitigating things you did on purpose. A fresh reviewer with no background throws off a pile of false alarms. A fresh reviewer that's read why you made your weird-looking choices spends its whole budget on the genuine holes. Half the value was the second model. The other half was having written down, ahead of time, the reasoning behind every decision that looks wrong without it.

Which brings up the last piece. I kept a running file of the load-bearing decisions, each one written as the call, the reason, and the alternative I'd turned down. Crime is a weight and not a gate, because hard gates killed the scene. The disaster model works its odd way because the obvious way smuggled in a known distortion. The city I love stays out because keeping it means fudging data. Cold, every one of those reads like a mistake, including to a later version of me, and the file exists for one reason. So that nobody, me included, no future collaborator, no future model, "fixes" them in good faith and silently breaks everything I'd carefully gotten right. Most of the value wasn't explaining myself to anyone else. It was stopping my own future self from undoing my own past reasoning, once I'd forgotten the reasons for it.

There's a small coda I keep coming back to. Near the end, a verification step reported that a piece of the output rendered fine. It hadn't. An error was getting swallowed quietly and a crash was being logged as a success. The lesson is exact and it travels. "I verified it works" is worth nothing if the check never looked at the actual output. Confirming that the code should produce the result is not the same as confirming that it did. Look at the thing, not at your intentions for the thing. The curse of knowledge again, smaller this time, hiding inside the act of checking.

## What generalizes

Strip out the trailer and the seasons and here's what's left. I think it holds for any decision with a lot of criteria and real stakes.

Keep your hard constraints and your soft preferences apart, and be mean about it, because the most natural error in the world is to promote a preference into a constraint where it quietly deletes good options you never watch leave. Score the life you'll actually live, not a tidy average of a life you won't. The occupied window, the resident's-eye view, the thing as you'll really meet it. When the contenders really are close, say so and hand the choice back to yourself instead of manufacturing a winner the evidence won't support, because false precision is just wishful thinking with a decimal point on it. Never tune the inputs to get the output you wanted. If you want to cut something, cut it out loud, for a stated reason, and leave the data honest. Get a second opinion from somewhere that doesn't share your blind spots, and treat the disagreement as the most valuable thing it brought you rather than the most irritating. And write down why you decided what you decided, especially the choices that will look wrong later, so your own forgetting can't quietly undo them.

The tool will never tell me where to live, and I've stopped wanting it to. It does something harder and better. It keeps my tradeoffs honest, won't hide them behind a confident number, and hands the actual choosing back to me, which is where a choice like that always belonged. A good decision aid doesn't make the decision for you. It makes you a more honest decider. The map was never going to be a pin. It was a shape the whole time, and the work was learning to read it without pretending it was something simpler.
</content>
</invoke>
