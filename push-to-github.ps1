# Git Push Script for Car Rental Project
# Run this script after installing Git

Write-Host "=== Git Push Script ===" -ForegroundColor Green
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Then restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 1: Checking git status..." -ForegroundColor Cyan

# Check if git is initialized
if (Test-Path .git) {
    Write-Host "Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

Write-Host ""
Write-Host "Step 2: Adding remote repository..." -ForegroundColor Cyan

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $update = Read-Host "Do you want to update it? (y/n)"
    if ($update -eq "y" -or $update -eq "Y") {
        git remote set-url origin https://github.com/Zahrah-wasif1/new-version-opf-totr.git
        Write-Host "Remote updated successfully" -ForegroundColor Green
    }
} else {
    git remote add origin https://github.com/Zahrah-wasif1/new-version-opf-totr.git
    Write-Host "Remote added successfully" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Adding all files..." -ForegroundColor Cyan
git add .
Write-Host "Files added" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Committing changes..." -ForegroundColor Cyan
$commitMessage = "Initial commit: Car rental backend with TypeScript and Vercel deployment"
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "No changes to commit or commit failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 5: Setting branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "Step 6: Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You may be prompted for GitHub credentials" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCCESS! Code pushed to GitHub ===" -ForegroundColor Green
    Write-Host "Repository: https://github.com/Zahrah-wasif1/new-version-opf-totr.git" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "=== Push failed ===" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "1. Authentication failed - Use Personal Access Token" -ForegroundColor Yellow
    Write-Host "2. Repository already has content - You may need to pull first" -ForegroundColor Yellow
    Write-Host "3. Network issues" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "See GIT_PUSH_INSTRUCTIONS.md for troubleshooting" -ForegroundColor Cyan
}


