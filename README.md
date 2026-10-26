# Chadi Hammoud — Portfolio

Personal portfolio of **Chadi Hammoud**, Senior Back-End Software Developer (Java · Spring Boot · Django), Riyadh.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Structure

```
index.html                 Page layout and static sections
assets/css/styles.css      Design tokens (light + dark), all styles
assets/js/data.js          ALL content: skills, case studies, repos, experience
assets/js/main.js          Rendering and interactions
assets/Chadi_Hammoud_CV.pdf
.nojekyll                  Tells GitHub Pages to serve files as-is
```

## Update content

Edit `assets/js/data.js` only. Add a case study by copying an object in `cases`,
add a repo in `repos`, and so on. Replace `assets/Chadi_Hammoud_CV.pdf` to update the CV.

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

**GitHub Pages**
1. Create a repo named `C-Hammoud.github.io` (or any name).
2. Push these files to the `main` branch.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / root.
4. The site is live at `https://C-Hammoud.github.io/` (or `/<repo-name>/`).

**Vercel / Netlify**
Import the repo, framework preset *Other*, no build command, output directory `/`.

## Features

- Google / Material design: Google Sans + Roboto, four-color accents, light and dark themes (follows the OS, toggle in header)
- Hero styled as search results listing the work, with a typed query
- Filterable case studies with Overview / Architecture / API / Stack tabs
- GitHub repositories table, expandable experience timeline
- Copy-email button and CV download
- Responsive down to 360px, keyboard accessible, respects reduced motion
