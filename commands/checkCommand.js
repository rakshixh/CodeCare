const { program } = require("commander");
const path = require("path");
const clc = require("cli-color");
const fs = require("fs/promises");
const {
  getAllFiles,
  getLargeFiles,
  getCodeStats,
  findDuplicates,
  findEmptyFiles,
} = require("../utils/fileUtils");
const {
  generateHtmlReport,
  generateJsonReport,
} = require("../utils/reportUtils");
const config = require("../config");

function checkCommand() {
  program
    .command("check")
    .description(clc.cyanBright("Check the health of the codebase"))
    .option(
      "-p, --pattern <pattern>",
      "Glob pattern to specify which files to include in the scan.",
      "**/*"
    )
    .option(
      "-s, --size <size>",
      "Size limit (in bytes) to classify files as large",
      config.defaultSizeLimit
    )
    .option(
      "-o, --output <output>",
      "Output format (html/json)",
      config.defaultOutput
    )
    .option(
      "-d, --directory <directory>",
      "Directory to save the generated report",
      config.defaultDirectory
    )
    .action(async (options) => {
      const { pattern, size, output, directory } = options;

      try {
        console.log(clc.cyanBright.bold("\n🎯 Codebase Health Check 🎯"));
        console.log(
          clc.yellow(
            "Scanning your codebase for large files, duplicates, and empty files... 🕵️‍♂️\n"
          )
        );

        const files = await getAllFiles(pattern);
        const largeFiles = await getLargeFiles(files, parseInt(size));
        const { totalLines, totalFiles } = await getCodeStats(files);
        const duplicates = await findDuplicates(files);
        const emptyFiles = await findEmptyFiles(files);

        console.log(clc.cyanBright.bold("\n📊 Codebase Statistics 📊"));
        console.log(clc.magenta(`- Total files scanned: ${totalFiles}`));
        console.log(clc.magenta(`- Total lines of code: ${totalLines}`));
        console.log(
          clc.magenta(`- Total duplicate files: ${duplicates.length}`)
        );
        console.log(clc.magenta(`- Total empty files: ${emptyFiles.length}`));

        console.log(clc.yellow.bold("\nLarge Files Found 🗂️"));
        if (largeFiles.length === 0) {
          console.log(
            clc.greenBright(
              "✅ No large files found! Your code is neat and optimized!"
            )
          );
        } else {
          largeFiles.forEach(({ file, size }) => {
            console.log(clc.redBright(`  🔴 ${file} - ${size} bytes`));
          });
        }

        console.log(clc.yellow.bold("\nDuplicate Files Found 📄"));
        if (duplicates.length === 0) {
          console.log(clc.greenBright("✅ No duplicate files found!"));
        } else {
          duplicates.forEach(({ file1, file2 }) => {
            console.log(
              clc.redBright(`  🔴 Duplicate files: ${file1} and ${file2}`)
            );
          });
        }

        console.log(clc.yellow.bold("\nEmpty Files Found 📂"));
        if (emptyFiles.length === 0) {
          console.log(
            clc.greenBright(
              "✅ No empty files found! Your code is in great shape!"
            )
          );
        } else {
          emptyFiles.forEach((file) => {
            console.log(clc.redBright(`  🔴 Empty file: ${file}`));
          });
        }

        console.log(clc.greenBright.bold("\n🔧 Health Check Complete! 🔧"));

        const reportDirectory = path.resolve(directory);
        await fs.mkdir(reportDirectory, { recursive: true });

        const reportPath = path.join(reportDirectory, "report.html");
        if (output === "html") {
          generateHtmlReport(
            { totalLines, totalFiles },
            largeFiles,
            duplicates,
            emptyFiles,
            reportPath
          );
        } else if (output === "json") {
          const jsonReportPath = path.join(reportDirectory, "report.json");
          generateJsonReport(
            { totalLines, totalFiles },
            largeFiles,
            duplicates,
            emptyFiles,
            jsonReportPath
          );
        }
      } catch (err) {
        console.error(clc.redBright("❌ An error occurred:"), err.message);
      }
    });
}

module.exports = checkCommand;