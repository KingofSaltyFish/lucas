---
title: Block Clash
description: A browser physics game developed through focused, visible iterations.
outline: deep
---

<p class="project-kicker">Physics Simulation · Iterative Design</p>

# Block Clash

> Two players choose direction and power, then watch momentum, friction, collision, rotation, and a shrinking arena decide the round.

<div class="project-links"><a href="https://github.com/KingofSaltyFish/Personal-HTML-Projects-Block-Clash">View source on GitHub ↗</a></div>

## Background and motivation

Block Clash explores how a small set of physical rules can create strategic play. The repository records focused upgrades: more realistic collision response, a shrinking boundary, rotational motion, and clearer aiming feedback.

That history shows an engineering habit: isolate one behavior, revise it, and preserve evidence of the change.

## Tech stack

<ul class="tech-list"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Canvas 2D</li><li>Vector math</li><li>Collision response</li></ul>

## Core physics loop

Velocity moves each player; friction removes energy over time; angular velocity rotates the block. Tiny values are snapped to zero so a round can reliably end.

```js:line-numbers {4-8,10-13}
function updatePhysics() {
  let stillMoving = false;
  for (const player of players) {
    player.x += player.vx;
    player.y += player.vy;
    player.vx *= friction;
    player.vy *= friction;

    player.rotation += player.angularVelocity;
    player.angularVelocity *= 0.978;

    if (Math.abs(player.vx) < stopSpeed) player.vx = 0;
    if (Math.abs(player.vy) < stopSpeed) player.vy = 0;
    if (Math.abs(player.angularVelocity) < 0.002) player.angularVelocity = 0;
    if (player.vx || player.vy || player.angularVelocity) stillMoving = true;
  }
}
```

## Challenges and reflection

“Looks physical” and “is numerically stable” are different goals. Collision bounce, friction, spin decay, power scaling, and the stopping threshold must work together. If friction is too strong, movement feels unresponsive; if the threshold is too small, the round never ends.

The versioned enhancement files show how tuning became part of the design process. A strong next step is to publish a parameter table and explain how play-testing changed each constant.

## Development evidence

- Version 1.0 and 2.0 baselines
- A dedicated collision-dynamics fix
- A shrinking-border mechanic
- Rotation based on collision behavior
- A pre-launch aiming indicator

