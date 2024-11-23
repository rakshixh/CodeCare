const clc = require("cli-color");

//Function to generate custom help information.
function customizeDefault(program) {
  program.helpInformation = function () {
    return `
${clc.magenta.bold(`

 $$$$$$\\                  $$\\            $$$$$$\\                                \r\n$$  __$$\\                 $$ |          $$  __$$\\                               \r\n$$ \/  \\__| $$$$$$\\   $$$$$$$ | $$$$$$\\  $$ \/  \\__| $$$$$$\\   $$$$$$\\   $$$$$$\\  \r\n$$ |      $$  __$$\\ $$  __$$ |$$  __$$\\ $$ |       \\____$$\\ $$  __$$\\ $$  __$$\\ \r\n$$ |      $$ \/  $$ |$$ \/  $$ |$$$$$$$$ |$$ |       $$$$$$$ |$$ |  \\__|$$$$$$$$ |\r\n$$ |  $$\\ $$ |  $$ |$$ |  $$ |$$   ____|$$ |  $$\\ $$  __$$ |$$ |      $$   ____|\r\n\\$$$$$$  |\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$\\ \\$$$$$$  |\\$$$$$$$ |$$ |      \\$$$$$$$\\ \r\n \\______\/  \\______\/  \\_______| \\_______| \\______\/  \\_______|\\__|       \\_______|

`)}
${clc.yellow.bold("A CLI to analyze your codebase health efficiently. ✨")}
${clc.greenBright(
  "Run the following command to know more:"
)} ${clc.cyanBright.bold("codecare help")}
    `;
  };

  // Handling unknown commands and unknown options
  program.exitOverride((err) => {
    if (err.code === "commander.unknownCommand") {
      console.error(`${clc.redBright("\n❌ Unknown command!")} ${clc.redBright(
        "Run"
      )} ${clc.yellowBright("codecare help")} ${clc.redBright(
        "to see the available commands."
      )}
    `);
      process.exit(1);
    }

    if (err.code === "commander.unknownOption") {
      console.error(`${clc.redBright("\n❌ Unknown option!")} ${clc.redBright(
        "Run"
      )} ${clc.yellowBright("codecare help")} ${clc.redBright(
        "to see the available options for a specific command."
      )}
      `);
      process.exit(1);
    }
  });

  // Disable the default `--help` and `-h` behavior globally
  process.argv.forEach((arg) => {
    if (arg === "--help" || arg === "-h") {
      console.error(`${clc.redBright("\n❌ Unknown option!")} ${clc.redBright(
        "Run"
      )} ${clc.yellowBright("codecare help")} ${clc.redBright(
        "to see the available options for a specific command."
      )}
    `);
      process.exit(1);
    }
  });
}

module.exports = { customizeDefault };
