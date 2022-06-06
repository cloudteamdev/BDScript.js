import { messageCommands } from "../handlers";
import { createEventHandler } from "../internal functions/createEventHandler";

export default createEventHandler("messageCreate", function (m) {
    messageCommands(this, m)  
})