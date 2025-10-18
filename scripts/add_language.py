#!/usr/bin/env python3
"""
Script to add a new language to the VerusFi website using Claude AI for translation.

Usage:
    python scripts/add_language.py <language_code> <language_name> <flag_emoji> <direction>

Example:
    python scripts/add_language.py fr "Français" "🇫🇷" ltr
    python scripts/add_language.py he "עברית" "🇮🇱" rtl
"""

import os
import sys
import yaml
import anthropic
from pathlib import Path

# Configuration
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
if not ANTHROPIC_API_KEY:
    print("Error: ANTHROPIC_API_KEY environment variable not set.")
    print("Please set it with: export ANTHROPIC_API_KEY='your-api-key'")
    sys.exit(1)

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Paths
ROOT_DIR = Path(__file__).parent.parent
CONTENT_DIR = ROOT_DIR / 'content'
CONFIG_FILE = ROOT_DIR / '_config.yml'

def translate_text(text, target_language):
    """Translate text to target language using Claude AI."""
    prompt = f"""Translate the following text to {target_language}.

Keep the markdown formatting intact. Preserve HTML tags if any.
Only return the translated text, nothing else.

Text to translate:
{text}"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4096,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text.strip()

def translate_ui_string(text, target_language):
    """Translate a short UI string to target language."""
    prompt = f"""Translate this UI text to {target_language}. Only return the translation, nothing else: {text}"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=100,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text.strip()

def get_url_path(lang_code, section):
    """Generate URL path for a given language and section."""
    url_mappings = {
        'home': f'/{lang_code}/',
        'about': f'/{lang_code}/about/',
        'products': f'/{lang_code}/products/',
        'blog': f'/{lang_code}/blog/'
    }
    return url_mappings.get(section, f'/{lang_code}/')

def translate_markdown_file(source_file, target_file, target_language, lang_code, direction):
    """Translate a markdown file from source to target language."""
    print(f"Translating {source_file.name}...")

    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split front matter and content
    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"Warning: Invalid markdown format in {source_file}")
        return

    front_matter = parts[1].strip()
    markdown_content = parts[2].strip()

    # Parse front matter
    fm_data = yaml.safe_load(front_matter)

    # Translate title
    if 'title' in fm_data:
        fm_data['title'] = translate_ui_string(fm_data['title'], target_language)

    # Update lang and section
    fm_data['lang'] = lang_code
    section = fm_data.get('section', 'home')

    # Update permalink
    fm_data['permalink'] = get_url_path(lang_code, section)

    # Add direction for RTL languages
    if direction == 'rtl':
        fm_data['dir'] = 'rtl'

    # Translate markdown content
    translated_content = translate_text(markdown_content, target_language)

    # Reconstruct file
    new_front_matter = yaml.dump(fm_data, allow_unicode=True, sort_keys=False)
    new_content = f"---\n{new_front_matter}---\n\n{translated_content}\n"

    # Write to target file
    target_file.parent.mkdir(parents=True, exist_ok=True)
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ Created {target_file.relative_to(ROOT_DIR)}")

def update_config(lang_code, lang_name, flag_emoji, direction):
    """Update _config.yml with new language."""
    print(f"\nUpdating {CONFIG_FILE.name}...")

    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    # Add language to languages list
    new_lang = {
        'code': lang_code,
        'name': lang_name,
        'flag': flag_emoji,
        'dir': direction
    }

    if 'languages' not in config:
        config['languages'] = []

    # Check if language already exists
    for lang in config['languages']:
        if lang['code'] == lang_code:
            print(f"Warning: Language {lang_code} already exists in config. Updating...")
            lang.update(new_lang)
            break
    else:
        config['languages'].append(new_lang)

    # Add URL mappings
    if 'url_mappings' not in config:
        config['url_mappings'] = {}

    for section in ['home', 'about', 'products', 'blog']:
        if section not in config['url_mappings']:
            config['url_mappings'][section] = {}
        config['url_mappings'][section][lang_code] = get_url_path(lang_code, section)

    # Translate UI strings
    print(f"Translating UI strings to {lang_name}...")
    ui_strings = {
        'nav_home': 'Home',
        'nav_products': 'Products',
        'nav_about': 'About',
        'nav_blog': 'Blog',
        'footer_tagline': 'Building freedom technology for financial sovereignty',
        'all_rights': 'All rights reserved'
    }

    if 't' not in config:
        config['t'] = {}

    for key, english_text in ui_strings.items():
        if key not in config['t']:
            config['t'][key] = {}
        translated = translate_ui_string(english_text, lang_name)
        config['t'][key][lang_code] = translated
        print(f"  {key}: {translated}")

    # Write back to config
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        yaml.dump(config, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

    print(f"✓ Updated {CONFIG_FILE.name}")

def main():
    """Main function to add a new language."""
    if len(sys.argv) != 5:
        print("Usage: python scripts/add_language.py <language_code> <language_name> <flag_emoji> <direction>")
        print("Example: python scripts/add_language.py fr 'Français' '🇫🇷' ltr")
        print("Example: python scripts/add_language.py he 'עברית' '🇮🇱' rtl")
        sys.exit(1)

    lang_code = sys.argv[1]
    lang_name = sys.argv[2]
    flag_emoji = sys.argv[3]
    direction = sys.argv[4]

    if direction not in ['ltr', 'rtl']:
        print("Error: direction must be 'ltr' or 'rtl'")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"Adding new language: {lang_name} ({lang_code})")
    print(f"Flag: {flag_emoji}")
    print(f"Direction: {direction}")
    print(f"{'='*60}\n")

    # Find English content files (source for translation)
    en_dir = CONTENT_DIR / 'en'
    if not en_dir.exists():
        print(f"Error: English content directory not found at {en_dir}")
        sys.exit(1)

    # Create target directory
    target_dir = CONTENT_DIR / lang_code
    target_dir.mkdir(parents=True, exist_ok=True)

    # Translate all markdown files
    print("Translating content files...\n")
    for en_file in en_dir.glob('*.md'):
        target_file = target_dir / en_file.name
        translate_markdown_file(en_file, target_file, lang_name, lang_code, direction)

    # Update config
    update_config(lang_code, lang_name, flag_emoji, direction)

    print(f"\n{'='*60}")
    print(f"✓ Successfully added {lang_name} ({lang_code})")
    print(f"✓ Content files created in: {target_dir.relative_to(ROOT_DIR)}")
    print(f"✓ Config updated: {CONFIG_FILE.relative_to(ROOT_DIR)}")
    print(f"\nNext steps:")
    print(f"1. Review the translated content in {target_dir.relative_to(ROOT_DIR)}")
    print(f"2. Run 'make serve' to preview the site")
    print(f"3. Commit the changes to git")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
