# Class Name Picker

A free classroom app for Grade 1 teachers. It picks who recites next with a name wheel, and mixes the class into groups with a fun animation. It was made for classrooms in the Philippines, where internet is often slow or missing, so it works **fully offline** after the first visit.

- **Spin Time**: a name wheel with each child's photo and name, for fair recitation turns.
- **Group Time**: random groups shown with a "Boom" reveal or trains that pick up teammates.
- **Teacher setup**: several classes, student photos and names, backups.
- Children's screens in **English, Filipino (Tagalog) and Bisaya (Cebuano)**, in a school-style font (Andika) that young readers recognise.

**Open the app:** https://annalog-404.github.io/class-name-picker/

Open it once while online (or press **Install app**), and it keeps working without internet after that.

## Safe to use

This is a plain website. There is nothing to download or run outside the browser.

| | |
|---|---|
| Programs installed on your computer | None. "Install app" only adds a shortcut to the web page, which the browser keeps. |
| Accounts or sign-in | None |
| Ads, trackers, analytics, cookies | None |
| Data sent over the internet | None. Class lists and photos stay on the device. |
| Other websites contacted | None. Every page has a security rule (Content Security Policy) that blocks connections to any other website. |
| Camera, microphone, location | Not used. Photos are chosen by the teacher with the normal file picker. |
| Hidden or minified code | None. All code is readable plain HTML, CSS and JavaScript in this folder. |

Read the full [privacy policy](PRIVACY.md). The same information is shown inside the app under **About & privacy**.

## How it works offline

The first time the app is opened online, the browser saves a copy of its files (a standard "service worker"). After that it opens and works with no internet. Class lists and photos are stored in the browser's own storage on that device (IndexedDB). Use **Save backup** on the teacher screen to keep a copy or move a class to another device.

## Files

| File | What it is |
|---|---|
| `index.html` | Teacher setup (English) |
| `spin.html` | Spin Time: the children's name wheel |
| `groups.html` | Group Time: the children's group maker |
| `privacy.html` | About & privacy page shown in the app |
| `lang.js` | Words for the children's screens in English, Filipino and Bisaya |
| `themes.js` | Background themes |
| `store.js` | Saves classes on this device |
| `sw.js` | Offline support (service worker) |
| `manifest.webmanifest` | App name and icons for "Install app" |
| `fonts/` | Andika font (SIL Open Font License, see `fonts/LICENSE.txt`) |
| `icons/` | App icons |

## Running it yourself

Any static web host works (for example GitHub Pages). To try it on your own computer:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Offline support needs `https://` or `localhost`.

## License

The app is released under the [MIT License](LICENSE). The Andika font is © SIL International under the [SIL Open Font License 1.1](fonts/LICENSE.txt).

## Reporting a problem

See [SECURITY.md](SECURITY.md).
