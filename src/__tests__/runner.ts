import { fork } from "child_process";
import { argv } from "process";

fork(`dist/__tests__/${argv.slice(2).join(" ")}`);
