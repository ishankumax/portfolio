/** Helper script to perform Spotify OAuth authorization and write .env.local */
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const clientId = process.argv[2]
const clientSecret = process.argv[3]

if (!clientId || !clientSecret) {
  console.log('\n❌ Usage: node scripts/get-token.js <CLIENT_ID> <CLIENT_SECRET>\n')
  console.log('Example:')
  console.log('  node scripts/get-token.js 1a2b3c4d5e6f 7g8h9i0j1k2l\n')
  process.exit(1)
}

const PORT = 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`)
  if (reqUrl.pathname === '/callback') {
    const code = reqUrl.searchParams.get('code')
    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #1DB954;">🎉 Authorization Successful!</h1>
          <p style="font-size: 18px;">Your Spotify Refresh Token has been generated and saved to <code>.env.local</code>!</p>
          <p>You can close this window now.</p>
        </div>
      `)
      
      console.log('\nReceived authorization code! Exchanging for refresh token...')
      
      try {
        const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
          }),
        })

        const tokenData = await tokenRes.json()
        if (tokenData.refresh_token) {
          console.log('\n✅ SUCCESS! Received Spotify Refresh Token!\n')
          
          const envPath = path.resolve(__dirname, '../.env.local')
          let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''

          const setEnvVar = (key, val) => {
            const regex = new RegExp(`^${key}=.*$`, 'm')
            if (regex.test(envContent)) {
              envContent = envContent.replace(regex, `${key}="${val}"`)
            } else {
              envContent += `\n${key}="${val}"`
            }
          }

          setEnvVar('SPOTIFY_CLIENT_ID', clientId)
          setEnvVar('SPOTIFY_CLIENT_SECRET', clientSecret)
          setEnvVar('SPOTIFY_REFRESH_TOKEN', tokenData.refresh_token)

          fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8')
          console.log('🎉 Successfully saved SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN to .env.local!\n')
        } else {
          console.error('\n❌ Failed to get refresh token:', tokenData)
        }
      } catch (err) {
        console.error('\n❌ Error exchanging token:', err)
      } finally {
        server.close()
        process.exit(0)
      }
    }
  }
})

server.listen(PORT, '127.0.0.1', () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-currently-playing%20user-read-recently-played`
  
  console.log('\n===================================================================')
  console.log('🎵 SPOTIFY AUTOMATED TOKEN GENERATOR')
  console.log('===================================================================\n')
  console.log(`IMPORTANT: Ensure "${REDIRECT_URI}" is added to your Spotify App Redirect URIs.`)
  console.log('\nOpen this link in your browser to authorize:\n')
  console.log(`\x1b[36m${authUrl}\x1b[0m\n`)
  console.log('Waiting for authorization...')
})
