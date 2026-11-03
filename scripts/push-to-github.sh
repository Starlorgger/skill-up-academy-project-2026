#!/usr/bin/env bash
# ==============================================================================
# SkillUp Academy — Automated Push to GitHub Script
# Created by Tayo Verse Studios
# ==============================================================================

set -e

echo "🚀 SkillUp Academy GitHub Deployment Helper"
echo "============================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: 'git' is not installed on your system."
    echo "Please install git: https://git-scm.com/downloads"
    exit 1
fi

# Target GitHub repository URL
REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
    echo "Usage: ./scripts/push-to-github.sh <YOUR_GITHUB_REPO_URL>"
    echo "Example: ./scripts/push-to-github.sh https://github.com/your-username/skillup-academy.git"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
fi

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: No repository URL provided."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Ensure .gitignore is staged first
echo "📋 Checking .gitignore..."
if [ ! -f ".gitignore" ]; then
    cat <<EOT >> .gitignore
node_modules/
build/
dist/
dev-dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
EOT
fi

# Stage files
echo "➕ Staging project files..."
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "ℹ️ No changes to commit. Everything is up to date."
else
    echo "💾 Creating initial commit..."
    git commit -m "Initial release: SkillUp Academy full-stack platform (by Tayo Verse Studios)"
fi

# Setup remote
if git remote | grep -q "^origin$"; then
    echo "🔄 Updating existing 'origin' remote to $REPO_URL..."
    git remote set-url origin "$REPO_URL"
else
    echo "🔗 Adding remote 'origin' -> $REPO_URL..."
    git remote add origin "$REPO_URL"
fi

# Push to GitHub
echo "🚀 Pushing codebase to main branch on GitHub..."
git push -u origin main

echo ""
echo "=============================================================================="
echo "🎉 Successfully pushed SkillUp Academy to GitHub!"
echo "Repository: $REPO_URL"
echo "=============================================================================="
