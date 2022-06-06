import { messageCommands } from "../handlers";
import { createEventHandler } from "../helpers/createEventHandler";

export default createEventHandler("messageCreate", function (m) {
    messageCommands(this, m);
});
