#!/usr/bin/env node

/**
 * Example Node.js script to control Snow Rider 3D game via Pusher
 * 
 * Usage:
 *   npm install pusher
 *   node examples/node-control-example.js [command]
 * 
 * Commands: pause, resume, restart, speed [value]
 */

const Pusher = require('pusher');

// Pusher configuration
// NOTE: Replace YOUR_APP_ID and YOUR_APP_SECRET with your actual values
const pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: '59418388ba581a7af37d',
  secret: 'YOUR_APP_SECRET',
  cluster: 'eu',
  useTLS: true
});

const CHANNEL = 'game-control';

/**
 * Send a command to the game
 */
async function sendCommand(command, data = {}) {
  try {
    const result = await pusher.trigger(CHANNEL, command, data);
    console.log(`✓ Command sent: ${command}`, data);
    return result;
  } catch (error) {
    console.error(`✗ Failed to send command: ${error.message}`);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Snow Rider 3D - Remote Control via Pusher');
    console.log('==========================================');
    console.log('\nUsage: node node-control-example.js [command] [args]\n');
    console.log('Available commands:');
    console.log('  pause                  - Pause the game');
    console.log('  resume                 - Resume the game');
    console.log('  restart                - Restart the game');
    console.log('  speed <value>          - Set game speed (e.g., 0.5, 1.0, 2.0)');
    console.log('\nExamples:');
    console.log('  node node-control-example.js pause');
    console.log('  node node-control-example.js speed 1.5');
    process.exit(0);
  }
  
  const command = args[0].toLowerCase();
  
  try {
    switch (command) {
      case 'pause':
        await sendCommand('pause-game', {});
        console.log('Game paused successfully');
        break;
        
      case 'resume':
        await sendCommand('resume-game', {});
        console.log('Game resumed successfully');
        break;
        
      case 'restart':
        await sendCommand('restart-game', {});
        console.log('Game restarted successfully');
        break;
        
      case 'speed':
        if (args.length < 2) {
          console.error('Error: speed command requires a value');
          console.log('Example: node node-control-example.js speed 1.5');
          process.exit(1);
        }
        const speed = parseFloat(args[1]);
        if (isNaN(speed) || speed <= 0) {
          console.error('Error: speed must be a positive number');
          process.exit(1);
        }
        await sendCommand('set-speed', { speed });
        console.log(`Game speed set to ${speed}x`);
        break;
        
      default:
        console.error(`Error: Unknown command '${command}'`);
        console.log('Run without arguments to see available commands');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { sendCommand };
