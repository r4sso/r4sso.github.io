---
title: "Git"
date: 2023-07-12T02:11:13Z
lastmod: 2023-07-12T08:46:00Z
---
## Create a new repository on the command line
```bash
echo "# Something" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[username]/[repo].git
git push -u origin main
```

## Push an existing repository from the command line
```bash
git remote add origin https://github.com/[username]/[repo].git
git branch -M main
git push -u origin main
```

## Common Problem
Notes to troubleshoot

### Contributions not showing on profile
Make sure your config is match
Email:
```bash
git config --global user.email
```
Name:
```bash
git config --global user.name
```
