# Architecture

The zwoo architecture consists of three main server types:

- the master server
- a game server and
- a local server.

## Master server

The master server is the main server in the infrastructure. He keeps zwoo running. His responsibility is to provide backend services for the zwoo frontend. Those are:

- managing login sessions
- managing user account data
- managing games (creation/querying/joining/leaderboards) and
- miscellaneous stuff like changelogs or contact requests.

He is also able to run games with realtime connections when deployed standalone.

In a distributed deployment environment the master delegates games and realtime connections to configured game servers. Therefore he needs to provide some extra authentication features in oder to allow users to authenticate against third party game servers (possibly living in other domain spaces).

## Game server

A game server is a lightweight server in the zwoo infrastructure. His only responsibility is to run games and manage the corresponding realtime connections. He gets games assigned by the master server, checks authenticity of clients and notifies back to the master once a game finished.

His lightweight, simple and cloud native design makes it easy to deploy it auto scaled in hundreds in oder to catch traffic peaks and to distribute raw connections across servers.  

## Local server

A local server is a special, slightly more powerful version a game sever. He's shipped with the tauri app and can be started and managed from the zwoo frontend. It's primary use is for local games in an offline environment.

In order to allow local offline games, the local server can manage some of the authentication & game management related stuff needed to run games, but with the catch that all data is not persisted and only lives in memory.