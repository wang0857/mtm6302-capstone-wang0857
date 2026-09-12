// Committed placeholder — GitHub Pages only serves files that are tracked in
// git, so this can't be git-ignored. The deploy workflow overwrites this
// content with the NASA_API_KEY repository secret at build time (see
// .github/workflows/deploy.yml); the placeholder below is what ships if that
// step is ever skipped.
//
// For local development, put your real key below, then run once:
//   git update-index --skip-worktree src/js/config.js
// so git stops tracking further edits to this file and your key can't end up
// in a commit. To resume tracking it: git update-index --no-skip-worktree src/js/config.js
export const NASA_API_KEY = "YOUR_API_KEY_HERE";
