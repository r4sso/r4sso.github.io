.PHONY: run build debug

run:
	@echo "Starting Hugo server (no tailwind, custom css)..."
	@hugo server --disableFastRender

debug:
	@echo "Starting debugging"
	@hugo server -D --logLevel debug --disableFastRender

build:
	@echo "Building Hugo site..."
	@hugo --minify --cleanDestinationDir
