#!/usr/bin/env python3

"""
Example Python script to control Snow Rider 3D game via Pusher

Usage:
    pip install pusher
    python examples/python-control-example.py [command] [args]

Commands: pause, resume, restart, speed [value]
"""

import sys
import pusher

# Pusher configuration
# NOTE: Replace YOUR_APP_ID and YOUR_APP_SECRET with your actual values
pusher_client = pusher.Pusher(
    app_id='YOUR_APP_ID',
    key='59418388ba581a7af37d',
    secret='YOUR_APP_SECRET',
    cluster='eu',
    ssl=True
)

CHANNEL = 'game-control'


def send_command(event_name, data=None):
    """Send a command to the game via Pusher"""
    if data is None:
        data = {}
    
    try:
        pusher_client.trigger(CHANNEL, event_name, data)
        print(f'✓ Command sent: {event_name}', data)
        return True
    except Exception as e:
        print(f'✗ Failed to send command: {str(e)}', file=sys.stderr)
        return False


def show_help():
    """Display help message"""
    print('Snow Rider 3D - Remote Control via Pusher')
    print('=' * 42)
    print('\nUsage: python python-control-example.py [command] [args]\n')
    print('Available commands:')
    print('  pause                  - Pause the game')
    print('  resume                 - Resume the game')
    print('  restart                - Restart the game')
    print('  speed <value>          - Set game speed (e.g., 0.5, 1.0, 2.0)')
    print('\nExamples:')
    print('  python python-control-example.py pause')
    print('  python python-control-example.py speed 1.5')


def main():
    """Main function"""
    if len(sys.argv) < 2:
        show_help()
        sys.exit(0)
    
    command = sys.argv[1].lower()
    
    try:
        if command == 'pause':
            if send_command('pause-game'):
                print('Game paused successfully')
            else:
                sys.exit(1)
                
        elif command == 'resume':
            if send_command('resume-game'):
                print('Game resumed successfully')
            else:
                sys.exit(1)
                
        elif command == 'restart':
            if send_command('restart-game'):
                print('Game restarted successfully')
            else:
                sys.exit(1)
                
        elif command == 'speed':
            if len(sys.argv) < 3:
                print('Error: speed command requires a value', file=sys.stderr)
                print('Example: python python-control-example.py speed 1.5')
                sys.exit(1)
            
            try:
                speed = float(sys.argv[2])
                if speed <= 0:
                    raise ValueError('Speed must be positive')
                    
                if send_command('set-speed', {'speed': speed}):
                    print(f'Game speed set to {speed}x')
                else:
                    sys.exit(1)
            except ValueError as e:
                print(f'Error: Invalid speed value - {str(e)}', file=sys.stderr)
                sys.exit(1)
                
        else:
            print(f"Error: Unknown command '{command}'", file=sys.stderr)
            print('Run without arguments to see available commands')
            sys.exit(1)
            
    except Exception as e:
        print(f'Error: {str(e)}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
