const fs = require("fs/promises");
const clc = require("cli-color");

const generateHtmlReport = (
  stats,
  largeFiles,
  duplicates,
  emptyFiles,
  exceedingMaxLinesFiles,
  size,
  maxlines,
  outputPath
) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Codebase Health Check Report</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #333; }
            .stats { margin: 20px 0; }
            .large-files, .duplicates, .empty-files, .exceeding-lines { margin-top: 20px; }
            .red { color: red; }
            .black { color: black; }
            .watermark { margin-top: 40px; }
            .watermarkText { font-size: 10px; color: #536493; }
        </style>
    </head>
    <body>
        <h1>🎯 Codebase Health Check Report 🎯</h1>
        <div class="stats">
            <h2>📊 Codebase Statistics</h2>
            <p>Total files scanned: ${stats.totalFiles}</p>
            <p>Total lines of code: ${stats.totalLines}</p>
            <p>Total duplicate files: ${duplicates.length}</p>
            <p>Total empty files: ${emptyFiles.length}</p>
            <p>Total files exceeding line limit: ${
              exceedingMaxLinesFiles.length
            }</p>
        </div>
        <div class="large-files">
            <h2>🗂️ Large Files Found (More than ${size} bytes)</h2>
            ${
              largeFiles.length === 0
                ? "<p>No large files found! Your code is neat and optimized!</p>"
                : largeFiles
                    .map(
                      ({ file, size }) =>
                        `<p class="red">🔴 ${file} - ${size} bytes</p>`
                    )
                    .join("")
            }
        </div>
        <div class="duplicates">
            <h2>📄 Duplicate Files Found</h2>
            ${
              duplicates.length === 0
                ? "<p>No duplicate files found!</p>"
                : duplicates
                    .map(
                      ({ file1, file2 }) =>
                        `<p class="red">🔴 Duplicate files: ${file1} <span class="black">and</span> ${file2}</p>`
                    )
                    .join("")
            }
        </div>
        <div class="empty-files">
            <h2>📂 Empty Files Found</h2>
            ${
              emptyFiles.length === 0
                ? "<p>No empty files found! Your code is in great shape!</p>"
                : emptyFiles
                    .map((file) => `<p class="red">🔴 Empty file: ${file}</p>`)
                    .join("")
            }
        </div>
        <div class="exceeding-lines">
            <h2>📜 Files Exceeding ${maxlines} Line Limit</h2>
            ${
              exceedingMaxLinesFiles.length === 0
                ? `<p>No files exceed the ${maxLines} line limit! Your code is concise!</p>`
                : exceedingMaxLinesFiles
                    .map(
                      ({ file, lines }) =>
                        `<p class="red">🔴 ${file} - ${lines} lines</p>`
                    )
                    .join("")
            }
        </div>
        <div class="watermark">
            <p class="watermarkText">Generated on: ${new Date().toLocaleString()}</p>
            <p class="watermarkText"><a class="watermarkText" href="https://www.npmjs.com/package/codecare" target="_blank">Powered by: codecare</a></p>
        </div>
    </body>
    </html>
  `;

  fs.writeFile(outputPath, htmlContent)
    .then(() =>
      console.log(clc.yellowBright(`📝 Report saved to: ${outputPath}`))
    )
    .catch((err) => console.error(`❌ Failed to save report: ${err.message}`));
};

// Function to generate JSON report
const generateJsonReport = (
  stats,
  largeFiles,
  duplicates,
  emptyFiles,
  exceedingMaxLinesFiles,
  outputPath
) => {
  const reportData = {
    codebaseStatistics: {
      totalFiles: stats.totalFiles,
      totalLines: stats.totalLines,
      totalDuplicateFiles: duplicates.length,
      totalEmptyFiles: emptyFiles.length,
      totalFilesExceedingLineLimit: exceedingMaxLinesFiles.length,
    },
    largeFiles: largeFiles.map(({ file, size }) => ({ file, size })),
    duplicates: duplicates.map(({ file1, file2 }) => ({ file1, file2 })),
    emptyFiles: emptyFiles.map((file) => file),
    exceedingMaxLinesFiles: exceedingMaxLinesFiles.map(({ file, lines }) => ({
      file,
      lines,
    })),
  };

  fs.writeFile(outputPath, JSON.stringify(reportData, null, 2))
    .then(() =>
      console.log(clc.yellowBright(`📝 Report saved to: ${outputPath}`))
    )
    .catch((err) => console.error(`❌ Failed to save report: ${err.message}`));
};

module.exports = { generateHtmlReport, generateJsonReport };
