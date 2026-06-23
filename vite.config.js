import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at /flask-saas-starter-site/.
// `base` makes the hashed bundle assets resolve under that subpath.
// Files in public/ (docs/, assets/styles.css, .nojekyll) are copied to the
// build root as-is and use their own relative links, so base doesn't touch them.
export default defineConfig({
  base: '/flask-saas-starter-site/',
  plugins: [react()],
})
