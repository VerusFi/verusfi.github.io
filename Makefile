.PHONY: help install serve build clean deploy add-lang add-post favicons

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (Jekyll + Python)
	@echo "Installing Jekyll dependencies..."
	bundle install
	@echo "Installing Python dependencies..."
	pip install -r scripts/requirements.txt
	@echo "✓ All dependencies installed"

serve: ## Start Jekyll development server
	bundle exec jekyll serve --livereload --trace

build: ## Build the site for production
	bundle exec jekyll build

clean: ## Clean generated files
	bundle exec jekyll clean
	rm -rf _site .jekyll-cache .jekyll-metadata

deploy: build ## Deploy to GitHub Pages (requires git)
	@echo "Building site..."
	@echo "To deploy to GitHub Pages, commit and push to the main branch"
	@echo "GitHub Pages will automatically build and deploy your site"

add-lang: ## Add a new language (usage: make add-lang LANG=fr NAME="Français" FLAG="🇫🇷" DIR=ltr)
	@if [ -z "$(LANG)" ] || [ -z "$(NAME)" ] || [ -z "$(FLAG)" ] || [ -z "$(DIR)" ]; then \
		echo "Error: Missing parameters"; \
		echo "Usage: make add-lang LANG=fr NAME='Français' FLAG='🇫🇷' DIR=ltr"; \
		exit 1; \
	fi
	python3 scripts/add_language.py $(LANG) "$(NAME)" "$(FLAG)" $(DIR)

add-post: ## Add a new blog post (usage: make add-post TITLE="Post Title" CONTENT="Post content...")
	@if [ -z "$(TITLE)" ] || [ -z "$(CONTENT)" ]; then \
		echo "Error: Missing parameters"; \
		echo "Usage: make add-post TITLE='Post Title' CONTENT='Post content...'"; \
		exit 1; \
	fi
	python3 scripts/add_blog_post.py "$(TITLE)" "$(CONTENT)"

setup-scripts: ## Make Python scripts executable
	chmod +x scripts/*.py scripts/*.sh

favicons: ## Generate favicon PNG files from SVG sources
	@echo "Generating favicon files..."
	@if command -v python3 >/dev/null 2>&1; then \
		python3 scripts/create_placeholder_favicons.py 2>/dev/null || bash scripts/generate_favicons.sh; \
	else \
		bash scripts/generate_favicons.sh; \
	fi

.DEFAULT_GOAL := help
