---
title: "Arch Linux: Cleanup"
date: 2023-05-25
---
## Clean pkg cache
List packages
```bash
ls /var/cache/pacman/pkg/ | less 
```
Remove all pkg except those installed
```bash
sudo pacman -Sc 
```
Remove all files
```bash
sudo pacman -Scc
```
Or with yay
```bash
yay -Scc
```

---

## Remove unused packages
List unused
```bash
pacman -Qtdq
```

Remove unused
```bash
sudo pacman -R $(pacman -Qtdq)
```

---

## Journal logs
```bash
sudo journalctl --vacuum-time=2d
```
- This will remove log older than 2 days, you can change accordingly.
- Clear journal log older than x day/month/year

```bash
sudo journalctl --vacuum-size=100M
```
- Restrict logs to a certain size

---

## Clean home cache
cache is located in `~/.cache `





