const { glob } = require("glob");
const fs = require("fs/promises");
const path = require("path");

// Function to fetch all files from the project directory
const getAllFiles = async (pattern) => {
  try {
    const allItems = await glob(pattern, {
      ignore: ["node_modules/**"], // Excluding the node_modules directory
      absolute: true,
    });

    const files = [];
    for (const item of allItems) {
      const stats = await fs.stat(item);
      if (stats.isFile()) {
        files.push(item);
      }
    }
    return files;
  } catch (err) {
    throw new Error(`Failed to get files: ${err.message}`);
  }
};

// Function to identify large files
const getLargeFiles = async (files, sizeLimit) => {
  const largeFiles = [];
  for (const file of files) {
    const stats = await fs.stat(file);
    if (stats.size > sizeLimit) {
      largeFiles.push({ file, size: stats.size });
    }
  }
  return largeFiles;
};

// Function to generate code statistics for all files
const getCodeStats = async (files) => {
  let totalLines = 0;
  let totalFiles = files.length;

  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    totalLines += content.split("\n").length;
  }

  return { totalLines, totalFiles };
};

// Function to find duplicate files by name and content
const findDuplicates = async (files) => {
  const fileMap = new Map();
  const duplicates = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileMap.has(fileName)) {
      const existingFile = fileMap.get(fileName);
      const fileContent = await fs.readFile(file);
      const existingContent = await fs.readFile(existingFile);
      if (fileContent.equals(existingContent)) {
        duplicates.push({ file1: file, file2: existingFile });
      }
    } else {
      fileMap.set(fileName, file);
    }
  }
  return duplicates;
};

// Function to detect empty files
const findEmptyFiles = async (files) => {
  const emptyFiles = [];
  for (const file of files) {
    const stats = await fs.stat(file);
    if (stats.size === 0) {
      emptyFiles.push(file);
    }
  }
  return emptyFiles;
};

module.exports = {
  getAllFiles,
  getLargeFiles,
  getCodeStats,
  findDuplicates,
  findEmptyFiles,
};
