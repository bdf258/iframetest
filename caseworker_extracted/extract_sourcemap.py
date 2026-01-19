import json
import os
import sys

def extract_sources(sourcemap_path, output_dir):
    """Extract source files from a webpack source map."""
    with open(sourcemap_path, 'r') as f:
        data = json.load(f)
    
    sources = data.get('sources', [])
    sourcesContent = data.get('sourcesContent', [])
    
    if not sourcesContent:
        print(f"No sourcesContent in {sourcemap_path}")
        return
    
    extracted_count = 0
    for i, source_path in enumerate(sources):
        if i >= len(sourcesContent) or sourcesContent[i] is None:
            continue
        
        # Convert webpack:/// paths to regular paths
        clean_path = source_path
        if clean_path.startswith('webpack:///'):
            clean_path = clean_path[11:]  # Remove webpack:///
        if clean_path.startswith('./'):
            clean_path = clean_path[2:]
        if clean_path.startswith('../'):
            clean_path = clean_path[3:]
        
        # Skip node_modules for cleaner output
        if 'node_modules' in clean_path:
            continue
        
        # Handle external declarations
        if clean_path.startswith('external '):
            continue
        
        # Clean up path
        clean_path = clean_path.replace('<no source>', 'unknown_source')
        
        # Create output path
        output_path = os.path.join(output_dir, clean_path)
        
        # Create directory if needed
        os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
        
        # Write the source content
        try:
            with open(output_path, 'w') as f:
                f.write(sourcesContent[i])
            extracted_count += 1
            print(f"Extracted: {clean_path}")
        except Exception as e:
            print(f"Error writing {clean_path}: {e}")
    
    print(f"\nExtracted {extracted_count} files from {sourcemap_path}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python extract_sourcemap.py <sourcemap.js.map> <output_dir>")
        sys.exit(1)
    
    extract_sources(sys.argv[1], sys.argv[2])
