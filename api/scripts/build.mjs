import "zx/globals";
$.verbose = false;

const start = performance.now();
console.log(chalk.cyan("api-docs: build"));
console.log(chalk.blue("api-docs: copy static files"));

const wd = (await $`pwd`).stdout.trim();
const source = "./api/";
const dist = "./api/.vitepress/dist";
console.log(chalk.green(`wd: ${wd}`));
console.log(chalk.green(`source: ${source}`));
console.log(chalk.green(`target: ${dist}`));

const files = ["swagger.html", "zwoo-v2.yaml"];

await spinner(chalk.blue("copying output files..."), async () => {
  for (const file of files) {
    await fs.copyFile(path.join(source, file), path.join(dist, file));
    console.log(chalk.blueBright(`  - copied: ${file}`));
  }
});

console.log(chalk.blue("api-docs: renaming local search index"));
const dir = "./api/.vitepress/dist/assets/chunks";
const targetDir = "./api/.vitepress/dist/assets";
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
    `api-docs: build finished in ${((end - start) / 1000).toFixed(3)}s`
  )
);
