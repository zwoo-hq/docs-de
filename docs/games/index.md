# Games

::: tip WIP
This section of the documentation is a work in progress. Content may be incomplete or subject to change.
:::

ZWOO can be played in a variety of ways. The most popular one are online games, where you can play with your friends or other players from all over the world. But you can also play ZWOO in a local network on lan parties or even offline against bots.

- [Online games](./online-games)
- [Local games](./local-games)
- [Offline games](./offline-games)

For online games theres a global [leaderboard](./leaderboard), where you can compare your skills with other players. 

## Game modes

Zwoo currently supports only the standard game mode. But we are contently working on new features and experimental game modes. If you have an idea for a new game mode, feel free to contact us.

## Playing games

Independent of the environment you are playing in, the way games are played is always the same. You can get started by either [creating your own game](#todo) or [joining an existing game](#todo).

## Roles

In a game, there are 3 different roles one can have:

- **Host**: The usually host is the player who created the game. There is at most one host per game and he is the leader of the game and can manage players, configure rules or start the game. The host is able to kick players from the game or to promote another player to host which will transfer the host role to the promoted player.
- **Player**: A player is a normal participant of the game. He can play the game and interact with the host and other players. A player can leave the game or switch to spectator mode as long the game is not started.
- **Specator**: A spectator is a player who is not actively participating in the game. He can watch the game and chat with other spectators or players. As long the game is not started, a spectator can switch to player mode at any time.

## The lobby

Once you created or joined a game, you will start off in the lobby. The Lobby UI consists of multiple widgets, of which depending on your role or environment, not always all are visible.

### Players

The players widget contains a list of all participating players in th game. It shows the players name and his role. The host is marked with a crown icon. When the game contains bots, they are also shown in the players list and are marked with a bot icon.

In the players widget, the host kan manage the players. He can kick players from the game, promote the to host or switch them to spectator mode.

### Spectators

The spectators widget contains a list of all spectators in the game. It shows the spectators name. 

Here the host is able to kick spectators from the game.

### Chat

The chat widget is a simple chat where all players and spectators can chat with each other. The chat is used to communicate with other players, to discuss game strategies or to just have fun.

[If configured](#todo) the chat can also contain events that happened in the game.

### Rules

The rules widget contains the game rules. It shows the rules that are currently configured for the game. While spectators or players can only view the rules, the host can also configure them.

Instead og configuring each rule manually, the host can also choose from a list of predefined or self created [game profiles](./game-profiles).

### Bots

The bots widget contains a list of all bots that are currently in the game.  The host can add or remove bots from the game and configure their difficulty level.

## In game

Once the host starts the game, the game will begin. The game UI will change and show the players current hand. In the middle of the screen is the top card of the discard pile. On the left side of the screen is the draw pile. In the bar on the top of the screen are the players names and their current card amount. The currently active player will be highlighted.

## Summary

After a game was finished, a summary will be shown. This includes a leaderboard with the players and their scores.

After the game ended each player can decide whether they want to player another game or leave the game.