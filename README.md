# Senior Assassins
Contributers: Alex Yang and Yaseen Halabi
## Overview
- This is a simple, clean full-stack web application to facilitate Senior Assassins, an irl last man standing game.
- A demo is live at https://aletya.github.io/SeniorAssassinsFullstack/.
- The static frontend interacts with our Node.js server through API calls to modify database values.
## Motivation
Previously, our highschool had used manual methods, marking changes in the game state by hand, but we thought that it would be much simpler to have a computer do all the heavy lifting.
## Game rules
- Each round, each player is assigned a target to kill (1 shot with a nerf gun).
- You may get kills by killing your target, or killing your assassin.
- After killing your target, you're assigned their target.
- If your target is killed in self-defense by their target, you're assined their target.
- Most kills wins $250. Last person standing wins $250.
- Hermit rule: If your target kills their target, but you don't get any kills by the end of the round, you're considered inactive and are eliminated.
## Process
Although we had learned to code programs to do tasks locally, we hadn't worked with web applications before. After a few days of research, we decided to implement a **RESTful API** using javascript on both frontend and backend, as well as use **MongoDB** for cloud data storage. We used the **ReactJS**, **Node.js**, **Express.js**, and **Mongoose** framework/libraries, as well as **HTML** and **CSS**. From there, we started with the basics— storing players, and steadily built up capabilities from there. We managed to implement
- full round automation
- email notifications
- kill submissions
- new player signup
- a clean UI
- a dynamic leaderboard
- hidden admin controls
