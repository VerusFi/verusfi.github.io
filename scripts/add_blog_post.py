#!/usr/bin/env python3
"""
Script to add a new blog post in English and automatically translate to all languages.

Usage:
    python scripts/add_blog_post.py "<post_title>" "<post_content>"

Example:
    python scripts/add_blog_post.py "New Feature Announcement" "We are excited to announce..."
"""

import os
import sys
import yaml
import anthropic
from pathlib import Path
from datetime import datetime

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

def get_all_languages():
    """Get all configured languages from _config.yml."""
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    return config.get('languages', [])

def read_blog_page(lang_dir):
    """Read existing blog page content."""
    blog_file = lang_dir / 'blog.md'

    if not blog_file.exists():
        return None, None

    with open(blog_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split front matter and content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return None, None

    front_matter = parts[1].strip()
    markdown_content = parts[2].strip()

    return yaml.safe_load(front_matter), markdown_content

def add_post_to_blog(lang_dir, lang_code, post_title, post_content, lang_name, direction='ltr'):
    """Add a new post to the blog page for a specific language."""
    blog_file = lang_dir / 'blog.md'

    # Read existing blog content
    fm_data, existing_content = read_blog_page(lang_dir)

    if fm_data is None:
        print(f"Warning: Blog file not found for {lang_code}. Creating new one...")
        # Create new blog page
        if lang_code == 'en':
            blog_title = 'Blog'
            recent_posts = 'Recent Posts'
        else:
            blog_title = translate_text('Blog', lang_name)
            recent_posts = translate_text('Recent Posts', lang_name)

        fm_data = {
            'layout': 'default',
            'lang': lang_code,
            'title': blog_title,
            'permalink': f'/{lang_code}/blog/',
            'section': 'blog'
        }

        if direction == 'rtl':
            fm_data['dir'] = 'rtl'

        existing_content = f"# {blog_title}\n\n## {recent_posts}"

    # Translate title and content if not English
    if lang_code != 'en':
        translated_title = translate_text(post_title, lang_name)
        translated_content = translate_text(post_content, lang_name)
    else:
        translated_title = post_title
        translated_content = post_content

    # Create new post card
    timestamp = datetime.now().strftime('%Y-%m-%d')
    new_post = f"""
<div class="card">

### {translated_title}

{translated_content}

<small style="color: #94A3B8; font-style: italic;">Posted on {timestamp}</small>

</div>
"""

    # Insert new post after "Recent Posts" heading
    lines = existing_content.split('\n')
    insert_index = 0

    # Find the line with "Recent Posts" or equivalent
    for i, line in enumerate(lines):
        if line.startswith('##'):
            insert_index = i + 1
            break

    # Insert new post
    lines.insert(insert_index + 1, new_post)
    new_content = '\n'.join(lines)

    # Write back to file
    new_front_matter = yaml.dump(fm_data, allow_unicode=True, sort_keys=False)
    final_content = f"---\n{new_front_matter}---\n\n{new_content}\n"

    with open(blog_file, 'w', encoding='utf-8') as f:
        f.write(final_content)

    print(f"✓ Added post to {blog_file.relative_to(ROOT_DIR)}")

def main():
    """Main function to add a new blog post."""
    if len(sys.argv) != 3:
        print("Usage: python scripts/add_blog_post.py '<post_title>' '<post_content>'")
        print("Example: python scripts/add_blog_post.py 'New Feature' 'We are excited to announce...'")
        sys.exit(1)

    post_title = sys.argv[1]
    post_content = sys.argv[2]

    print(f"\n{'='*60}")
    print(f"Adding new blog post: {post_title}")
    print(f"{'='*60}\n")

    # Get all languages
    languages = get_all_languages()

    if not languages:
        print("Error: No languages configured in _config.yml")
        sys.exit(1)

    print(f"Found {len(languages)} languages: {', '.join([l['name'] for l in languages])}\n")

    # Add post to each language
    for lang in languages:
        lang_code = lang['code']
        lang_name = lang['name']
        direction = lang.get('dir', 'ltr')

        print(f"Processing {lang_name} ({lang_code})...")

        lang_dir = CONTENT_DIR / lang_code

        if not lang_dir.exists():
            print(f"  Warning: Language directory {lang_dir} does not exist. Skipping...")
            continue

        add_post_to_blog(lang_dir, lang_code, post_title, post_content, lang_name, direction)

    print(f"\n{'='*60}")
    print(f"✓ Successfully added blog post in all languages")
    print(f"\nNext steps:")
    print(f"1. Review the blog posts in content/*/blog.md")
    print(f"2. Run 'make serve' to preview the site")
    print(f"3. Commit the changes to git")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
