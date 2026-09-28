# Coding with AI: Starter Project

This is the starter project for the Coding with AI tutorial at Macalester.
In about two hours, you'll build a small project with Claude Code.
You don't need an idea yet. Claude will help you find one.

## My project

**Zoom Out** is a small photo-guessing game for your phone.

Each photo starts extremely zoomed in. Type what you think it is.
Every wrong guess zooms the photo out a little. You have 5 tries per photo.
Your score depends on how few zoom-outs you needed and how fast you were.
A game is 5 photos.

Built with Expo (React Native + TypeScript) and a clean, minimalist design.

**Run it:**

1. Install **Expo Go** on your phone (Play Store or App Store).
2. In a terminal:
   ```
   cd zoom-out
   npm install
   npx expo start
   ```
3. Scan the QR code with Expo Go.
   If your wifi blocks it, try `npx expo start --tunnel`.

## Before you start

You need:

- Access to Claude. Accept the email invite from us before you start.
- A GitHub account.
- [VS Code](https://code.visualstudio.com/) and [GitHub Desktop]([https://git-scm.com/downloads](https://desktop.github.com/download/) on your laptop.

## Set up

1. Fork this repo. Click **Fork** at the top right of this page.
2. Clone this repo in GitHub desktop.
3. Open the repo in VS Code.
4. TOpen a terminal: **Terminal > New Terminal**.
5. Install Claude Code. You only do this once.
   - Mac or Linux: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows: `irm https://claude.ai/install.ps1 | iex`
6. Start up claude: `claude`

Stuck? Ask an instructor, or see the [setup guide](https://code.claude.com/docs/en/setup).

## Build your project

Say hi to Claude. It will walk you through four steps:

1. **Brainstorm** an idea that fits in two hours.
2. **Plan** it. Claude will ask you to turn on plan mode with **Shift+Tab**.
   Then it will ask you a few questions.
3. **Describe and sketch** it. Claude writes a short description under "My project" above.
   It also sets up a skeleton of your project. Then it helps you commit both.
4. **Build** it in small steps. Commit each time something works.

Press **Esc** to stop Claude at any time.

## Change Claude's personality

Claude talks like a pirate. Why? Open `CLAUDE.md` to find out.
Claude reads that file at the start of every session.

Once you get going, rewrite the "Personality" section of `CLAUDE.md`.
Then type `/exit` and run `claude` again to meet your new Claude.
