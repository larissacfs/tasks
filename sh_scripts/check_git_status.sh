#!/bin/bash

git_status=$(git status --porcelain)

echo ""
echo "============================================================ "
git status
echo "============================================================"
echo ""

if [ -n "$git_status" ]; then
    echo "ERROR! There are changes in the working directory. Take a look in your local branch!"
    exit 1
else
    echo "Success! No changes in the working directory"
    exit 0
fi