import "zx/globals";
$.verbose = false;

const start = performance.now();
console.log(chalk.cyan("dev-docs: build"));

console.log(chalk.blue("dev-docs: renaming local search index"));
const dir = "./dev/.vitepress/dist/assets/chunks";
const targetDir = "./dev/.vitepress/dist/assets";
const startsWith = "@localSearchIndex";
console.log(chalk.green(`search dir: ${dir}`));
console.log(chalk.green(`starts with: ${startsWith}`));
console.log(chalk.green(`target dir: ${targetDir}`));

const possibleFiles = await fs.readdir(dir);
for (const file of possibleFiles) {
  if (file.startsWith(startsWith)) {
    const filePath = path.join(dir, file);
    const copyPath = path.join(targetDir, "searchIndex.js");
    console.log(chalk.blueBright(`  - found: ${filePath}`));
    console.log(chalk.blueBright(`  - copied to: ${copyPath}`));
    await fs.copyFile(filePath, copyPath);
    break;
  }
}

const end = performance.now();
console.log(
  chalk.cyan(
    `dev-docs: build finished in ${((end - start) / 1000).toFixed(3)}s`
  )
);
