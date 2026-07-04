---
author: "Charles Hood"
pubDatetime: 2025-08-18T01:00:00.000Z
title: "Two Hours of FFmpeg vs Three Minutes of Adobe"
description: "Two hours of FFmpeg wizardry couldn't fix what Adobe Podcast Enhance solved in three minutes. Sometimes the best tool isn't the one you know best."
draft: false
tags:
  - "Audio Production"
  - "Technology"
  - "Adobe"
  - "Church Tech"
  - "Problem Solving"
coverImage:
  src: "/blog-images/audio-troubleshooting/media/audio-trouble-adobe-rescue.jpg"
  alt: "Adobe Podcast Enhance rescuing terrible lavalier mic audio"
---

<img src="/blog-images/audio-troubleshooting/media/audio-trouble-adobe-rescue.jpg" alt="Adobe Podcast Enhance rescuing terrible lavalier mic audio" style="float: right; margin: 0 0 20px 20px; width: 250px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" class="audio-trouble-img">

<style>
@media (max-width: 768px) {
  .audio-trouble-img {
    width: 150px !important;
    height: auto !important;
    margin: 0 0 15px 15px !important;
  }
}
</style>

You know that sinking feeling when you're handed the audio from an important event and it sounds like someone recorded it while wrestling with a paper bag? That was me today. Two video recordings of this morning's church sermon, and both had this persistent, maddening scratchy sound. The lavalier mic had been rubbing against the speaker's clothing the entire time.

I've been doing tech work for our church for years now, and usually I can fix these things. This time though... this time was different.

## The Problem Child

So here's what I was dealing with. The first recording was our direct capture from the sermon. Good video quality, but the audio? Every time the speaker moved, breathed, or basically existed, you'd hear this scratchy, rustling noise. Like someone was crumpling tissue paper directly into the microphone. For over half an hour straight.

The second recording was a Facebook video download of the same event. I thought maybe, just maybe, Facebook's compression might have accidentally helped somehow. Nope. Same terrible audio, just compressed differently. If anything, it was worse because now the scratching had that distinctive Facebook audio mushiness on top of it.

## Down the FFmpeg Rabbit Hole

Now, I consider myself pretty handy with [FFmpeg](https://ffmpeg.org/). It's been my go-to for years when I need to fix audio or video issues. Free, powerful, runs on anything. So I started with what usually works.

First attempt was the noise reduction filter, afftdn. I ran it with default settings. Then with aggressive settings. Then with settings so aggressive I was basically telling it to remove everything that wasn't pure human speech. The scratching laughed at me and stayed right where it was.

Next came the frequency filters. I figured the clothing rustle had to be in certain frequency ranges, right? So I applied high-pass filters to cut the low rumble. Low-pass filters to cut the high-frequency scratching. Then I started getting fancy with EQ adjustments, trying to boost the speech frequencies while cutting everything else. Hours of this. Literally hours.

I tried compression. I tried loudness normalization. I combined filters into increasingly complex chains that looked like something out of an audio engineering textbook. At one point, I even had this brilliant idea to combine both audio sources, thinking maybe the noise patterns would be different enough that they'd cancel each other out. (Spoiler: they didn't. It just got louder.)

The worst part? Each attempt took time to process. Render the audio, listen to it, realize it still sounded terrible, adjust the parameters, try again. And again. And again.

## The Solution That Made Me Feel Stupid and Grateful

After about two hours of this, I finally remembered something. I'd seen Adobe mentioned somewhere as having launched something called [Adobe Podcast Enhance](https://podcast.adobe.com/enhance). I'd never tried it, but at this point, I was desperate enough to try anything.

The process was almost insultingly simple. Upload the file. It asks you one question: how much of your audio is speech versus background. I went with the default 90% speech, 10% background. Then I clicked enhance.

That's it. That's all I did.

Three minutes later, I had my processed file. And it was perfect. Not "good enough" or "better than before." Perfect. The clothing rustle was gone. Completely gone. The speaker's voice was clear, warm, natural. It sounded like he'd been recorded in a professional studio.

I actually sat there for a minute just staring at my screen. Two hours with FFmpeg, trying every trick I knew, and Adobe's tool fixed it in three minutes with one button click.

## The Part Where I Eat Humble Pie

Look, I love open-source tools. I love the command line. There's something satisfying about crafting the perfect FFmpeg command that does exactly what you need. But sometimes you have to admit that specialized tools built for specific problems just work better.

Adobe Podcast Enhance costs $9.99 a month. They've got a 30-day free trial, which is what I used initially. But after seeing what it could do, I kept the subscription. Because let's be honest, this won't be the last time someone hands me audio from a lavalier mic that sounds like it was attached to someone wrestling with a bag of potato chips for 30 minutes.

## What I Learned (Besides Checking My Ego)

The thing that really gets me is how much time I wasted. I kept thinking I was one parameter tweak away from fixing it. One more filter combination. One more attempt. Meanwhile, there was a tool designed specifically for this exact problem, just waiting for me to use it.

Adobe's "Enhance Speech v2" algorithm was trained on thousands of hours of podcast audio with these exact issues - lavalier mics rubbing on clothing, room echo, background noise, all of it. But here's what impressed me most: the final audio didn't sound processed or artificial. It sounded like what the original recording should have been if we'd set up the mic properly in the first place.

If you're dealing with bad audio from lavalier mics, clothing rustle, room echo, or just generally poor recording conditions, stop doing what I did. Don't spend hours with command-line tools trying to be clever. Just upload it to Adobe Podcast Enhance and get on with your life.

Trust me. Your Sunday afternoon will thank you.

## The Technical Details (For My Fellow Nerds)

For those curious about what I tried with FFmpeg before admitting defeat, here's a sample of one of my "simpler" attempts:

```
ffmpeg -i input.mp4 -af "highpass=f=80,lowpass=f=8000,afftdn=nf=-20,compand=attacks=0:points=-30/-900|-20/-20|0/0|20/20,loudnorm=I=-16:TP=-1.5:LRA=11" output.mp4
```

And that was one of the basic ones. By the end, I had filter chains that were three times longer. None of them worked.

Adobe Podcast Enhance? Upload. Click. Done.

Sometimes it's okay to let the robots win. 🤖

---

*P.S. - For those curious, I help out at [Ebenezer Methodist Church](https://ebzchurch.org) in Milton with their website and IT needs. I should mention that our A/V booth volunteers do an amazing job week after week - what they produce is normally flawless. This was just a one-off issue with a lapel mic placement, not anything they did wrong. These things happen, and now we have a great solution when they do.*