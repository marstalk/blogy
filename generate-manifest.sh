#!/bin/bash

# Script to generate posts.json from markdown files in the posts/ folder
# Usage: ./generate-manifest.sh

cd "$(dirname "$0")"

POSTS_DIR="posts"
MANIFEST_FILE="posts.json"

# Start JSON
echo "{" > "$MANIFEST_FILE"
echo '  "posts": [' >> "$MANIFEST_FILE"

# Find all markdown files and process them
FIRST=true
for file in "$POSTS_DIR"/*.md; do
    if [ -f "$file" ]; then
        # Extract slug from filename (remove date prefix and extension)
        filename=$(basename "$file" .md)
        slug=$(echo "$filename" | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//')
        
        # Add comma if not first item
        if [ "$FIRST" = true ]; then
            FIRST=false
        else
            echo "," >> "$MANIFEST_FILE"
        fi
        
        # Add post entry
        echo "" >> "$MANIFEST_FILE"
        echo "    {" >> "$MANIFEST_FILE"
        echo "      \"file\": \"$file\"," >> "$MANIFEST_FILE"
        echo "      \"slug\": \"$slug\"" >> "$MANIFEST_FILE"
        echo -n "    }" >> "$MANIFEST_FILE"
    fi
done

# Close JSON
echo "" >> "$MANIFEST_FILE"
echo "" >> "$MANIFEST_FILE"
echo "  ]" >> "$MANIFEST_FILE"
echo "}" >> "$MANIFEST_FILE"

echo "✓ Generated $MANIFEST_FILE with posts from $POSTS_DIR/"
echo ""
echo "Found posts:"
grep '"file"' "$MANIFEST_FILE" | sed 's/.*: "posts\//  - /' | sed 's/",//'
