# Click the Fox! Game

A fun and interactive game where players try to click on the fox among a grid of dog images within a limited time. The game tracks the player’s score and time left, and saves the score locally.

## Introduction

Gameplay

- The player is presented with a 3x3 grid of images, mostly dogs and one fox.
- The goal is to click on the fox image as quickly and as many times as possible before time runs out.
- Each correct click on the fox increases the score; clicking a dog decreases the score.
- The game runs for a fixed time period.
- The final score, along with player’s name and date, is saved locally and can be reviewed on a scores page.

## Features

- Dynamic image loading and preloading for smooth gameplay.
- Score and countdown timer display.
- Name input before starting the game.
- Local storage of scores with date and player names.

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Vitest and React Testing Library for testing
- Browser LocalStorage for saving scores

## Setup and Installation

Step-by-step instructions to set up the project locally:

1. Install dependencies:

   npm install

2. Start the development server:

   npm run dev

3. Open the application in your browser:

   http://localhost:5173/

## Testing

1. Run the tests:

   npm run test

2. Tests cover hooks, components like Loading, ScoreBoard, Welcome, and integration flows.
