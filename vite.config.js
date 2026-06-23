import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served at the apex custom domain https://saasling.dev, so assets resolve from root.
// Files in public/ (docs/, assets/styles.css, CNAME, favicon.svg, .nojekyll) are copied
// to the build root as-is and use their own relative links.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
