import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/u_ext/",
  plugins: [react()],
  //server: {
  //  port:2000,
  //}
});
