# Security policy

## How the app is kept safe

- **No server-side code.** The app is a set of plain files (HTML, CSS, JavaScript, fonts, icons) served as a static website. Nothing runs on a server.
- **No outside connections.** Every page has a Content Security Policy that only allows the app's own files. Scripts, images, fonts and network requests from any other website are blocked by the browser.
- **No third-party code.** No libraries, trackers or CDNs. All code is readable and unminified.
- **Student names are treated as plain text.** Names are never inserted into the page as code, so a name cannot run a script.
- **Backup files are checked** before they are opened. Unknown fields are ignored, names are cut to 40 characters, and only pictures stored inside the file are accepted.
- **Saved group lists (.csv)** guard against spreadsheet formulas, so a name cannot run a formula in Excel or Google Sheets.
- **Nothing is executable.** The app never asks you to download or run a program. If anything claiming to be this app asks you to, do not run it.

## Supported version

Only the latest version, the one served by the app's website, is supported. Opening the app online updates it automatically.

## Reporting a problem

If you find a security or privacy problem, please open an issue at https://github.com/Annalog-404/class-name-picker/issues and **do not include children's names or photos**. Describe what you saw and how to make it happen again. We aim to reply within 7 days.
