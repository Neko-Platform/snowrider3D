# Pusher Integration for Snow Rider 3D

This document describes the Pusher integration that allows remote control of the Snow Rider 3D game.

## Configuration

The Pusher integration is configured with the following settings:
- **Cluster**: `eu`
- **Key**: `59418388ba581a7af37d`
- **Channel**: `game-control`

## Features

The integration allows you to remotely control the following game features:

### 1. Pause Game
Send a `pause-game` event to pause the game.

```javascript
// Example using Pusher server SDK
pusher.trigger('game-control', 'pause-game', {});
```

### 2. Resume Game
Send a `resume-game` event to resume the game.

```javascript
pusher.trigger('game-control', 'resume-game', {});
```

### 3. Restart Game
Send a `restart-game` event to restart the game.

```javascript
pusher.trigger('game-control', 'restart-game', {});
```

### 4. Set Game Speed
Send a `set-speed` event to change the game speed.

```javascript
pusher.trigger('game-control', 'set-speed', {
  speed: 1.5  // 1.0 is normal speed, 2.0 is double speed, 0.5 is half speed
});
```

### 5. Force Crash
Send a `force-crash` event to force the 'D' key to be held for 9 seconds.

```javascript
pusher.trigger('game-control', 'force-crash', {});
```

### 6. Generic Game Commands
Send a `game-command` event for generic commands.

```javascript
pusher.trigger('game-control', 'game-command', {
  command: 'pause',  // or 'resume', 'restart', 'setSpeed', 'forceCrash'
  value: 1.0         // optional, used for commands like setSpeed
});
```

## Testing the Integration

### Using Browser Console

Once the game is loaded, you can test the Pusher integration using the browser console:

```javascript
// Check connection status
window.PusherGameControl.getStatus();

// Manual control (for testing)
window.PusherGameControl.control.pause();
window.PusherGameControl.control.resume();
```

### Using Pusher Debug Console

1. Go to your Pusher dashboard
2. Select your app
3. Go to the "Debug Console" tab
4. Enter the channel name: `game-control`
5. Enter an event name (e.g., `pause-game`)
6. Enter event data: `{}`
7. Click "Send event"

### Using cURL (with Pusher REST API)

```bash
curl -X POST https://api-eu.pusher.com/apps/YOUR_APP_ID/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "pause-game",
    "channel": "game-control",
    "data": "{}"
  }'
```

## Server-Side Integration Examples

### Node.js

```javascript
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: '59418388ba581a7af37d',
  secret: 'YOUR_APP_SECRET',
  cluster: 'eu',
  useTLS: true
});

// Pause the game
pusher.trigger('game-control', 'pause-game', {});

// Resume the game
pusher.trigger('game-control', 'resume-game', {});

// Restart the game
pusher.trigger('game-control', 'restart-game', {});

// Set game speed
pusher.trigger('game-control', 'set-speed', { speed: 1.5 });
```

### Python

```python
import pusher

pusher_client = pusher.Pusher(
  app_id='YOUR_APP_ID',
  key='59418388ba581a7af37d',
  secret='YOUR_APP_SECRET',
  cluster='eu',
  ssl=True
)

# Pause the game
pusher_client.trigger('game-control', 'pause-game', {})

# Resume the game
pusher_client.trigger('game-control', 'resume-game', {})

# Restart the game
pusher_client.trigger('game-control', 'restart-game', {})

# Set game speed
pusher_client.trigger('game-control', 'set-speed', {'speed': 1.5})
```

### PHP

```php
<?php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher(
  '59418388ba581a7af37d',
  'YOUR_APP_SECRET',
  'YOUR_APP_ID',
  array('cluster' => 'eu')
);

// Pause the game
$pusher->trigger('game-control', 'pause-game', array());

// Resume the game
$pusher->trigger('game-control', 'resume-game', array());

// Restart the game
$pusher->trigger('game-control', 'restart-game', array());

// Set game speed
$pusher->trigger('game-control', 'set-speed', array('speed' => 1.5));
?>
```

## Implementation Details

### Unity Integration Notes

The integration attempts to communicate with Unity using the `SendMessage` function. The following Unity GameObject and methods are expected:

- **GameObject**: `GameController`
- **Methods**:
  - `PauseGame()` - Pauses the game
  - `ResumeGame()` - Resumes the game
  - `RestartGame()` - Restarts the game
  - `SetSpeed(float speed)` - Sets the game speed multiplier

**Note**: Since this is a pre-compiled Unity game, the actual Unity GameObject names and methods may differ. The integration script includes error handling and logging to help debug any issues.

### Browser Console Logging

The integration provides detailed console logging prefixed with `[Pusher]` to help with debugging:

- Connection status messages
- Event received messages
- Command execution results
- Error messages

### Connection Management

- The integration automatically connects to Pusher when the page loads
- Connection status is logged to the console
- Automatic reconnection is handled by the Pusher library

## Troubleshooting

### Events not being received

1. Check browser console for `[Pusher]` messages
2. Verify the Pusher connection status: `window.PusherGameControl.getStatus()`
3. Check Pusher Debug Console to see if events are being delivered
4. Verify the channel name is correct: `game-control`

### Commands not affecting the game

The Unity game may not have the expected GameObject/methods. Check console for warnings like:
```
[Pusher] Failed to pause game: ...
```

This is expected for pre-compiled Unity games. You may need to:
1. Modify the Unity game to add the required GameObject and methods
2. Rebuild the Unity game with proper message handlers

## Security Considerations

- The Pusher key is public and intended for client-side use
- For production use, consider:
  - Implementing authentication for the Pusher channel
  - Using private or presence channels
  - Rate limiting event triggers on the server side
  - Adding authorization logic before executing commands

## Extending the Integration

To add new commands:

1. Add a new event binding in `pusher-integration.js`:
```javascript
this.channel.bind('your-new-event', (data) => {
  console.log('[Pusher] Received your-new-event:', data);
  // Your custom logic here
});
```

2. Add a corresponding method to the GameControl object if needed

3. Update this documentation with the new command
