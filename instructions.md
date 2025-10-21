# Once Installed React + Vite, the project should have this:
```
my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── App.css
    └── assets/
        └── react.svg
```
# Now lets go and see what each file is for:

### Root `/iNtellecta'`

| File                    | Purpose                                                                                                              | What to Modify                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`package.json`**      | Keeps track of your project’s dependencies (React, Vite, etc.) and scripts like `npm run dev`, `npm run build`, etc. | Don’t edit manually at first. You’ll add new dependencies (like `react-router-dom`) using commands like `npm install react-router-dom`. |
| **`package-lock.json`** | Auto-generated dependency tree used by npm.                                                                          | Don’t touch this — it’s maintained by npm.                                                                                              |
| **`index.html`**        | The single HTML file where React attaches itself. It has `<div id="root"></div>` where your app lives.               | You can change `<title>` and `<meta>` tags but **don’t delete** the `<div id="root">`.                                                  |
| **`vite.config.ts`**    | Vite’s configuration file. Adds plugins, aliases, or environment options.                                            | Usually untouched until you add special configurations later.                                                                           |
| **`tsconfig*.json`**    | TypeScript settings for your app, node, and build.                                                                   | Leave as-is for now — Vite generated them for you.                                                                                      |
| **`eslint.config.js`**  | Configuration for ESLint (your linter). Keeps code style consistent.                                                 | You might customize rules later, but not necessary early on.                                                                            |
| **`.gitignore`**        | Lists which files Git should ignore (like `node_modules`).                                                           | Fine as-is.                                                                                                                             |
| **`README.md`**         | Simple markdown doc that usually describes your project.                                                             | You can rewrite this to describe your study app.                                                                                        |
| **`node_modules/`**     | Contains installed dependencies.                                                                                     | Never edit manually.                                                                                                                    |
| **`public/`**           | Stores static files (like images or icons) that Vite serves directly.                                                | You can add assets like favicons, images, etc. here.                                                                                    |

### `/src`:
| File            | Purpose                                                                         | What to Modify                                                                |
| --------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`main.tsx`**  | Entry point for your app. It renders `<App />` into the HTML `<div id="root">`. | You’ll rarely touch this except to add wrappers like `<BrowserRouter>` later. |
| **`App.tsx`**   | Your main React component — the first one that’s displayed.                     | ✅ **Start editing here.** Replace its content to design your homepage.        |
| **`App.css`**   | Styles for the `App` component.                                                 | You can keep or rewrite it. It’s imported by `App.tsx`.                       |
| **`index.css`** | Global styles that apply across the whole site.                                 | Good place to set font, body background, etc.                                 |
| **`assets/`**   | Holds images, icons, or other static files used by components.                  | You can add your own assets here, like a logo or banner.                      |

How to start Building your own page:
1. Start the dev server.
```bash
npm run dev
```
You will get something like this:
```bash
Local: http://localhost:5173/
```
2. Edit `src/App.tsx` to change the homepage content.
Replace the existing JSX with your own content.
Example:
```tsx
function App() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to My Study App 📚</h1>
      <p>Built with React + Vite + TypeScript</p>
      <button onClick={() => alert('You clicked!')}>Click Me</button>
    </main>
  )
}

export default App
```
Then save -- the page updates automatically in the browser thanks to Vite’s reloading!
3. Edit `index.html` (optional)
Change the `<title>` tag to set your app’s title in the browser tab.
```html
<title>My Study App</title>
```

4. Style it
edit `src/index.css` or `src/App.css` to add custom styles.
Example:
```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background-color: #f9fafb;
  color: #333;
}

button {
  padding: 10px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```
