# DevSkiller Tasks Playwright project

This is an testing automation project for DevSkiller Tasks 1, 2 and 3.


## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)

## Introduction

This is an testing automation project for the DevSkiller tasks 1, 2 and 3. 
It contains a PDF file named TASK 1.pdf for the manual exploratory task, the task2.spec.ts Playwright test file for the Task 2 (automation testing task), and the task3.yml file for the task 3 (pipeline for task 2).
File structure:
```bash
.github
    workflows
        task3.yml
tests
    task2.spec.ts
task1.pdf
```
This project also contains es-lint, prettier and husky.

## Installation

Detailed instructions on how to install and set up the project locally. This can include:
```bash
# Clone the repository
git clone https://github.com/larissacfs/tasks.git

# Navigate into the directory
cd repository-name

# Install Yarn
npm install -g yarn

# Install dependencies 
yarn install

# Init Husky
npx husky-init

# Erase any auto changes that it may create to have a clean Husky instance:
git checkout .

# Then you can run this command to replace the git commit hook:
git add .husky/pre-commit
```

## Usage

- Manual compilers run:

```bash
# TypeScript compiler
yarn compile

# ESLint + Prettier auto fixes
yarn lint:fix
```
Whenever you make a commit, husky will run these two commands for you. Any fixes need to be added to the current commit (using git commit --amend --no-edit).

- How to run the tests in all browsers 

```bash
yarn playwright test 
```

- To run in a specific browser add --project=project-name (where project-name can be chromium, firefox or webkit), for example:
```bash
yarn playwright test --project=chromium
```

- How to run the tests in the pipeline

