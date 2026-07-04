---
author: "Charles Hood"
pubDatetime: 2025-08-15T01:00:00.000Z
title: "Understanding How AI Actually Works: A Deep Dive into Large Language Models"
description: "A comprehensive breakdown of Andrej Karpathy's 3.5-hour masterclass on how LLMs are trained, why they hallucinate, and what's really happening when you chat with AI"
draft: false
tags:
  - "AI"
  - "Machine Learning"
  - "Technology"
  - "Deep Learning"
  - "LLMs"
  - "ChatGPT"
---

If you've ever wondered what's really happening when you type a question into ChatGPT and watch it generate a response, you're not alone. The process behind these AI systems is both more straightforward and more complex than most people realize. Earlier this year, [Andrej Karpathy](https://x.com/karpathy) (former Tesla AI director and OpenAI founding member) released what might be the most comprehensive explanation of how large language models actually work.

His [3.5-hour video walkthrough](https://youtu.be/7xTGNNLPyMI?si=By_g9PKcSvJXa10q) is genuinely worth watching in full. But I know that's a big time commitment, so I wanted to break down the key insights that completely changed how I think about these tools.

<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/7xTGNNLPyMI" 
    title="How Large Language Models Work by Andrej Karpathy"
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</div>

<style>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin: 2rem 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .video-container {
    margin: 1.5rem 0;
  }
}
</style>

## It All Starts with the Internet (But Not How You Think)

The journey of creating something like ChatGPT begins with a massive data collection effort. Companies essentially download and filter the internet, but here's the thing that blew my mind: they compress petabytes down to just tens of terabytes of text. The FineWeb dataset that Karpathy references contains 15 trillion tokens in only 44 terabytes. That could almost fit on a single hard drive today.

This isn't random internet scraping either. The filtering is aggressive. They remove malware sites, spam, adult content, and personally identifiable information. They extract just the text from HTML, leaving behind all the markup and navigation. What remains is surprisingly small, considering it represents much of human knowledge online.

## The Token Problem Nobody Talks About

Here's something I never understood until watching this video: LLMs don't see letters or words the way we do. They see "tokens," which are chunks of text that might be a whole word, part of a word, or multiple words squeezed together.

This explains so much. Remember when models couldn't count the R's in "strawberry"? Or when they'd fail at simple spelling tasks? It's because the model might see "strawberry" as two tokens: "straw" and "berry". It literally can't see the individual letters without using special tools. This isn't a bug. It's fundamental to how these systems work.

## The Three-Stage Training Process

What fascinated me most was learning that training happens in three distinct stages, each handled by different teams at companies like OpenAI:

### Stage 1: Pre-training (The Knowledge Download)

This is where the model learns from those filtered internet documents. It's trained to predict the next token in a sequence, basically an incredibly sophisticated autocomplete. This stage takes months on thousands of GPUs and costs millions of dollars. The result? A "base model" that's essentially an internet text simulator. It has vast knowledge but no idea how to be helpful.

### Stage 2: Supervised Fine-Tuning (Learning to Be an Assistant)

Remember, the base model just generates random internet-style text. To make it useful, companies hire human labelers who create hundreds of thousands of "ideal" conversations. These labelers follow detailed guidelines (sometimes over 100 pages long) about how the perfect AI assistant should respond.

And here's the key insight: when you chat with ChatGPT, you're not talking to some mystical AI consciousness. You're getting a statistical simulation of an OpenAI data labeler following their company guidelines. That's both less magical and more impressive than I expected.

### Stage 3: Reinforcement Learning (Learning to Think)

This is where things get really interesting. Newer reasoning models go through an additional stage where they practice solving problems thousands of times, learning what works for their specific "cognition."

The model tries many solutions, sees which ones succeed, and reinforces those patterns. Through this process, something remarkable emerges: the models develop internal "chains of thought." They learn to check their work, try multiple approaches, backtrack when needed. They develop what Karpathy calls "cognitive strategies."

## Why Models Hallucinate (And Why They Always Will)

One of the most valuable parts of the video explains hallucinations. The problem is baked into how these models are trained. During fine-tuning, when a human labeler sees "Who is Tom Cruise?" they confidently write about the famous actor. When they see "Who is Genghis Khan?" they confidently write about the historical figure.

The model learns this pattern: always respond confidently to "Who is X?" questions. So when you ask about someone who doesn't exist, the model doesn't say "I don't know." It confidently makes something up, because that's the pattern it learned.

Companies now try to fix this by deliberately teaching models to say "I don't know" when uncertain, and by adding web search capabilities. But the fundamental issue remains. As Karpathy puts it, knowledge in the parameters is like a "vague recollection," while information in the context window is like "working memory."

## The Swiss Cheese Problem

Perhaps the most frustrating aspect of LLMs is what Karpathy calls their Swiss cheese capabilities. They can solve PhD-level physics problems but struggle to tell you that 9.11 is smaller than 9.9. They can write sophisticated code but can't count letters in a word.

Why? Because each token generation involves a fixed amount of computation. The model cannot "think harder" about difficult problems within a single token. It has to spread its reasoning across many tokens. Ask it to answer immediately, and it fails. Give it space to work through the problem step by step, and it succeeds.

This is why you should always ask models to "show their work" or "think step by step." You're not being polite. You're giving the model the computational space it needs to actually solve the problem.

## The Thinking Revolution

The newest development (and probably the most exciting) is the emergence of "thinking" models trained with reinforcement learning. Models like DeepSeek-R1 and OpenAI's o-series actually develop novel problem-solving strategies through trial and error.

Watching these models work is kind of fascinating. They'll solve a problem, then suddenly write something like "Wait, let me check this again" or "Actually, I just realized..." These aren't programmed responses. They emerged from the training process as effective cognitive strategies.

This is where it gets wild. Just as DeepMind's AlphaGo discovered moves no human would play, these language models might discover reasoning strategies no human would think of. We're seeing the very beginnings of AI that could potentially think in ways that transcend human cognitive patterns.

## What This Means for Using These Tools

After understanding how these systems actually work, my approach to using them has completely changed:

1. **Never trust without verification.** These aren't databases or search engines. They're statistical pattern matchers with imperfect recall.

2. **Provide context explicitly.** Instead of asking about a book, paste in the relevant chapter. The model's "working memory" (context window) is far more reliable than its "long-term memory" (parameters).

3. **Use tools whenever possible.** If there's math involved, ask for code. If you need current information, request web search. Don't rely on the model's "mental arithmetic."

4. **Choose the right model.** Use standard models for general tasks and quick responses, but switch to reasoning/thinking models for complex problems requiring step-by-step analysis. As models evolve rapidly (GPT-5 launched in August 2025), focus on understanding the distinction between fast-response models and deeper reasoning models rather than specific version numbers.

5. **Spread out the thinking.** Never ask for immediate answers to complex problems. Always request step-by-step reasoning.

## The Bottom Line

These models are simultaneously more mechanical and more remarkable than most people realize. They're not conscious beings with knowledge. They're sophisticated pattern-matching systems that simulate human responses. But through that simulation, especially with reinforcement learning, they're beginning to exhibit genuinely novel problem-solving capabilities.

Understanding their true nature helps us use them far more effectively. They're tools, not oracles. Incredibly powerful tools that can dramatically accelerate human work, but tools that require understanding and oversight.

I really can't recommend Karpathy's [full video](https://youtu.be/7xTGNNLPyMI?si=By_g9PKcSvJXa10q) enough. This article captures the highlights, but his explanations, live demonstrations, and technical deep-dives provide a level of understanding that's hard to convey in text. If you work with these tools regularly (and increasingly, who doesn't?) those three and a half hours might be the best investment you make in understanding the technology that's reshaping our world.

Because once you understand what's actually happening inside that text box, you'll never look at AI the same way again. And you'll know how to use it in ways that actually work.

---

**P.S.** Quick note on timing: This video is from February 2025, which means it's about six months old as I write this. In AI terms, that's... well, it's a lot. The foundational concepts about how LLMs are trained remain rock solid and essential to understand. But the video doesn't cover some newer developments like RAG (Retrieval-Augmented Generation), the current shift toward agentic behaviors where AI systems can take actions and use tools more autonomously, or models released since then. Still, from a foundational perspective, this remains the best explanation of how these systems actually work under the hood. Watch it for the fundamentals, then catch up on the latest developments. You'll understand them much better with this grounding.

**Credit:** This article is based entirely on Andrej Karpathy's exceptional ["How Large Language Models Work"](https://youtu.be/7xTGNNLPyMI) lecture. All the core insights come from his presentation - I've simply attempted to distill his 3.5 hours of wisdom into a readable summary. Any errors in interpretation are mine alone.