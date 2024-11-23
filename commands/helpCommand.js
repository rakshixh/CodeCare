const { program } = require("commander");
const clc = require("cli-color");

function helpCommand() {
  // Disable the default `--help` and `-h` flags
  program.helpOption(false);
  program
    .command("help")
    .description(clc.cyanBright("Display all available commands"))
    .action(() => {
      console.log(clc.greenBright.bold("\nAvailable Commands 🚀\n"));

      // Get the main CLI command name dynamically
      const cliName = program.name();

      console.log(
        clc.yellowBright.bold(
          "  Use -V or --version to get the version of the CLI"
        )
      );
      console.log(
        clc.magentaBright.bold("  Usage: codecare --version or codecare -V\n")
      );

      // Listing all commands defined in the program
      program.commands.forEach((command) => {
        console.log(
          clc.yellowBright.bold(
            `  ${command.name()} : ${command.description()}`
          )
        );

        const usage = `Usage: ${cliName} ${command.name()}${
          command.options.length > 0 ? " [options]" : ""
        }`;
        console.log(clc.magentaBright.bold(`    ${usage}`));

        // Listing all options for the command
        if (command.options.length > 0) {
          console.log(clc.greenBright.bold("    Options:"));
          command.options.forEach((option) => {
            const flags = option.flags; // Ex: like --option or -o
            const description =
              option.description || "No description available";
            console.log(clc.green(`      ${flags} : ${description}`));
          });
        } else {
          console.log(clc.green("    No options available"));
        }
        console.log("");
      });
    });
}

module.exports = helpCommand;
