
```
git config user.signingkey

- GPG Key 1  
  - Email: rahulshinde2577@gmail.com  
  - Key ID: BA9A8B20F3DC84AA

- GPG Key 2  
  - Email: rshinde64470@gmail.com  
  - Key ID: 0EDFECBA
---

git remote add origin git@github-bot:Rahul-bot-star-sudo/REPO_NAME.git

1️⃣ Primary Account — rahul-mohan-shinde
git@github-main:rahul-mohan-shinde/REPO_NAME.git

✅ 2️⃣ Second Account — Rahul-bot-star-sudo
git@github-bot:Rahul-bot-star-sudo/REPO_NAME.git
```
---

# 🧾 Git + SSH Commands Summary (Complete List)

| **Command**                     | **Use (Kya kaam karta hai)**                          |
| ------------------------------- | ----------------------------------------------------- |
| `git init`                      | Folder ko Git repository banata hai                   |
| `git status`                    | Current file status dikhata hai (tracked / untracked) |
| `git add .`                     | Saari files staging area me daalta hai                |
| `git commit -m "msg"`           | Staged changes ko commit karta hai                    |
| `git branch -M main`            | Branch ka naam `main` set karta hai                   |
| `git remote add origin URL`     | GitHub repo ko local project se connect karta hai     |
| `git remote -v`                 | Current remote URL check karta hai                    |
| `git remote set-url origin URL` | Existing remote URL change karta hai                  |
| `git push -u origin main`       | Code GitHub pe push karta hai                         |
| `git push`                      | Next pushes ke liye shortcut                          |
| `git pull`                      | GitHub se latest code local me lata hai               |

---

# 🔐 SSH Key Related Commands

| **Command**                        | **Use (Kya kaam karta hai)**                 |
| ---------------------------------- | -------------------------------------------- |
| `ssh-keygen -t ed25519 -C "email"` | New SSH key generate karta hai               |
| `ssh-add ~/.ssh/id_ed25519`        | SSH key ko agent me add karta hai            |
| `ssh-add ~/.ssh/id_ed25519_bot`    | Second account ki SSH key add karta hai      |
| `type ~/.ssh/id_ed25519.pub`       | Public SSH key dikhata hai (GitHub ke liye)  |
| 'type C:\Users\rahul\.ssh\config'  | see all your ssh accounts                    |
| `ssh -T git@github.com`            | SSH authentication test karta hai            |
| `ssh -T github-main`               | Primary account ka SSH test                  |
| `ssh -T github-bot`                | Second account ka SSH test                   |
| `ssh -vvv git@github.com`          | SSH debug mode (problem trace karne ke liye) |

---

# ⚙️ Windows / System Commands

| **Command**               | **Use (Kya kaam karta hai)**              |
| ------------------------- | ----------------------------------------- |
| `Start-Service ssh-agent` | SSH agent service start karta hai         |
| `Stop-Service ssh-agent`  | SSH agent stop karta hai                  |
| `services.msc`            | Windows services open karta hai           |
| `dir ~/.ssh`              | SSH folder ke files dikhata hai           |
| `ren config.txt config`   | SSH config file ka naam correct karta hai |
| `notepad ~/.ssh/config`   | SSH config file open/edit karta hai       |

---

# 🔁 Multi-Account SSH Configuration Commands

| **Command**                     | **Use (Kya kaam karta hai)**                       |
| ------------------------------- | -------------------------------------------------- |
| `git@github-main:USER/REPO.git` | Primary GitHub account ka SSH URL                  |
| `git@github-bot:USER/REPO.git`  | Second GitHub account ka SSH URL                   |
| `ssh -T github-main`            | Check karta hai primary account active hai ya nahi |
| `ssh -T github-bot`             | Check karta hai second account active hai ya nahi  |

---

# 🧠 ONE-LINE SUMMARY (Yaad rakhne ke liye)

> **Git push command same rehti hai,
> account decide hota hai SSH key + remote URL se.**

---
