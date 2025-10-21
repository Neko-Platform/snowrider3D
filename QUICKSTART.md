# Quick Start Guide - Pusher Remote Control

This guide will get you up and running with remote control of Snow Rider 3D in 5 minutes.

## For Users (Browser Testing)

### Step 1: Open the Game
Open `index.html` in your web browser. The game will load and automatically connect to Pusher.

### Step 2: Open the Test Panel
In another browser tab, open `pusher-test-panel.html`. You'll see a control panel with buttons.

### Step 3: Try the Controls
Click any button on the test panel to send commands to the game:
- **Pause Game** - Pauses the game
- **Resume Game** - Resumes the game
- **Restart Game** - Restarts from beginning
- **Set Speed** - Changes game speed (try 0.5 for slow-mo, 2.0 for fast)

### Step 4: Check Browser Console
Open the browser console (F12) on the game page to see Pusher connection logs:
```
[Pusher] Pusher integration script loaded
[Pusher] Game control initialized
[Pusher] Connected to Pusher
```

## For Developers (Pusher API)

### Option 1: Pusher Debug Console (Easiest)
1. Go to your Pusher dashboard at https://dashboard.pusher.com/
2. Select your app
3. Click "Debug Console" in the left sidebar
4. Enter channel name: `game-control`
5. Enter event name: `pause-game`
6. Enter data: `{}`
7. Click "Send event"

### Option 2: Node.js Script
```bash
# Install Pusher
npm install pusher

# Edit examples/node-control-example.js
# Replace YOUR_APP_ID and YOUR_APP_SECRET with your credentials

# Run commands
node examples/node-control-example.js pause
node examples/node-control-example.js resume
node examples/node-control-example.js speed 1.5
```

### Option 3: Python Script
```bash
# Install Pusher
pip install pusher

# Edit examples/python-control-example.py
# Replace YOUR_APP_ID and YOUR_APP_SECRET with your credentials

# Run commands
python examples/python-control-example.py pause
python examples/python-control-example.py resume
python examples/python-control-example.py speed 2.0
```

### Option 4: cURL (REST API)
```bash
# Get your credentials from Pusher dashboard
curl -X POST "https://api-eu.pusher.com/apps/YOUR_APP_ID/events" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "pause-game",
    "channels": ["game-control"],
    "data": "{}"
  }'
```

## Testing Without Server Credentials

If you don't have Pusher app credentials yet, you can still test locally:

### Browser Console Testing
Open the game, then open browser console (F12) and type:

```javascript
// Check connection status
window.PusherGameControl.getStatus();

// Manually trigger controls (bypasses Pusher)
window.PusherGameControl.control.pause();
window.PusherGameControl.control.resume();
window.PusherGameControl.control.restart();
window.PusherGameControl.control.setSpeed(1.5);
```

## Available Events

| Event Name | Data | Description |
|------------|------|-------------|
| `pause-game` | `{}` | Pauses the game |
| `resume-game` | `{}` | Resumes the game |
| `restart-game` | `{}` | Restarts the game |
| `set-speed` | `{speed: 1.5}` | Sets game speed (0.5-5.0) |
| `game-command` | `{command: "pause", value: null}` | Generic command |

## Troubleshooting

### Game doesn't respond to commands
This is expected behavior because the Unity game is pre-compiled. To fix:
1. You need access to the Unity source code
2. Add a GameObject named "GameController"
3. Add methods: PauseGame(), ResumeGame(), RestartGame(), SetSpeed(float)
4. Rebuild the Unity game

### Can't connect to Pusher
- Check browser console for errors
- Verify internet connection
- Make sure Pusher SDK loaded (check Network tab in DevTools)

### Test panel says "Client cannot trigger events"
This is normal! Clients can only *receive* events. To *send* events, you need:
- Server-side code (Node.js, Python, PHP, etc.)
- OR Pusher Debug Console
- OR REST API calls

## Next Steps

- Read [PUSHER_INTEGRATION.md](PUSHER_INTEGRATION.md) for complete documentation
- Check [examples/README.md](examples/README.md) for more example code
- See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details

## Getting Pusher Credentials

1. Sign up at https://pusher.com/
2. Create a new app
3. Choose "eu" cluster
4. Get your App ID and Secret from the app dashboard
5. The key `59418388ba581a7af37d` is already configured in the code

## Support

For issues or questions:
1. Check the browser console for `[Pusher]` log messages
2. Review the documentation files
3. Test with the browser test panel first
4. Verify Pusher connection in Debug Console

---

**Key Configuration:**
- Cluster: `eu`
- Key: `59418388ba581a7af37d`
- Channel: `game-control`
