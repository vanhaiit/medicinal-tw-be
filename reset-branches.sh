#!/bin/bash

# Fetch the latest changes from the remote repository
git fetch origin

# Iterate over all remote branches
for branch in $(git branch -r | grep -v '\->'); do
    # Check out the branch locally and reset it to match the remote branch
    git checkout --track ${branch#origin/} && git reset --hard origin/${branch#origin/}
done
