# Agent Instructions for Project Setup

This document serves as a guide for an AI agent to set up a new project using this template. Follow these steps sequentially.

## 1. Environment Setup
- [ ] Run `npm install` to install all necessary dependencies.
- [ ] Check for any outdated packages and suggested updates that are safe to apply.

## 2. Project Customization
- [ ] **Ask the User**: "What would you like to name this project?"
- [ ] **Wait for User Input**.
- [ ] Once the name is provided (e.g., "my-awesome-app"):
    - [ ] Update `package.json`: Change the `name` field to the user-provided name.
    - [ ] Rename the local root directory of this project to the user-provided name. **Note**: Be careful when renaming the directory you are currently operating in.

## 3. Git Initialization & GitHub Push
- [ ] Remove the existing `.git` directory to detach from the template repository template: `rm -rf .git`
- [ ] Initialize a new git repository: `git init`
- [ ] Create a "Initial commit": `git add .` and `git commit -m "Initial commit"`
- [ ] **Ask the User**: "I am ready to push this code to GitHub. Please create a new empty repository on your GitHub and paste the repository URL here (e.g., https://github.com/username/my-awesome-app.git)."
- [ ] **Wait for User Input**.
- [ ] Add the remote origin: `git remote add origin <USER_PROVIDED_URL>`
- [ ] Push to the main branch: `git push -u origin main`

## 4. Finalize Documentation
- [ ] Once the setup is complete and the code is safely on GitHub, **overwrite this file (`agent.md`)** with the standard "How to use AGENTS.md" template below to prepare the repo for future development.

---

# START OF AGENTS.md TEMPLATE (Overwrite agent.md with ONLY the content below this line)

# AGENTS.md

This file is a guide for AI agents working on this project.

## 1. Project Overview
[Provide a brief description of what this project does here. Agents should fill this in or ask the user.]

## 2. Build and Test Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## 3. Code Style Guidelines
- Use **TypeScript** for all logic.
- Use **Tailwind CSS** for styling.
- Follow the existing folder structure in `src/`.
- Ensure components are small and reusable.

## 4. Testing Instructions
[Add details about how to run tests if applicable, e.g., `npm test`]

## 5. Security Considerations
- Do not commit `.env` files.
- Ensure all API keys are loaded from environment variables.

## 6. Commit Messages
- Use clear and concise commit messages.
- Format: `type(scope): subject` (optional but recommended).

---
**Note to Agent**: After replacing the content, delete these instructions and the setup steps above, leaving only the "AGENTS.md" content.
