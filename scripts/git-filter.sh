#!/bin/bash

# Git Bot Filter Script
# This script provides easy commands to filter bot commits from git history

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to show help
show_help() {
    echo -e "${BLUE}Git Bot Filter Script${NC}"
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/git-filter.sh [command]"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  setup     - Configure git aliases to filter bot commits"
    echo "  clean     - Show git log without bot commits"
    echo "  bots      - Show only bot commits"
    echo "  stats     - Show statistics about bot vs human commits"
    echo "  help      - Show this help message"
}

# Function to setup git aliases
setup_aliases() {
    echo -e "${YELLOW}Setting up git aliases to filter bot commits...${NC}"
    
    # Add aliases to local git config  
    git config alias.log-clean "!git log --format='%h %s (%an)' | grep -v '\\[bot\\]'"
    git config alias.log-human "!git log --format='%h %s (%an)' | grep -v '\\[bot\\]'"
    git config alias.log-bots "!git log --format='%h %s (%an)' | grep '\\[bot\\]'"
    git config alias.lg-clean "!git log --graph --format='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit | grep -v '\\[bot\\]'"
    
    echo -e "${GREEN}✓ Git aliases configured successfully!${NC}"
    echo -e "${YELLOW}You can now use:${NC}"
    echo "  git log-clean   - Show commits without bots"
    echo "  git log-human   - Show only human commits"
    echo "  git log-bots    - Show only bot commits"
    echo "  git lg-clean    - Pretty log without bots"
}

# Function to show clean log
show_clean_log() {
    echo -e "${YELLOW}Git history without bot commits:${NC}"
    git log --format="%h %s (%an)" -20 | grep -v "\[bot\]" || {
        echo -e "${RED}No non-bot commits found${NC}"
    }
}

# Function to show only bot commits
show_bot_commits() {
    echo -e "${YELLOW}Bot commits only:${NC}"
    git log --format="%h %s (%an)" | grep "\[bot\]" || {
        echo -e "${GREEN}No bot commits found${NC}"
    }
}

# Function to show statistics
show_stats() {
    echo -e "${BLUE}Commit Statistics:${NC}"
    
    TOTAL_COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
    BOT_COMMITS=$(git log --format="%an" | grep -c "\[bot\]" || echo "0")
    HUMAN_COMMITS=$((TOTAL_COMMITS - BOT_COMMITS))
    
    echo -e "${YELLOW}Total commits:${NC} $TOTAL_COMMITS"
    echo -e "${RED}Bot commits:${NC} $BOT_COMMITS"
    echo -e "${GREEN}Human commits:${NC} $HUMAN_COMMITS"
    
    if [ $TOTAL_COMMITS -gt 0 ]; then
        BOT_PERCENTAGE=$((BOT_COMMITS * 100 / TOTAL_COMMITS))
        HUMAN_PERCENTAGE=$((HUMAN_COMMITS * 100 / TOTAL_COMMITS))
        echo -e "${YELLOW}Bot percentage:${NC} ${BOT_PERCENTAGE}%"
        echo -e "${YELLOW}Human percentage:${NC} ${HUMAN_PERCENTAGE}%"
    fi
}

# Main script logic
case "${1:-help}" in
    "setup")
        setup_aliases
        ;;
    "clean")
        show_clean_log
        ;;
    "bots")
        show_bot_commits
        ;;
    "stats")
        show_stats
        ;;
    "help"|*)
        show_help
        ;;
esac