const fs = require("fs/promises");
const clc = require("cli-color");
const path = require("path");
const puppeteer = require("puppeteer");

const generatePdfReport = async (
  stats,
  largeFiles,
  duplicates,
  emptyFiles,
  exceedingMaxLinesFiles,
  size,
  maxlines,
  outputPath
) => {
  try {
    const templatePath = path.join(__dirname, "template.html");
    const cssPath = path.join(__dirname, "styles.css");
    const tempHtmlPath = outputPath.replace(".pdf", ".html");

    let htmlContent = await fs.readFile(templatePath, "utf8");
    let cssContent = await fs.readFile(cssPath, "utf8");

    // Inject CSS into HTML (ensures styles are applied)
    htmlContent = htmlContent.replace(
      "</head>",
      `<style>${cssContent}</style></head>`
    );

    // Replace placeholders with actual data
    htmlContent = htmlContent
      .replace("{{totalFiles}}", stats.totalFiles)
      .replace("{{totalLines}}", stats.totalLines)
      .replace("{{totalDuplicateFiles}}", duplicates.length)
      .replace("{{totalEmptyFiles}}", emptyFiles.length)
      .replace(
        "{{totalFilesExceedingLineLimit}}",
        exceedingMaxLinesFiles.length
      )
      .replace("{{totalLargeFiles}}", largeFiles.length)
      .replace("{{size}}", size)
      .replace("{{maxLines}}", maxlines)
      .replace("{{generatedDate}}", new Date().toLocaleString())
      .replace(
        "{{largeFiles}}",
        largeFiles.length === 0
          ? `<p class="green">No large files found! Your code is neat and optimized!</p>`
          : largeFiles
              .map(
                ({ file, size }) =>
                  `<p class="red">🔴 ${file} - ${size} bytes</p>`
              )
              .join("")
      )
      .replace(
        "{{duplicates}}",
        duplicates.length === 0
          ? `<p class="green">No duplicate files found!</p>`
          : duplicates
              .map(
                ({ file1, file2 }) =>
                  `<p class="red">🔴 ${file1} <span class="primary">and</span> ${file2}</p>`
              )
              .join("")
      )
      .replace(
        "{{emptyFiles}}",
        emptyFiles.length === 0
          ? `<p class="green">No empty files found! Your code is in great shape!</p>`
          : emptyFiles.map((file) => `<p class="red">🔴 ${file}</p>`).join("")
      )
      .replace(
        "{{exceedingFiles}}",
        exceedingMaxLinesFiles.length === 0
          ? `<p class="green">No files exceed the ${maxlines} line limit! Your code is concise!</p>`
          : exceedingMaxLinesFiles
              .map(
                ({ file, lines }) =>
                  `<p class="red">🔴 ${file} - ${lines} lines</p>`
              )
              .join("")
      );

    // Save the modified HTML to a temporary file
    await fs.writeFile(tempHtmlPath, htmlContent);

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Load the temporary HTML file
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: "networkidle0" });

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Delete the temporary HTML file
    await fs.unlink(tempHtmlPath);

    console.log(`📄 PDF report saved to: ${outputPath}`);
  } catch (err) {
    console.error(`❌ Failed to save report: ${err.message}`);
  }
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
      console.log(clc.yellowBright(`📝 JSON Report saved to: ${outputPath}`))
    )
    .catch((err) => console.error(`❌ Failed to save report: ${err.message}`));
};

module.exports = { generatePdfReport, generateJsonReport };
