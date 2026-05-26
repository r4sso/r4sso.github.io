---
title: "Authenticate GitHub Using SSH to Push Code"
date: 2026-05-26
#lastmod: 2026-04-06T10:08:00Z
summary: "Notes on setting up SSH keys for secure, passwordless Git pushes to GitHub."
categories: ["Guides", "Notes"]
tags: ["Git", "GitHub"]
featured: false
---

## Generate an SSH Key
Make sure the `openssh` package is installed. 

If you don't already have an SSH key, generate a new one using the secure Ed25519 algorithm:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
When prompted to "Enter a file in which to save the key," press Enter to accept the default location (`~/.ssh/id_ed25519`). You can also choose to add a passphrase for an extra layer of security.

## Add Public Key to GitHub
Copy the public key generated earlier (the file ending with `.pub`).
```bash
cat ~/.ssh/id_ed25519.pub 
```
1. Go to [github.com](https://github.com) and log in.

2. In the upper-right corner of any page, click your profile photo, then click **Settings**.

3. In the left sidebar, click **SSH and GPG keys**.

4. Click the **New SSH key** button.

5. In the **Title** field, add a descriptive label for the new key (e.g., "Work Thinkpad").

6. Select **Authentication Key** as the key type.

7. Paste your **public key** into the **Key field**. 

8. Click **Add SSH key**.

## Test the Connection

To ensure everything is configured correctly, test your connection to GitHub:

```Bash
ssh -T git@github.com
```

You should then receive a successful authentication message:
```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```

## Pushing Code
On your Git repository directory, check your current remote URL:
```bash
git remote -v
```

It will probably show in HTTPS format:
```
origin  https://github.com/your_username/your_repo.git (fetch)
origin  https://github.com/your_username/your_repo.git (push)
```

Change it to SSH:
```bash
git remote set-url origin git@github.com:your_username/your_repo.git
```
Verify the change, now it is ready to use:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

## References
- [Connecting to GitHub with SSH - docs.github.com](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Switching remote URLs from SSH to HTTPS - docs.github.com](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories#switching-remote-urls-from-ssh-to-https)
