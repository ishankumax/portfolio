import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import handler from './api/now-playing.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vite-api-now-playing',
        configureServer(server) {
          server.middlewares.use('/api/now-playing', async (req, res) => {
            if (!res.status) {
              res.status = (statusCode) => {
                res.statusCode = statusCode
                return res
              }
            }
            if (!res.json) {
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
                return res
              }
            }
            try {
              await handler(req, res)
            } catch (err) {
              console.error('Local API Error:', err)
              res.status(500).json({ error: err.message })
            }
          })
        }
      }
    ],
    server: {
      port: 5000,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) {
                return 'vendor-firebase'
              }
              if (id.includes('react-icons') || id.includes('react-github-calendar') || id.includes('react-markdown')) {
                return 'vendor-libs'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  }
})