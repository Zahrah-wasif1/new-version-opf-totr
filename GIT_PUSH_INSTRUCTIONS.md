# Git Push Instructions

## Step 1: Install Git (if not installed)

1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/PowerShell after installation

## Step 2: Configure Git (First time only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

Open PowerShell in your project directory and run:

```bash
# Navigate to project directory
cd "C:\Users\123\Downloads\udevs car rental project\udevs car rental project\track_ontrack_rental"

# Initialize git (if not already initialized)
git init

# Add remote repository
git remote add origin https://github.com/Zahrah-wasif1/new-version-opf-totr.git

# Or if remote already exists, update it:
git remote set-url origin https://github.com/Zahrah-wasif1/new-version-opf-totr.git
```

## Step 4: Add and Commit Files

```bash
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: Car rental backend with TypeScript and Vercel deployment"
```

## Step 5: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

**Note:** If you get authentication error, you may need to:
1. Use GitHub Personal Access Token instead of password
2. Or use GitHub Desktop application
3. Or configure SSH keys

## Alternative: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select your project folder
5. Click "Publish repository" button

## If Repository Already Has Content

If the repository already has files, you may need to pull first:

```bash
git pull origin main --allow-unrelated-histories
# Resolve any conflicts if they occur
git add .
git commit -m "Merge with remote repository"
git push origin main
```

## Troubleshooting

### Authentication Issues
- Use Personal Access Token: https://github.com/settings/tokens
- Create new token with `repo` permissions
- Use token as password when pushing

### Large Files
- Make sure `.env` is in `.gitignore` (already done)
- Don't commit `node_modules` (already in `.gitignore`)

### Connection Issues
- Check internet connection
- Verify repository URL is correct
- Make sure you have write access to the repository


