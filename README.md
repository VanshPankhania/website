# Engineering Portfolio

Static site: no build step. Works on GitHub Pages as is.

## Deploy
1. Push these files to a GitHub repo (root of the `main` branch).
2. Repo **Settings > Pages > Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site appears at `https://your-username.github.io/repo-name/`.

## Customise
- Replace "Your Name", contact links and text in `index.html`.
- Put your CV at `assets/cv.pdf`.
- Put project photos in `images/` using the filenames shown in each card (e.g. `images/robotics-1.jpg`). Images are cropped to 4:3, so use landscape photos around 1200x900.
- Add a project: copy an `<article class="card">` block and set `data-cat` to `robotics`, `aerospace` or `mechanical`.
