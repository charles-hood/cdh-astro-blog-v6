#!/bin/bash
# Zero-downtime blue-green deploy for the v6 blog (AstroPaper 6 / pnpm).
# Builds to a timestamped directory, atomically switches the `dist` symlink,
# and keeps the last 3 builds for instant rollback:
#   ln -sfn dist-<TIMESTAMP> dist
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

cd "$(dirname "$0")"

echo -e "${BLUE}📥 Pulling latest changes from GitHub...${NC}"
git pull

echo -e "${BLUE}📦 Installing dependencies (pnpm)...${NC}"
pnpm install --frozen-lockfile

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BUILD_DIR="dist-${TIMESTAMP}"

echo -e "${BLUE}🔨 Building site to ${BUILD_DIR}...${NC}"
pnpm exec astro check
pnpm exec astro build --outDir "${BUILD_DIR}"

echo -e "${BLUE}🔍 Building search index...${NC}"
pnpm exec pagefind --site "${BUILD_DIR}"

echo -e "${BLUE}🧹 Cleaning up old builds (keep 3)...${NC}"
ls -dt dist-* 2>/dev/null | tail -n +4 | xargs rm -rf 2>/dev/null || true

echo -e "${BLUE}🔄 Switching to new build...${NC}"
rm -rf dist
ln -sfn "${BUILD_DIR}" dist

echo -e "${GREEN}✅ Deployment complete with zero downtime.${NC}"
echo -e "${GREEN}📂 Active build: ${BUILD_DIR}${NC}"
echo -e "${BLUE}📚 Available builds (for rollback):${NC}"
ls -dt dist-*
