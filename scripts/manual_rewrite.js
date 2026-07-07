// scripts/manual_rewrite.js

import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

// Get all .html files in dist root (e.g. about.html, blog.html, contact.html)
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const baseName = file.replace('.html', '');
  const folderPath = path.join(distDir, baseName);
  const filePath = path.join(distDir, file);
  const newFilePath = path.join(folderPath, 'index.html');

  // Only move if a same-name folder exists or if the HTML represents a folder-based route
  if (fs.existsSync(folderPath)) {
    // ensure folder exists
    fs.mkdirSync(folderPath, { recursive: true });

    // move file into folder
    fs.renameSync(filePath, newFilePath);
    console.log(`✅ Moved: ${file} → ${baseName}/index.html`);
  }
}
