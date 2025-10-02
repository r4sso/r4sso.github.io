.PHONY: run build debug

run:
	@echo "Starting watch and Hugo server..."
	@bun run watch & bunx hugo server --disableFastRender

debug:
	@echo "Starting debugging"
	@bun run watch & bunx hugo server -D --logLevel debug --disableFastRender


build:
	@echo "Minifying and building Hugo site..."
	@bun run minify
	@bunx hugo --minify --cleanDestinationDir

