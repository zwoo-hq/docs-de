# v4.3.0 - ZRP (Zwoo Request Protocol)

## Definitions:

The ZRP is used for Communication between the Backend and Frontend

* Player: all players of a game (bots act as normal players)
* Server: zwoo server
* Host: host of the game (must be a player itself)
* Spectator: watches the game but does not participate
* Bot: special type of Player, its controlled by an algorithmn. It can't attend states like Disconnected or Spectator.
* Players sent **`Events`** to the server
* The server answers with **`Notifications`**
* An object carrying information is called a **`Message`**
* The game emits **`GameEvents`** which get translated into **`Notifications`**
* All **`Events`** and **`Notifications`** are carried by **`Messages`**
* **`GameEvents`** can trigger visual feedback to the user, known as **`UIFeedback`**

`Version: 4.3.0`

## `Message` Structure

```json
code,{<data>}
```

## Roles

```csharp
enum ZRPRole {
  Host = 1,
  Player = 2,
  Spectator = 3,
  Bot = 4
}
```

## Player State

```csharp
enum ZRPPlayerState {
  Connected = 1,
  Disconnected = 2
}
```

## Decision Type

```csharp
enum DecisionType {
  SelectColor = 1,
  SelectPlayer = 2
}
```

## SettingsType

```csharp
enum SettingType {
  Readonly = 0,
  Numeric = 1,
  Boolean = 2
}
```

## UIFeedback

**`GameEvents`** can trigger visual feedback for the user. This feedback consists of 3 integral parts: `type`, `kind`, `arguments`.

* `kind`\: defines which arguments should be used in which way
* `type`\: which feedback should be displayed
* `arguments`\: provide context for the feedback, like which players are involved

### UIFeedbackType

```
enum UIFeedbackType {
  Skipped = 1,
  DirectionChanged = 2,
  PlayerHasDrawn = 3,
  MissedLast = 4,
  DeckSwapped = 5,
  ColorChanged = 6,
}
```

### UIFeedbackKind

```
enum UIFeedbackKind {
  Individual = 1, // single user involved
  Interaction = 2, // interaction between two users
  Unaffected = 3 // no user directly involved
}
```

### UIFeedbackArguments

The **core** arguments are the following, these indicate, that the client can safely resolve usernames from them.

* Individual: `{ `**`target`**`: <id> }`
* Interaction: `{ `**`target`**`: <id>, `**`origin`**`: <id> }`
* Unaffected: `{}`

Besides these, each Feedback Event may define **further** arguments, other well known one are:

* `{ amount: <a transferred amount of cards> }`

### GameProfileGroup

```
enum GameProfileGroup {
  System = 1,
  User = 2,
}
```

## Codes

### General (1xx)

#### *100*  player joined `Notification` (Server)

a `Player` joins the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    "username": <player username: string>,
    "wins": <player wins: number>, [v4.0.0]
    "isBot": <player is bot: boolean> [v4.0.0]
    // "wins": <player wins: number> [deprecated: v2.0.0]
    // "id": <player public id: string> [deprecated v4.0.0]
}
```

#### *101*  spectator joined `Notification` (Server)

a `Spectator` joins the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    "username": <player username: string>,
    // "wins": <player wins: number> [deprecated: v2.0.0]
    // "id": <player public id: string> [deprecated v4.0.0]
}
```

#### *102*  player left `Notification` (Server)

a `Player` left the game

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated: v4.0.0]
}
```

#### *103*  spectator left `Notification` (Server)

a `Spectator` left the game

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <spectator username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated: v4.0.0]
}
```

#### *104*  chat message `Event` (Player/Spectator)

a `Player` or `Spectator` wants to send a message in the chat

```json
{
    "message": <message content: string>
}
```

#### *105*  chat Message `Notification` (Server)

the `Server` forwards  a chat message from a `Player` or `Spectator`

```json
{ 
    "id": <sender game id: number>, [v4.0.0]
    "message": <message: string>,
    // "role": <senders role: number> [deprecated v4.0.0]
    // "username": <sender username: string> [deprecated v4.0.0]
}
```

#### *106*  leave `Event` (Player/Spectator)

a `Player` or `Spectator` wants to leave the game

```json
{}
```

#### *108*  get lobby `Event` (Player/Spectator)

a `Player` or `Spectator` needs all players of their current lobby

```json
{}
```

#### *109*  get lobby `Notification` (Server)

sends all `Players` & `Spectators` of the [`Callers[#108]`](#108-get-lobby-Event-PlayerSpectator) current lobby

```json
{
    "players": [
         {
             "id": <player game id: number>, [v4.0.0]
             "username": <username: string>,
             "role": <user role: number>,
             "state": <player state: number>, [v1.5.0]
             "wins": <player wins: number> [v4.0.0]
             // "wins": <wins: number> [deprecated v2.0.0]
             // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
         }
    ]
}
```

#### *110*  spectator to player `Event` (Spectator)

a `Spectator` wants to join the game and play

```json
{}
```

#### *111*  player to spectator `Event` (Player)

a `Player` wants to stop playing and but keep spectating

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *112*  player to host `Event` (Host)

the `Host` wants to give his host role to another `Player`

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *113*  you are host `Notification` (Server)

notifies a `Player` that he is now the host of the game

```json
{}
```

#### *114*  new host `Notification` (Server)

notifies all `Players` and `Spectators` of a game that the game has a new `Host`

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *115*  kick player `Event` (Host)

the `Host` removes a `Player` or `Spectator` from the game

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *116*  player changed role `Notification` (Server)

notifies all `Players` and `Spectators` that a `Host` or `Player` or `Spectator` changed its role

```json
{
    "id": <player game id: number>, [v4.0.0]
    "role": <player role: number>,
    "wins": <player wins: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
    // "wins": <player wins: string> [deprecated v2.0.0]
}
```

#### *117*  player disconnected `Notification` (Server) [v1.4.0]

notifies all `Players` and `Spectators` of a game the a `Player` disconnected from the game without leaving

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *118*  player reconnected `Notification` (Server) [v1.4.0]

notifies all `Players` and `Spectators` of a game the a `Player` who disconnected first now reconnected to the game

```json
{
    "id": <player game id: number> [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *198*  keep alive `Event` (Player/Spectator) [v1.1.0]

used to keep the websocket connections alive and timeouts

```json
{ }
```

#### *199*  ack keep alive `notification` (Server) [v1.1.0]

acknowledge the keep alive event

```json
{ }
```

### Lobby (2xx)

Codes used for setting up the game in the lobby phase (mostly communication between Host and Server)

#### *200*  update setting `Event` (Host)

the `Host` sends this when he wants to change a setting

```json
{
    "setting": <setting path: string>,
    "value": <new value: string>
}
```

#### *201*  setting changed notification (Server)

notifies all `Players` and `Spectators` that a settings of the game changed

```json
{
    "setting": <setting path: string>,
    "value": <new value: string>
}
```

#### *202*  get settings `Event` (Player/Spectator)

a `Player` or `Spectator` requests all current game settings

```json
{}
```

#### *203*  all settings `Notification` (Server)

sends the [`Caller[#202]`](#202-get-settings-Event-PlayerSpectator) all game settings

```json
{
    "settings": [
        {
            "setting": <setting path: string>,
            "value": <setting value: number>,
            "title": <setting title: string>, [v3.2.0]
            "description": <setting description: string>, [v3.2.0]
            "type": <setting type: SettingsType>, [v3.2.0]
            "min": <numeric min value: number>, [v3.2.0]
            "max": <numeric max value: number>, [v3.2.0]
            "isReadonly": <whether the value can be changed: boolean> [v3.2.0]
        }
    ]
}
```

#### *204* get game profiles `Event` (Host) [v4.3.0]

sends the [`Caller[#202]`](#202-get-settings-Event-PlayerSpectator) all game settings

```json
{}
```

#### *205* all game profiles `Notification` (Server) [v4.3.0]

sends the [`Caller[#204]`](#204-get-game-profiles-event-host-v430) all game profiles

all profiles should be displayed with a group reference, since the group reference implicitly communicates access restrictions (like read/write)

```json
{
    "profiles": [
      {
        "id": <profile id: string>,
        "name": <profile name: string>,
        "group": <profile group name: GameProfileGroup>
      }
    ]
}
```

#### *206* safe to profile `Event` (host) [v4.3.0]

sends a request to the game server to safe the current settings into a profile

```json
{
  "name": <profile name: string>,
}
```

#### *207* update game profile `Event` (Host) [v4.3.0]

sends a update the select profile

```json
{
  "id": <profile id: string>
}
```

#### *208* apply game profile `Event` (Host) [v4.3.0]

sends a request to the game server to apply a certain game profile

```json
{
  "id": <profile id: string>
}
```

#### *209* delete game profile `Event` (Host) [v4.3.0]

sends a request to the game server to delete a game profile

```json
{
  "id": <profile id: string>
}
```

#### *210*  start game `event` (Host)

the `Host` sends this event when the game should start

```json
{}
```

#### *230*  create bot `Event` (Host) [v2.0.0]

the `Host` creates a new bot for the game

```json
{
  "username": <bot name: string>,
  "config": {
    "type": <config preset type: number>
  }
}
```

#### *231*  bot joined `Notification` (Server) [v2.0.0]

notifies all `Players` and `Spectators` that a new `Bot` joined the game

```json
{
    "id": <bot game id: number>, [v4.0.0]
    "username": <bot username: string>,
    "wins": <bot wins: number> [v4.0.0]
    // "id": <player public id: string>, [deprecated: v4.0.0]
}
```

#### *232*  bot left `Notification` (Server) [v2.0.0]

notifies all `Players` and `Spectators` that a `Bot` left the game

```json
{
  "id": <bot game id: number> [v4.0.0]
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### *233*  update bot `Event` (Host) [v2.0.0]

the `Host` updates the configuration of a bot

```json
{
  "id": <bot game id: number>, [v4.0.0]
  "config": {
    "type": <number>
  }
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### [reserved\|not implemented] *234*  bot updated `Notification` (Server)

[will be used to notify other clients about changes in bots]

#### *235*  delete bot `Event` (Host) [v2.0.0]

the `Host` removed a bot from the game

```json
{
  "id": <bot game id: number> [v4.0.0]
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### *236*  get bots `Event` (Host) [v2.0.0]

send by a (new) `Host` to get the configuration off all current bots

```json
{}
```

#### *237*  all bots `Notification` (Server) [v2.0.0]

sends the [`Caller[#235]`](#235-get-bots-Event-Host) the configuration of all current bots

```json
{
  	"bots": [
      {
        "id": <bot game id: number> [v4.0.0]
        "username": <bot username: string>,
        "wins": <bot wins: number> [v4.0.0]
        "config": {
          "type": <number>
        }
        // "id": <bot public id: string> [deprecated v4.0.0]
      }
    ]
}
```

### Game (3xx)

All codes for the actual game.

#### *300*  game started `Notification` (Server)

broadcasted by the `Server` when the game started

```json
{
    "hand": [
        {
            "type": <card type: number>,
            "symbol": <card symbol: number>
        }
    ], [v4.0.0]
    "players": [
      {
        "id": <player game id: number>,
        "username": <player id path: string>,
        "cards": <amount: number>,
        "isActivePlayer": <isActive: boolean>,
        "order": <orderInGame: number>
      }
    ], [v4.0.0]
    "pile": {
        "type": <card type: number>,
        "symbol": <card symbol: number>
    } [v4.0.0]
}
```

#### *301*  start turn `Notification` (Server)

notifies a player that his turn started

```json
{}
```

#### *302*  end turn `Notification` (Server)

notifies a player that his turn ended

```json
{}
```

#### *303*  request end turn `Event` (Player)

a `Player` requests his turn to be ended

```json
{}
```

#### *304*  place card `Event` (Player)

send by a `Player` when he wants to place a card

```json
{
    "type": <card type: number>,
    "symbol": <card symbol: number>
}
```

#### *305*  draw card `Event` (Player)

a `Player` wants to draw a card from the pile

```json
{}
```

#### *306*  send cards `Notification` (Server)

sends a `Player` a new card

```json
{
  "cards": [
    {
      "type": <card type: number>,
      "symbol": <card symbol: number>
    }
  ] [v2.0.0]
  // "type": <card type: number> [deprecated v2.0.0]
  // "symbol": <card symbol: number> [deprecated v2.0.0]
}
```

#### *307*  remove card `Notification` (Server)

notifies a `Player` that one of his cards should be removed from is deck

```json
{
  "cards": [
    {
      "type": <card type: number>,
      "symbol": <card symbol: number>
    }
  ] [v3.3.0]
  //  "type": <card type: number> [deprecated v3.3.0]
  //  "symbol": <card symbol: number> [deprecated v3.3.0]
}
```

#### *308*  state update `Notification` (Server)

notifies all `Players` and `Spectators` whenever the game state updates

```json
{
    "pileTop": {
      "type": <card type: number>,
      "symbol": <card symbol: number>,
    },
    "activePlayer": <player game id: number>, [v4.0.0]
    "cardAmounts": <card amounts of subset of players: Dictionary<number, number>>, [v4.0.0]
    "currentDrawAmount": <amount active player would draw: number | null>, [v3.0.0]
    "feedback": [
      {
        "type": <the feedbacks type: UIFeedbackType>,
        "kind": <the feedbacks kind: UIFeedbackKind>,
        "args": <the context, see UIFeedbackArguments>
      }
    ] [v4.1.0]
    // "activePlayerCardAmount": <amount: number> [deprecated v3.0.0]
    // "lastPlayer": <player public id: string> [deprecated v3.0.0]
    // "lastPlayerCardAmount": <amount: number> [deprecated v3.0.0]
    // "activePlayer": <playerName: string> [deprecated v2.0.0]
    // "lastPlayer": <playerName: string> [deprecated v2.0.0]
    // "activePlayer": <player public id: string> [v2.0.0] [deprecated v4.0.0]
    // "cardAmounts": <card amounts of subset of players: Dictionary<string, number>> [3.0.0] [deprecated v4.0.0]
}
```

#### *310*  get deck `Event` (Player)

request all cards that the `Caller` has in its deck

```json
{}
```

#### *311*  send deck `Notification` (Server)

sends the [`Caller[#310]`](#310-get-deck-Event-Player) his current deck

```json
{
    "hand": [
        {
            "type": <card type: number>,
            "symbol": <card symbol: number>
        }
    ]
}
```

#### *312* get player state `Event` (Player/Spectator)

requests all active players amount of cards on their deck

```json
{}
```

#### *313*  send player card Amount `Notification` (Server)

sends the [`Caller[#312]`](#312-get-player-state-Event-PlayerSpectator) the card amounts of all active players

```json
{
    "players": [
      {
        "id": <player game id: number>, [v4.0.0]
        "username": <player id path: string>,
        "cards": <amount: number>,
        "isActivePlayer": <isActive: boolean>,
        "order": <orderInGame: number> [v1.2.0]
        // "id": <player public id: string>, [v2.0.0] [deprecated v4.0.0]
      }
    ]
}
```

#### *314*  get pile top `Event` (Player/Spectator)

request the current top most card on the stack

```json
{}
```

#### *315*  send pile top `Notification` (Server)

sends the [`Caller[#314]`](#314-get-pile-top-Event-PlayerSpectator) the current top most card

```json
{
    "type": <card type: number>,
    "symbol": <card symbol: number>
}
```

#### *316*  get player decision `Notification` (Server)

request a decision from a `Player`

```json
{
    "type": <modalType: number>,
    "options": <availableOptions: string[]> [v3.1.0]
}
```

#### *317*  player decision `Event` (Player)

answers a [`Server[#316]`](#316-get-player-decision-Notification-Server) request

```json
{
    "type": <decision type: number>,
    "decision": <decision result (index of options): number>
}
```

> as decision type currently only numbers are supported
>
> the interpretation of these values is handled implicitly

#### *399*  player won `Notification` (Server)

the `Server` notifies all clients that a `Player` has won the game - the game is finished

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "wins": <player wins: number> [deprecated: v2.0.0]
    // "id": <player public id: string>, [v2.0.0] [deprecated v4.0.0]
    // "username": <player username: string> [deprecated v4.0.0]
    "summary": [
      {
        "id": <player game id: number>, [v4.0.0]
        "position": <gameRank: number>, // counting from 1 (1., 2., ...)
        "score": <gameScore: number>
        // "id": <player public id: string>, [v2.0.0] [deprecated v4.0.0]
        // "username": <playerName: string>, [deprecated v4.0.0]
      }
    ]
}
```

### Errors (4xx)

informs the (mostly) client about failed or disallowed operations

#### *400* general error `Notification` (Server)

sent when no matching error is available

```json
{
    "message": <message: string>
}
```

#### *420*  access denied error `Notification` (Server)

notfies a `Player` that he cant perform this operation (eg. a player sends `Host` scoped `Events`)

```json
{
    "message": <message: string>
}
```

#### *421*  lobby full error `Notification `(Server) [1.3.0]

notify a player that he cant join the lobby because it is full

```json
{
    "message": <message: string>
}
```

> this error is primarily used for spectator to player role changes

#### *425*  bot name exists error `Notification` (Server) [v2.0.0]

notify a host that he cant create a bot because the name is already used

```json
{
    "message": <message: string>
}
```

#### *426*  empty pile error `Notification` (Server) [v4.2.1]

notify a `Host` that the game cannot be started caused by as misconfiguration of the game

```json
{
    "code": <error code: number>
    "message": <display message: string>
}
```

#### *434*  place card error `Notification` (Server)

notify a `Player` that he cant place this card

```json
{
    "code": <error code: number>
    "message": <display message: string>
}
```

## Changelog

### v1.1.0

Added

* 198 KeepAlive (Player)
* 199 AckKeepAlive (Server)

### v1.2.0

Added

* 313 Added `Player` order

### v1.3.0

Added

* 421 Lobby Full Error

### v1.4.0

Added

* 117 PlayerDisconnected (Server)
* 118 PlayerReconnected (Server)

### v1.5.0

> introduced the concept of player states

Modified

* 109 Added Player State

### v2.0.0

> introduced the concept of technical players
>
> introduced the defintion of `Events`, `Notifications` and `Messages`
>
> added role `Bot`
>
> made the ZRP offline ready
>
> differentiate between username and player ids (to avoid username collisions)
>
> smaller cleanup changes

Removed

* `wins` property on codes 100; 101; 109; 116; 399

Modified

* 306 is now capable of sending multiple cards at once

Added

* 230-237: Bot management in games
* 425: bot name collision error

### **v3.0.0**

Modified

* 308 changed updating player card amounts, added property for current draw amount

Added

* 303 Request End Turn

### **v3.1.0**

Modified

* 317 player decision notification can send options

Added

* Decision Type 2 (Select Player)

### **v3.2.0**

Modified

* 203 rules/rule editing is configured by backend

### **v3.3.0**

Modified

* 307 is now capable of sending multiple cards at once

### **v4.0.0**

> transform username based public ids to numeric game/lobby scoped ids
>
> reintroduce wins property

Modified

* 300 send initial game state
* 399 remove username properties

### v4.1.0

> Introduced the concept of UIFeedback

Modified

* 308 send feedbacks

### v4.2.0

Modified

* SettingType: add option Readonly

**v4.2.1**

Added

* 426: empty pile error

**v4.3.0**

Added

* 204, 205, 206, 207, 208, 209: Game Profiles Concept