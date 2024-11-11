# ZRP (Zwoo Request Protocol)

The ZRP is used for Communication between the game server an a playing client. 

Its a simple protocol on top of WebSockets using JSON as data format.

## Definitions:

* **`Server`**: the zwoo game server
* **`Client`**: a player or spectator connected to the server
* **`Player`**: all players of a game (bots act as normal players)
* **`Host`**: a special type of `Player`, he can change settings and start the game
* **`Spectator`**: watches the game but does not participate
* **`Bot`**: special type of `Player`, its controlled by an algorithm. It can't attend states like Disconnected or Spectator.

* **`Message`**: a logical unit of communication between the `Client` and the `Server`, either a `Event` or `Notification`, can consist of multiple WebSocket frames
* **`Event`**: a message sent from a `Player` or `Spectator` to the `Server`
* **`Notification`**: a message sent from the `Server` to a `Player` or `Spectator`

* **`GameEvent`**: a domain specific event, like a player joined the game emitted by the `Server`. This will be translated into a ZRP `Notification` and sent to the `Client`.

Current Version: `5.0.0`

## `Message` Structure

```json
code,<data>
```

The Code is a number, used to identify the type of the message. The data is a JSON object, containing the actual payload of the message.

## General Types

### Roles

Every client has a role, which defines what he can do in the game.

```csharp
enum ZRPRole {
  Host = 1,
  Player = 2,
  Spectator = 3,
  Bot = 4
}
```

### Player State

The connection state of a client. This applies to `Players` and `Spectators`, `Bots` are always connected.

```csharp
enum ZRPPlayerState {
  Connected = 1,
  Disconnected = 2
}
```

### Card Color [v5.0.0]

All possible card colors in the game.

```csharp
public enum CardColor
{
    None = 0,
    Red = 1,
    Yellow = 2,
    Blue = 3,
    Green = 4,
    Black = 5
}
```

### Card Type [v5.0.0]

All possible card types in the game.

```csharp
public enum CardType
{
    None = 0,
    Zero = 1,
    One = 2,
    Two = 3,
    Three = 4,
    Four = 5,
    Five = 6,
    Six = 7,
    Seven = 8,
    Eight = 9,
    Nine = 10,
    Skip = 11,
    Reverse = 12,
    DrawTwo = 13,
    Wild = 14,
    WildFour = 15
}
```

### Card [v5.0.0]

A card is a common object, used in multiple `Events` and `Notifications`.

```json
{
  "color": <card color enum: number>,
  "type": <card type enum: number>
}
```


### Decision Type

The type of a decision, which can be requested from a player.

```csharp
enum DecisionType {
  SelectColor = 1,
  SelectPlayer = 2
}
```

### Settings Type

The data type of a setting.

```csharp
enum SettingType {
  Readonly = 0,
  Numeric = 1,
  Boolean = 2
}
```

### UIFeedback

**`GameEvents`** can trigger visual feedback for the user. This feedback consists of 3 integral parts: `type`, `kind`, `arguments`.

* `kind`\: defines which arguments should be used in which way
* `type`\: which feedback should be displayed
* `arguments`\: provide context for the feedback, like which players are involved

#### UIFeedbackType

```csharp
enum UIFeedbackType {
  Skipped = 1,
  DirectionChanged = 2,
  PlayerHasDrawn = 3,
  MissedLast = 4,
  DeckSwapped = 5,
  ColorChanged = 6,
}
```

#### UIFeedbackKind

```csharp
enum UIFeedbackKind {
  Individual = 1, // single user involved
  Interaction = 2, // interaction between two users
  Unaffected = 3 // no user directly involved
}
```

#### UIFeedbackArguments

The **core** arguments are the following, these indicate, that the client can safely resolve usernames from them.

* Individual: `{ `**`target`**`: <id> }`
* Interaction: `{ `**`target`**`: <id>, `**`origin`**`: <id> }`
* Unaffected: `{}`

Besides these, each Feedback Event may define **further** arguments, other well known one are:

* `{ amount: <a transferred amount of cards> }`

### GameProfileGroup [deprecated v5.0.0]

```csharp
enum GameProfileGroup {
  System = 1,
  User = 2,
}
```

## Codes

### General (1xx)

#### *100* PlayerJoined`Notification`

A `Player` joined the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    "username": <player username: string>,
    "isBot": <player is bot: boolean>, [v4.0.0]
    "score": <player score: number>, [v5.0.0]
    // "wins": <player wins: number> [deprecated v2.0.0]
    // "id": <player public id: string> [deprecated v4.0.0]
    // "wins": <player wins: number>, [v4.0.0, deprecated v5.0.0]
}
```

#### *101* SpectatorJoined`Notification`

A `Spectator` joined the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    "username": <player username: string>,
    // "wins": <player wins: number> [deprecated: v2.0.0]
    // "id": <player public id: string> [deprecated v4.0.0]
}
```

#### *102* PlayerLeft`Notification`

A `Player` left the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated: v4.0.0]
}
```

#### *103* SpectatorLeft`Notification`

A `Spectator` left the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <spectator username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated: v4.0.0]
}
```

#### *104* ChatMessage`Event`

Roles: `Host`, `Player`, `Spectator`, `Bot`

A client wants to send a message in the chat.

```json
{
    "message": <message content: string>
}
```

#### *105* ChatMessage`Notification`

The `Server` forwards a chat message from a client to all other clients.

```json
{ 
    "id": <sender game id: number>, [v4.0.0]
    "message": <message: string>,
    // "role": <senders role: number> [deprecated v4.0.0]
    // "username": <sender username: string> [deprecated v4.0.0]
}
```

#### *106* Leave`Event`

Roles: `Host`, `Player`, `Spectator`

A client wants to leave the game.

```json
{}
```

#### *108* GetLobby`Event`

Roles: `Host`, `Player`, `Spectator`, `Bot`

A client wants to get all players and spectators in the current lobby.

```json
{}
```

#### *109* GetLobby`Notification`

Sends all clients in the current Lobby to the [`Callers[#108]`](#108-getlobbyevent).

```json
{
    "players": [
         {
             "id": <player game id: number>, [v4.0.0]
             "username": <username: string>,
             "role": <user role: number>,
             "state": <player state: number>, [v1.5.0]
             "score": <player score: number>, [v5.0.0]
             // "wins": <wins: number> [deprecated v2.0.0]
             // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
             // "wins": <player wins: number> [v4.0.0, detracted v5.0.0]
         }
    ]
}
```

#### *110* SpectatorToPlayer`Event`

Roles: `Spectator`

A `Spectator` wants to join the game and play.

```json
{}
```

#### *111* PlayerToSpectator`Event`

Roles: `Player`

A `Player` wants to stop playing and but keep spectating.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *112* PlayerToHost`Event`

Roles: `Host`

The `Host` wants to give his host role to another `Player`.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *113* YouAreHostNow`Notification`

Notifies a `Player` that he is now the host of the game.

```json
{}
```

#### *114* NewHost`Notification`

Notifies all `Players` and `Spectators` of a game that the game has a new `Host`

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *115* KickPlayer`Event`

Roles: `Host`

The `Host` removes a `Player` or `Spectator` from the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *116* PlayerChangedRole`Notification`

Notifies all clients that a another client changed its role.

```json
{
    "id": <player game id: number>, [v4.0.0]
    "role": <player role: number>,
    "score": <player score: number>, [v5.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
    // "wins": <player wins: string> [deprecated v2.0.0]
    // "wins": <player wins: number> [v4.0.0, deprecated v5.0.0]
}
```

#### *117* PlayerDisconnected`Notification` [v1.4.0]

Notifies all clients of a game the a `Player` disconnected from the game without leaving.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *118* PlayerReconnected`Notification` [v1.4.0]

Notifies all clients of a game the a `Player` who disconnected first now reconnected to the game.

```json
{
    "id": <player game id: number>, [v4.0.0]
    // "username": <player username: string> [deprecated: v2.0.0]
    // "id": <player public id: string> [v2.0.0] [deprecated v4.0.0]
}
```

#### *198* KeepAlive`Event` [v1.1.0]

Roles: `Host`, `Player`, `Spectator`, `Bot`

Used to keep the websocket connections alive and timeouts.

```json
{ }
```

#### *199* AckKeepAlive`Notification` [v1.1.0]

Acknowledge a keep alive event.

```json
{ }
```

### Lobby (2xx)

Codes used for setting up the game in the lobby phase (mostly communication between Host and Server)

#### *200* UpdateSetting`Event`

Roles: `Host`

The `Host` changes a setting of the game.


```json
{
    "setting": <setting path: string>,
    "value": <new value: string>
}
```

#### *201* SettingChanged`Notification`

Notifies all clients that a settings of the game changed.

```json
{
    "setting": <setting path: string>,
    "value": <new value: string>
}
```

#### *202* GetSettings`Event`

Roles: `Host`, `Player`, `Spectator`, `Bot`

A client requests all current game settings.

```json
{}
```

#### *203*  AllSettings`Notification`

Sends the [`Caller[#202]`](#202-getsettingsevent) all game settings.

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

#### *210* StartGame`Event`

Roles: `Host`

The `Host` starts the game.

```json
{}
```

#### *230* CreateBot`Event` [v2.0.0]

Roles: `Host`

The `Host` creates a new bot for the game.

```json
{
  "username": <bot name: string>,
  "config": {
    "type": <config preset type: number>
  }
}
```

#### *231* BotJoined`Notification` [v2.0.0]

Notifies all clients that a new `Bot` joined the game.

```json
{
    "id": <bot game id: number>, [v4.0.0]
    "username": <bot username: string>,
    "wins": <bot wins: number>, [v4.0.0]
    // "id": <player public id: string>, [deprecated: v4.0.0]
}
```

#### *232* BotLeft`Notification` [v2.0.0]

Notifies all clients that a `Bot` left the game.

```json
{
  "id": <bot game id: number>, [v4.0.0]
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### *233* UpdateBot`Event` [v2.0.0]

Roles: `Host`

The `Host` updates the configuration of a bot.

```json
{
  "id": <bot game id: number>, [v4.0.0]
  "config": {
    "type": <number>
  }
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### [reserved\|not implemented] *234* BotUpdated`Notification`

[will be used to notify other clients about changes in bots]

#### *235* DeleteBot`Event` [v2.0.0]

Roles: `Host`

The `Host` removed a bot from the game.

```json
{
  "id": <bot game id: number>, [v4.0.0]
  // "id": <bot public id: string> [deprecated v4.0.0]
}
```

#### *236* GetBots`Event` [v2.0.0]

Roles: `Host`

A a (new) `Host` requests the configuration off all current bots.

```json
{}
```

#### *237* AllBots`Notification` [v2.0.0]

Sends the [`Caller[#235]`](#235-deletebotevent-v200) the configuration of all current bots.

```json
{
  	"bots": [
      {
        "id": <bot game id: number>, [v4.0.0]
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

#### *300* GameStarted`Notification`

Broadcasted by the `Server` when the game started.

```json
{
  "players": [
    {
      "id": <player game id: number>,
        "username": <player id path: string>,
        "cards": <amount: number>,
        "isActivePlayer": <isActive: boolean>,
        "order": <orderInGame: number>
      }
    ], [v4.0.0]
    "hand": [<cards: Card[]>], [v5.0.0]
    "pile": <Card>, [v5.0.0]
    // "hand": [
    //     {
    //         "type": <card type: number>,
    //         "symbol": <card symbol: number>
    //     }
    // ], [v4.0.0, deprecated v5.0.0]
    // "pile": {
    //   "type": <card type: number>,
    //     "symbol": <card symbol: number>
    // } [v4.0.0, deprecated v5.0.0]
}
```

#### *301* StartTurn`Notification`

Notifies a player that his turn started.

```json
{}
```

#### *302* EndTurn`Notification`

Notifies a player that his turn ended.

```json
{}
```

#### *303* RequestEndTurn`Event`

Roles: `Host`, `Player`, `Bot`

A `Player` requests his turn to be ended.

```json
{}
```

#### *304* PlaceCard`Event`

Roles: `Host`, `Player`, `Bot`

Send by a `Player` when he wants to place a card.

```json
{
  <card: Card>, [v5.0.0]
  // "type": <card type: number>, [deprecated v5.0.0]
  // "symbol": <card symbol: number> [deprecated v5.0.0]
}
```

#### *305* DrawCard`Event`

Roles: `Host`, `Player`, `Bot`

A `Player` wants to draw a card from the pile.

```json
{}
```

#### *306* SendCards`Notification`

Sends a `Player` a new card.

```json
{
  "cards": [<cards: Card[]>], [v5.0.0]
  // "cards": [
  //   {
  //     "type": <card type: number>,
  //     "symbol": <card symbol: number>
  //   }
  // ] [v2.0.0, deprecated v5.0.0]
  // "type": <card type: number> [deprecated v2.0.0]
  // "symbol": <card symbol: number> [deprecated v2.0.0]
}
```

#### *307* RemoveCard`Notification`

Notifies a `Player` that one of his cards should be removed from is deck.

```json
{
  "cards": [<cards: Card[]>], [v5.0.0]
  // "cards": [
  //   {
  //     "type": <card type: number>,
  //     "symbol": <card symbol: number>
  //   }
  // ] [v3.3.0, deprecated v5.0.0]
  //  "type": <card type: number> [deprecated v3.3.0]
  //  "symbol": <card symbol: number> [deprecated v3.3.0]
}
```

#### *308* StateUpdate`Notification`

Notifies all `Players` and `Spectators` whenever the game state updates.

```json
{
    "activePlayer": <player game id: number>, [v4.0.0]
    "cardAmounts": <card amounts of subset of players: Dictionary<number, number>>, [v4.0.0]
    "currentDrawAmount": <amount active player would draw: number | null>, [v3.0.0]
    "feedback": [
      {
        "type": <the feedbacks type: UIFeedbackType>,
        "kind": <the feedbacks kind: UIFeedbackKind>,
        "args": <the context, see UIFeedbackArguments>
      }
    ], [v4.1.0]
    "pileTop": [<cards: Card[]>], [v5.0.0]
    // "activePlayerCardAmount": <amount: number> [deprecated v3.0.0]
    // "lastPlayer": <player public id: string> [deprecated v3.0.0]
    // "lastPlayerCardAmount": <amount: number> [deprecated v3.0.0]
    // "activePlayer": <playerName: string> [deprecated v2.0.0]
    // "lastPlayer": <playerName: string> [deprecated v2.0.0]
    // "activePlayer": <player public id: string> [v2.0.0] [deprecated v4.0.0]
    // "cardAmounts": <card amounts of subset of players: Dictionary<string, number>> [3.0.0] [deprecated v4.0.0]
    // "pileTop": {
    //   "type": <card type: number>,
    //   "symbol": <card symbol: number>,
    // } [deprecated v5.0.0]
}
```

#### *310* GetDeck`Event`

Roles: `Host`, `Player`, `Bot`

Request all cards that the `Caller` has in its deck.

```json
{}
```

#### *311* SendDeck`Notification`

Sends the [`Caller[#310]`](#310-getdeckevent) his current deck.

```json
{
    "hand": [<cards: Card[]>], [v5.0.0]
    // "hand": [
    //     {
    //         "type": <card type: number>,
    //         "symbol": <card symbol: number>
    //     }
    // ] [deprecated v5.0.0]
}
```

#### *312* GetPlayerState`Event`

Roles: `Host`, `Player`, `Bot`

Requests all active players amount of cards on their deck.

```json
{}
```

#### *313* SendPlayerState`Notification`

Sends the [`Caller[#312]`](#312-getplayerstateevent) the card amounts of all active players.

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

#### *314* GetPileTop`Event`

Roles: `Host`, `Player`, `Bot`

Request the current top most card on the stack.

```json
{}
```

#### *315* SendPileTop`Notification`

Sends the [`Caller[#314]`](#314-getpiletopevent) the current top most card.

```json
{
    <card: Card> [v5.0.0]
    // "type": <card type: number> [deprecated v5.0.0],
    // "symbol": <card symbol: number> [deprecated v5.0.0]
}
```

#### *316* GetPlayerDecision`Notification`

Roles: `Host`, `Player`, `Bot`

Request a decision from a `Player`.

```json
{
    "type": <modalType: number>,
    "options": <availableOptions: string[]> [v3.1.0]
}
```

#### *317* PlayerDecision`Event`

Roles: `Host`, `Player`, `Bot`

Answers a [`Server[#316]`](#316-getplayerdecisionnotification) request.

```json
{
    "type": <decision type: number>,
    "decision": <decision result (index of options): number>
}
```

> as decision type currently only numbers are supported
>
> the interpretation of these values is handled implicitly

#### *399* PlayerWon`Notification`

The `Server` notifies all clients that a `Player` has won the game - the game is finished.

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

#### *400* GeneralError`Notification`

Sent when no matching error is available.

```json
{
    "message": <message: string>
}
```

#### *420* AccessDeniedError`Notification`

Notifies a `Player` that he cant perform this operation (eg. a player sends `Host` scoped `Events`)

```json
{
    "message": <message: string>
}
```

#### *421* LobbyFullError`Notification` [1.3.0]

Notify a player that he cant join the lobby because it is full.

```json
{
    "code": <error code: number>,
    "message": <message: string>
}
```

> this error is primarily used for spectator to player role changes

#### *425* BotNameExistsError`Notification` [v2.0.0]

Notify a host that he cant create a bot because the name is already used.

```json
{
    "code": <error code: number>,
    "message": <message: string>
}
```

#### *426* EmptyPileError`Notification` [v4.2.1]

Notify a `Host` that the game cannot be started caused by as misconfiguration of the game.

```json
{
    "code": <error code: number>,
    "message": <display message: string>
}
```

#### [reserved\|not implemented] *433* EndTurnError`Notification`

#### *434* PlaceCardError`Notification`

Notify a `Player` that he cant place this card.

```json
{
    "code": <error code: number>,
    "message": <display message: string>
}
```

## Changelog

#### v1.1.0

Added

* 198 KeepAlive (Player)
* 199 AckKeepAlive (Server)

#### v1.2.0

Added

* 313 Added `Player` order

#### v1.3.0

Added

* 421 Lobby Full Error

#### v1.4.0

Added

* 117 PlayerDisconnected (Server)
* 118 PlayerReconnected (Server)

#### v1.5.0

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

### v3.0.0

Modified

* 308 changed updating player card amounts, added property for current draw amount

Added

* 303 Request End Turn

#### v3.1.0

Modified

* 317 player decision notification can send options

Added

* Decision Type 2 (Select Player)

#### v3.2.0

Modified

* 203 rules/rule editing is configured by backend

#### v3.3.0

Modified

* 307 is now capable of sending multiple cards at once

### v4.0.0

> transform username based public ids to numeric game/lobby scoped ids
>
> reintroduce wins property

Modified

* 300 send initial game state
* 399 remove username properties

#### v4.1.0

> Introduced the concept of UIFeedback

Modified

* 308 send feedbacks

#### v4.2.0

Modified

* SettingType: add option Readonly

##### v4.2.1

Added

* 426: empty pile error

#### v4.3.0

Added

* 204, 205, 206, 207, 208, 209: Game Profiles Concept

### v5.0.0

> This breaking change removes the concept of Game Profiles from the ZRP, adds a common card object and introduces the actual card colors and types into the protocol.
> Also preparing for upcoming features, the `wins` property was renamed to `score`.
> Overall documentation cleanup.

Removed

* GameProfileGroup
* 204, 205, 206, 207, 208, 209: Game Profiles Concept

> Game Profiles are now handled via the HTTP API and are not part of the ZRP anymore

Modified:

* renamed `wins` property to `score` on codes 100; 109; 116
* use `Card` type in 300, 304, 306, 307, 308, 311, 315