/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import rimraf from 'rimraf';
import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const distFolder = './lib';
const sourceFolder = './src';
const includes = new RegExp('.+\\.(ts|tsx)$');
const excludes = new RegExp('.+\\.(stories|test)\\.(ts|tsx)$');

function getInputs(dir, result = []) {
  fs.readdirSync(dir).forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat.isDirectory()) {
      getInputs(file, result);
    } else if (stat.isFile() && file.match(includes) && !file.match(excludes)) {
      result.push(file);
    }
  });

  return result;
}

const inputs = [
  ...getInputs(`${sourceFolder}/components`),
  ...getInputs(`${sourceFolder}/containers`),
  ...getInputs(`${sourceFolder}/hooks`),
  ...getInputs(`${sourceFolder}/stores`),
  `${sourceFolder}/index.ts`,
];

rimraf(distFolder, async (err) => {
  if (err) console.error(err);

  console.time('Generating ESM output...');
  await esbuild.build({
    entryPoints: [...inputs],
    outbase: sourceFolder,
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es6',
    loader: {
      '.json': 'json',
      '.tsx': 'tsx',
      '.ts': 'ts',
    },
    format: 'esm',
    // minify: true,
    outdir: distFolder,
    treeShaking: true,
    inject: ['./scripts/react-shim.js'],
  });
  console.timeEnd('Generating ESM output...');

  fs.copyFileSync(
    path.join('./package.json'),
    path.join(distFolder, 'package.json')
  );
});
