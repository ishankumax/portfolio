export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight options request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sp_dc = process.env.SPOTIFY_SP_DC;
  let access_token = '';

  try {
    if (sp_dc) {
      access_token = await getAccessTokenFromCookie(sp_dc);
    }
  } catch (err) {
    console.error('Failed to get access token from sp_dc cookie:', err);
  }

  // Fallback to client credentials if cookie auth wasn't configured or failed
  if (!access_token) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
      return res.status(500).json({ error: 'Spotify credentials (either SPOTIFY_SP_DC or SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN) are not configured.' });
    }

    try {
      const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        return res.status(500).json({ error: `Failed to exchange token: ${errorText}` });
      }

      const tokenData = await tokenResponse.json();
      access_token = tokenData.access_token;
    } catch (error) {
      console.error('Error fetching standard access token:', error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  try {

    // 2. Fetch currently playing track
    const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 204 No Content means nothing is currently playing
    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      return await getRecentlyPlayed(access_token, res);
    }

    const song = await nowPlayingResponse.json();
    if (!song || !song.item) {
      return await getRecentlyPlayed(access_token, res);
    }

    return res.status(200).json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((_artist) => _artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url || '',
      songUrl: song.item.external_urls.spotify,
    });

  } catch (error) {
    console.error('Error fetching Spotify now playing:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

// Fallback helper to retrieve the most recently played track
async function getRecentlyPlayed(accessToken, res) {
  try {
    const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!recentlyPlayedResponse.ok) {
      return res.status(200).json({ isPlaying: false });
    }

    const recentlyPlayed = await recentlyPlayedResponse.json();
    if (recentlyPlayed.items && recentlyPlayed.items.length > 0) {
      const song = recentlyPlayed.items[0].track;
      return res.status(200).json({
        isPlaying: false,
        title: song.name,
        artist: song.artists.map((_artist) => _artist.name).join(', '),
        album: song.album.name,
        albumImageUrl: song.album.images[0]?.url || '',
        songUrl: song.external_urls.spotify,
      });
    }
  } catch (err) {
    console.error('Error fetching recently played track:', err);
  }

  return res.status(200).json({ isPlaying: false });
}

// Helper to retrieve an access token using a user's sp_dc cookie
async function getAccessTokenFromCookie(spDc) {
  const response = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Cookie: `sp_dc=${spDc}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve access token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.accessToken) {
    throw new Error('Access token missing from Spotify token response.');
  }

  return data.accessToken;
}

