# D.js-BDScript Next

The next version of d.js-bdscript. Coming soon...

```ts
import { Intents } from "discord.js";
import { Bot } from "djs-bdscript";

const client = new Bot({
    intents: Intents.FLAGS.Guilds | Intents.Flags.GuildMessages,
});

client.login("token");
```

## Todo

-   [x] `Bot` class
    -   [x] Intents
    -   [x] Logging in
-   [x] Statuses
-   [x] Compiler
-   [x] Interpreter
-   [x] Functions
-   [ ] Music
-   [ ] Buttons
-   [ ] Embeds
-   [x] Argument types
    -   [x] String
        -   [x] Options
    -   [x] Number
    -   [x] Boolean
    -   [x] Snowflake-based types
        -   [x] User
        -   [x] Member
        -   [x] Channel
        -   [x] GuildChannel
        -   [x] Guild
        -   [x] Role
        -   [x] Message
        -   [ ] Sticker
    -   [x] Enums
    -   [ ] Duration
-   [ ] Ellipsis arguments
-   [ ] Select Menus
-   [ ] Slash Commands
-   [x] Message Commands
-   [ ] Context Menus
-   [ ] Command handling
-   [ ] Modals
-   [x] Events
-   [ ] Documentation
    -   [x] Typedoc
    -   [ ] User docs
