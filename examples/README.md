# Pusher Control Examples

This directory contains example scripts demonstrating how to remotely control the Snow Rider 3D game using Pusher.

## Prerequisites

Before using these examples, you need:
1. A Pusher account with an app created
2. Your Pusher app credentials (App ID and Secret)
3. The game must be running in a browser

## Configuration

All examples use the following Pusher configuration:
- **Key**: `59418388ba581a7af37d`
- **Cluster**: `eu`
- **Channel**: `game-control`

You need to replace `YOUR_APP_ID` and `YOUR_APP_SECRET` in the example files with your actual credentials.

## Examples

### Node.js Example

**File**: `node-control-example.js`

**Installation**:
```bash
npm install pusher
```

**Usage**:
```bash
# Show help
node examples/node-control-example.js

# Pause the game
node examples/node-control-example.js pause

# Resume the game
node examples/node-control-example.js resume

# Restart the game
node examples/node-control-example.js restart

# Set game speed to 1.5x
node examples/node-control-example.js speed 1.5
```

### Python Example

**File**: `python-control-example.py`

**Installation**:
```bash
pip install pusher
```

**Usage**:
```bash
# Show help
python examples/python-control-example.py

# Pause the game
python examples/python-control-example.py pause

# Resume the game
python examples/python-control-example.py resume

# Restart the game
python examples/python-control-example.py restart

# Set game speed to 0.5x (slow motion)
python examples/python-control-example.py speed 0.5
```

## Available Commands

All examples support the following commands:

- `pause` - Pause the game
- `resume` - Resume the game
- `restart` - Restart the game from the beginning
- `speed <value>` - Change the game speed
  - `0.5` = half speed (slow motion)
  - `1.0` = normal speed
  - `2.0` = double speed

## Testing

1. Open the game in a browser: `index.html`
2. Open the browser console to see Pusher connection logs
3. Run one of the example scripts
4. Observe the game responding to commands
5. Check console logs for confirmation messages

## Troubleshooting

### "Failed to send command" error

Make sure you have:
1. Replaced `YOUR_APP_ID` and `YOUR_APP_SECRET` with your actual credentials
2. Installed the Pusher library for your language
3. Your Pusher app is active and the credentials are correct

### Commands not affecting the game

This can happen because:
1. The Unity game may not have the expected GameObject/methods
2. The game is a pre-compiled WebGL build that may not expose these controls

Check the browser console for messages like:
```
[Pusher] Failed to pause game: ...
```

To fix this, you would need to modify the Unity game source code to add proper message handlers.

## Advanced Usage

### Using with automation scripts

You can import these modules in your own scripts:

**Node.js**:
```javascript
const { sendCommand } = require('./examples/node-control-example.js');

async function automateGame() {
  // Pause game after 10 seconds
  setTimeout(() => sendCommand('pause-game'), 10000);
  
  // Resume after 5 more seconds
  setTimeout(() => sendCommand('resume-game'), 15000);
}
```

**Python**:
```python
import time
from examples.python_control_example import send_command

def automate_game():
    # Pause game after 10 seconds
    time.sleep(10)
    send_command('pause-game')
    
    # Resume after 5 more seconds
    time.sleep(5)
    send_command('resume-game')
```

## Security Notes

- The Pusher key shown in these examples is a public client key
- For production use, implement proper authentication
- Consider using private or presence channels
- Add server-side validation before triggering events

## See Also

- [PUSHER_INTEGRATION.md](../PUSHER_INTEGRATION.md) - Complete integration documentation
- [pusher-test-panel.html](../pusher-test-panel.html) - Browser-based test panel
