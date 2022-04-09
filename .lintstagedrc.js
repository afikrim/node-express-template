module.exports = {
  'src/(cmd|internal|pkg)/**/*.ts?(x)': [
    (filenames) => 'npx eslint --ext ts --fix --quiet ' + filenames.join(' '),
    (filenames) => 'npx prettier --write ' + filenames.join(' '),
    () => 'npm run build -- --noEmit',
  ],
  'src/internal/handlers/http/**/*.ts': [() => 'npm run build:docs'],
};
