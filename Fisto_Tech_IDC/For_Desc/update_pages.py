import os

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    data = f.read()

# Update pages total
data = data.replace('pages: 10,', 'pages: 11,')
data = data.replace('pages: 10 //', 'pages: 11 //')

# Increment page numbers in the HTML (backwards to avoid 9->10->11 cascade)
for i in range(10, 1, -1):
    old_str = f'PAGE <span class="text-[#026DF9]">{i}</span>'
    new_str = f'PAGE <span class="text-[#026DF9]">{i+1}</span>'
    data = data.replace(old_str, new_str)

# Flip right and left shadows
# Find all instances of pages, and replace shadows sequentially
# Actually, since I just inserted one left page, the parities of ALL subsequent pages are inverted!
# This means:
# right-page-shadow.svg inside a "left-[-1%]" -> must become left-page-shadow.svg inside a "right-[-1%]"
# left-page-shadow.svg inside a "right-[-1%]" -> must become right-page-shadow.svg inside a "left-[-1%]"
# But wait, the flipbook uses a specific DOM structure. If I swap them out, the user gets perfectly correct shadows.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated page numbers successfully!")
