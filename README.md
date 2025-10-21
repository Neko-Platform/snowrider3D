# snowrider3d
Use the arrow keys or `A` and `D` to move. Use `W` or the up arrow to jump. Avoid obstacles by dodging them or going over them.

## Remote Control via Pusher

This game now supports remote control via Pusher! You can remotely pause, resume, restart, and control the game speed.

**Configuration:**
- Cluster: `eu`
- Key: `59418388ba581a7af37d`
- Channel: `game-control`

For detailed documentation on how to use the Pusher integration, see [PUSHER_INTEGRATION.md](PUSHER_INTEGRATION.md).

**Quick Start:**
1. Open the game in your browser
2. Use the Pusher API to send events to the `game-control` channel
3. Events: `pause-game`, `resume-game`, `restart-game`, `set-speed`, `force-crash`

**Test Panel:**
Open `pusher-test-panel.html` in your browser for a simple control panel to test the Pusher integration.
