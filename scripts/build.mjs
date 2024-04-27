import "zx/globals";
$.verbose = false;

const start = performance.now();

const targets = ["api", "dev", "docs"];

targets.forEach((target) => {
  console.log(chalk.cyan(`${target}-docs: build`));
  console.log(chalk.blue(`${target}-docs: building local search index`));

  const dir = `./${target}/.vitepress/dist/assets/chunks`;
  const targetDir = `./${target}/.vitepress/dist/`;
  const startsWith = "@localSearchIndex";
  console.log(chalk.green(`search dir: ${dir}`));
  console.log(chalk.green(`starts with: ${startsWith}`));
  console.log(chalk.green(`target dir: ${targetDir}`));

  const possibleFiles = fs.readdirSync(dir);
  for (const file of possibleFiles) {
    if (file.startsWith(startsWith)) {
      const filePath = path.join(dir, file);
      const copyPath = path.join(targetDir, "searchIndex.js");
      console.log(chalk.blueBright(`  - found: ${filePath}`));
      console.log(chalk.blueBright(`  - saved to: ${copyPath}`));
      const newFile = `import index from './assets/chunks/${file}'; export default index;`;
      fs.writeFileSync(copyPath, newFile);
      break;
    }
  }
});

const end = performance.now();
console.log(
  chalk.cyan(`build finished in ${((end - start) / 1000).toFixed(3)}s`)
);
