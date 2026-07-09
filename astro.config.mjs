import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // ✅ Add this import
import tailwind from '@astrojs/tailwind'; // ✅ Correct Tailwind plugin


export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [
    react(),
    // tailwind(),
  ], // ✅ Register the integration
  build: {
    inlineStylesheets: 'never', 
    format: 'file', // 👈 forces .html output
    css: {
      include: ['src/styles/global.css'],
    },
  },
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
 
  // 👇 Important: control trailing slash behavior
  // when exporting set the trailing Slash to 'never', while working set it as 'ignore'
  // trailingSlash: 'never', 
  trailingSlash: 'ignore', 
  
  
});