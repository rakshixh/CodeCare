# CodeCare CLI

A CLI tool for comprehensive codebase health checks, generating detailed HTML or JSON reports.<br><br>
![NPM Version](https://img.shields.io/npm/v/codecare?style=flat-square&logo=npm&label=npm%20version&color=dark-green)
![NPM Downloads](https://img.shields.io/npm/d18m/codecare?style=flat-square&logo=npm) ![GitHub repo size](https://img.shields.io/github/repo-size/rakshixh/CodeCare?style=flat-square&logo=github&color=dark-green) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/codecare?style=flat-square&logo=npm&label=npm%20package%20size&color=dark-green)

## Overview

CodeCare is a lightweight and efficient command-line tool designed to analyze your codebase's health. It scans for potential issues like large files, duplicates, and empty files, providing a clear and actionable report in HTML or JSON format.

## Features

- **Codebase Analysis**: Detects large files, duplicates, and empty files.
- **Detailed Reports**: Generates visually rich HTML reports or structured JSON files.
- **Customizable Options**: Adjust settings for tailored results.
- **Simple Commands**: Easy-to-use CLI commands for developers of all levels.

## Installation

### Install Globally (Recommended)

You can install the CodeCare CLI globally to use it anywhere:

```bash
npm install -g codecare
```

### Install Locally (Optional)

Alternatively, you can install it locally in your project:

```bash
npm install codecare
```

## Usage

After installing, you can use CodeCare directly from the command line.

> **IMPORTANT :** Run `codecare` commands from the root folder of your project. This ensures that the tool can accurately scan all files within the project directory. Running the CLI outside the root folder may result in incomplete or incorrect analysis.

### Commands

#### 1. **Check the health of the codebase**

Analyzes the codebase and generates a report.

```bash
codecare check [options]
```

**Options:**

- **`-p, --pattern <pattern>`**  
  Glob pattern to specify which files to include in the scan.  
  Default: `**/*` (all files in the project directory).

  Example:

  ```bash
  codecare check --pattern "src/**/*.js"
  ```

  ```bash
  codecare check --p "src/**/*.js"
  ```

- **`-s, --size <size>`**  
  Size limit (in bytes) to classify files as "large".  
  Default: `50000` (50KB).

  Example:

  ```bash
  codecare check --size 100000
  ```

  ```bash
  codecare check --s 100000
  ```

- **`-o, --output <output>`**  
  Format of the generated report.  
  Options: `html` (default), `json`.

  Example:

  ```bash
  codecare check --output json
  ```

  ```bash
  codecare check --o json
  ```

- **`-l, --max-lines <maxLines>`**  
  Maximum lines of code allowed in a single file.  
  Default: `500` lines

  Example:

  ```bash
  codecare check --max-lines json
  ```

  ```bash
  codecare check --l json
  ```

- **`-d, --directory <directory>`**  
  Directory where the generated report will be saved.  
  Default: `./reports`.

  Example:

  ```bash
  codecare check --directory ./custom-reports
  ```

  ```bash
  codecare check --d ./custom-reports
  ```

---

### **Global Commands**

#### 1. **View Help**

Displays the list of commands and options available in the CLI.

```bash
codecare help
```

#### 2. **View Version**

Displays the current version of the CLI.

```bash
codecare --version
```

```bash
codecare --V
```

---

### **Examples**

1. **Run a basic health check and generate an HTML report in the default location:**

   ```bash
   codecare check
   ```

2. **Scan only `.js` files in the `src` directory:**

   ```bash
   codecare check --pattern "src/**/*.js"
   ```

3. **Set the size limit for large files to 100KB and output a JSON report:**

   ```bash
   codecare check --size 100000 --output json
   ```

4. **Generate an HTML report in a custom directory:**

   ```bash
   codecare check --directory ./output/reports
   ```

5. **Set the number of lines of code to 600 and output a HTML report**

   ```bash
   codecare check --max-lines 600 --output html
   ```

## Contributing

We welcome contributions to improve CodeCare! Feel free to submit [issues](https://github.com/rakshixh/CodeCare/issues) or [pull requests](https://github.com/rakshixh/CodeCare/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rakshixh/CodeCare/blob/main/LICENSE) file for details.
