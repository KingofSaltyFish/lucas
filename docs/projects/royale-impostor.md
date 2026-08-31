---
title: Royale Impostor
description: A browser-based social deduction game with private roles and multi-round voting.
outline: deep
---

<p class="project-kicker">Product Logic · State Management</p>

# Royale Impostor

> A pass-the-device social deduction game that turns familiar card knowledge into hidden roles, discussion, voting, and elimination.

<div class="project-links"><a href="https://github.com/KingofSaltyFish/Personal-HTML-Projects-Royale-Imposter">View source on GitHub ↗</a></div>

## Background and motivation

The project transforms an in-person party-game flow into a single browser page. The difficult part is controlling who can see which information and moving the group safely through setup, private reveals, timed discussion, voting, elimination, and restart.

## Player flow

1. Enter 3–15 player names.
2. Scale the number of impostors with group size.
3. Pass the device so each player privately reveals a role.
4. Discuss under a timer based on remaining players.
5. Vote without allowing self-votes.
6. Remove a player and evaluate the win condition.

## Tech stack

<ul class="tech-list"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>DOM state</li><li>Timers</li><li>Fisher–Yates shuffle</li></ul>

## Representative code: fair role assignment

The shuffle walks backward and swaps each position with a uniformly chosen earlier position. This avoids biased role assignment.

```js:line-numbers {1-6,10-17}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const roles = Array(playerCount).fill('innocent');
for (let i = 0; i < impostorCount; i++) roles[i] = 'impostor';
shuffleArray(roles);

assignments = roles.map(role =>
  role === 'innocent'
    ? { role, card: chosenCard }
    : { role, hint: hints[chosenCard] }
);
```

## Challenges and reflection

Private information makes state transitions consequential: one stale screen can reveal a role to the next player. The code resets the card before each reveal and reconstructs voting controls for every voter.

The single-file design made early iteration fast, but it now has a clear ceiling. If the game grows, separating state transitions from DOM rendering would make the rules easier to test.

## Accessibility and product improvements

The current interface validates player count and names. The next iteration should add keyboard focus states, reduced-motion support, color-independent role indicators, and a deployed demo link.

