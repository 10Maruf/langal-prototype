# Hiding Bot Commits

This document explains how to hide bot commits from your git history display while keeping them in the actual repository history.

## What are Bot Commits?

Bot commits are commits made by automated systems such as:
- `copilot-swe-agent[bot]`
- `dependabot[bot]`
- `github-actions[bot]`
- Any automated CI/CD processes

These commits can clutter the git history and make it harder to see the actual development progress made by humans.

## Solution Overview

This repository provides several methods to hide bot commits from display:

### 1. Automated GitHub Actions

The `.github/workflows/hide-bot-commits.yml` workflow automatically:
- Detects bot commits in the repository
- Generates a clean history file excluding bot commits
- Runs on push and pull requests to main branch

### 2. Git Aliases (Recommended)

Use the provided script to set up convenient git aliases:

```bash
# Setup git aliases
./scripts/git-filter.sh setup

# Use the new aliases
git log-clean    # Show git log without bot commits
git log-human    # Show only human commits  
git log-bots     # Show only bot commits
git lg-clean     # Pretty formatted log without bots
```

### 3. Manual Git Commands

If you prefer manual commands, you can use these git commands directly:

```bash
# Show git log without bot commits
git log --oneline --invert-grep --author=".*\[bot\]" --author=".*bot.*"

# Show git log with pretty formatting (no bots)
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --invert-grep --author=".*\[bot\]" --author=".*bot.*"

# Show only bot commits
git log --oneline --author=".*\[bot\]" --author=".*bot.*"
```

### 4. Using the Filter Script

The `scripts/git-filter.sh` script provides an easy interface:

```bash
# Show help
./scripts/git-filter.sh help

# Show statistics about bot vs human commits
./scripts/git-filter.sh stats

# Show clean commit history
./scripts/git-filter.sh clean

# Show only bot commits
./scripts/git-filter.sh bots
```

## Setup Instructions

### Option 1: Quick Setup (Recommended)

```bash
# Make the script executable (if not already)
chmod +x scripts/git-filter.sh

# Setup git aliases
./scripts/git-filter.sh setup

# Now you can use clean git commands
git log-clean
```

### Option 2: Manual Git Configuration

```bash
# Add aliases to your local git config
git config alias.log-clean "log --oneline --invert-grep --author=.*\\[bot\\] --author=.*bot.*"
git config alias.log-human "log --oneline --invert-grep --author=.*\\[bot\\] --author=.*bot.* --author=.*automation.*"
git config alias.log-bots "log --oneline --author=.*\\[bot\\] --author=.*bot.* --author=.*automation.*"
git config alias.lg-clean "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --invert-grep --author=.*\\[bot\\] --author=.*bot.*"
```

### Option 3: Global Git Configuration

To apply these aliases globally across all your repositories:

```bash
# Copy the provided git config
cp .gitconfig-clean ~/.gitconfig-clean

# Include it in your global git config
echo "[include]" >> ~/.gitconfig
echo "    path = ~/.gitconfig-clean" >> ~/.gitconfig
```

## Important Notes

### ⚠️ What This Does NOT Do

- **Does not delete bot commits** - All commits remain in the repository history
- **Does not affect git operations** - Push, pull, merge, rebase all work normally
- **Does not hide commits from GitHub web interface** - This only affects local git commands

### ✅ What This Does

- **Filters display output** - Makes `git log` commands exclude bot commits
- **Improves readability** - Focuses on human-made changes
- **Provides statistics** - Shows ratio of bot vs human commits
- **Maintains compatibility** - All standard git operations work unchanged

## Usage Examples

### Daily Development

```bash
# View clean commit history
git log-clean

# View last 10 human commits
git log-human -10

# Check what bots have been doing
git log-bots

# Get statistics
./scripts/git-filter.sh stats
```

### Code Review

```bash
# See changes since last release (excluding bots)
git log-clean v1.0.0..HEAD

# Compare branches without bot noise
git log-clean feature-branch..main
```

### Release Notes

```bash
# Generate release notes excluding bot commits
git log-clean --pretty=format:"- %s" v1.0.0..v1.1.0
```

## Troubleshooting

### Script Permission Issues

```bash
chmod +x scripts/git-filter.sh
```

### Git Alias Not Working

```bash
# Check if alias exists
git config --get alias.log-clean

# Re-run setup
./scripts/git-filter.sh setup
```

### No Commits Showing

If `git log-clean` shows no commits, it might be filtering too aggressively. Try:

```bash
# Show all commits to verify
git log --oneline

# Check what's being filtered
git log-bots
```

## Contributing

When adding new bot patterns:

1. Update the regex patterns in the script
2. Test with `./scripts/git-filter.sh stats`
3. Update this documentation

## Additional Resources

- [Git Log Documentation](https://git-scm.com/docs/git-log)
- [Git Aliases Guide](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)