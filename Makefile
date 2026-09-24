# ════════════════════════════════════════════════════════════════════════════
# DEV SERVER
# ════════════════════════════════════════════════════════════════════════════

dev:
	npm run dev

# ════════════════════════════════════════════════════════════════════════════
# BACK UP TO GOOGLE DRIVE
# ════════════════════════════════════════════════════════════════════════════

backup_rclone:
	rclone sync . "aquamind-full-backup:Portfolio/backup" \
	--progress \
	--exclude ".git/**" \
	--exclude "node_modules/**" \
	--exclude "dist/**" \
	--exclude ".astro/**"

help:
	@echo "Available targets:"
	@echo "  make dev                  Run the local dev server (npm run dev)"
	@echo "  make backup_rclone        Sync whole project to Google Drive (Portfolio/backup)"
	@echo "  make help                 Show this list"
	@echo ""
