---
title: Showdown Arena
description: An evolving two-player browser fighting game built with HTML, CSS, and JavaScript.
outline: deep
---

<p class="project-kicker">Game Engineering · Systems Design</p>

# Showdown Arena

> A local two-player platform fighter that grew across four versions from basic movement into a character-driven combat system.

<div class="project-links"><a href="https://github.com/KingofSaltyFish/Showdown-Arena">View source on GitHub ↗</a></div>

## Live demo

This demo assembles the stable version 3.0 directly from its HTML, CSS, and JavaScript files in the GitHub repository. Click inside the game before using the two-player keyboard controls. Version 4.0 remains documented below, but its repository script is currently incomplete.

<DemoFrame
  title="Showdown Arena 3.0"
  html="https://raw.githubusercontent.com/KingofSaltyFish/Showdown-Arena/main/Showdown%20Arena%203.0%20-%20HTML%20Portion"
  css="https://raw.githubusercontent.com/KingofSaltyFish/Showdown-Arena/main/Showdown%20Arena%203.0%20-%20CSS%20Portion"
  js="https://raw.githubusercontent.com/KingofSaltyFish/Showdown-Arena/main/Showdown%20Arena%203.0%20-%20JavaScript%20Portion"
  :height="720"
/>

## Background and motivation

Showdown Arena is an exercise in managing interacting systems: gravity, platforms, attacks, health, cooldowns, character abilities, and player input must all agree on what happens in the same animation frame.

Keeping versions 1.0 through 4.0 visible makes the development path part of the evidence. The later version adds procedural platforms and multiple character-specific systems rather than hiding the learning process behind one final file.

## What the player experiences

- Two-player local keyboard controls
- Jumping, movement, attacks, gravity, and platform collision
- Per-body-part health and character-specific durability
- Abilities, ammunition, reloads, shields, traps, and cooldowns
- Procedurally placed platforms with a safe fallback layout

## Tech stack

<ul class="tech-list"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Game loop</li><li>Collision systems</li></ul>

## Representative code: procedural stage generation

The generator rejects platforms that are too close and stops after a fixed number of attempts. A deterministic fallback prevents random placement from hanging the game.

```js:line-numbers {6-13,18-25}
function generatePlatforms() {
  const nextPlatforms = [];
  const targetCount = 3;
  let attempts = 0;

  while (nextPlatforms.length < targetCount && attempts < 120) {
    attempts += 1;
    const width = Math.round(randomBetween(135, 205));
    const candidate = {
      x: Math.round(randomBetween(80, GAME_WIDTH - width - 80)),
      y: Math.round(randomBetween(groundY - 185, groundY - 70)),
      width, height: 16
    };
    const overlaps = nextPlatforms.some(platform =>
      candidate.x < platform.x + platform.width + 55 &&
      candidate.x + candidate.width + 55 > platform.x &&
      candidate.y < platform.y + platform.height + 34 &&
      candidate.y + candidate.height + 34 > platform.y
    );
    if (!overlaps) nextPlatforms.push(candidate);
  }

  while (nextPlatforms.length < targetCount) {
    const i = nextPlatforms.length;
    nextPlatforms.push({ x: 150 + i * 240, y: groundY - 80 - i * 45,
      width: 150, height: 16 });
  }
  platforms = nextPlatforms;
}
```

## Challenges and reflection

The central challenge is complexity growth. Adding one ability can affect movement, rendering, damage, reset logic, and cooldown UI. The project shows why game state must be explicit and why every mechanic needs a reliable reset path.

The next improvement is to package version 4.0 as a standard runnable site and add a short gameplay recording so reviewers can try it immediately.
