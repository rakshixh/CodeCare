# CodeCare CLI

A CLI tool for comprehensive codebase health checks, generating detailed HTML or JSON reports.

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

> [!NOTE]
> Run `codecare` commands from the root folder of your project. This ensures that the tool can accurately scan all files within the project directory. Running the CLI outside the root folder may result in incomplete or incorrect analysis.

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

- **`-s, --size <size>`**  
  Size limit (in bytes) to classify files as "large".  
  Default: `50000` (50KB).

  Example:

  ```bash
  codecare check --size 100000
  ```

- **`-o, --output <output>`**  
  Format of the generated report.  
  Options: `html` (default), `json`.

  Example:

  ```bash
  codecare check --output json
  ```

- **`-d, --directory <directory>`**  
  Directory where the generated report will be saved.  
  Default: `./reports`.

  Example:

  ```bash
  codecare check --directory ./custom-reports
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

## Contributing

We welcome contributions to improve CodeCare! Feel free to submit [issues](https://github.com/rakshixh/CodeCare/issues) or [pull requests](https://github.com/rakshixh/CodeCare/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rakshixh/CodeCare/blob/main/LICENSE) file for details.
