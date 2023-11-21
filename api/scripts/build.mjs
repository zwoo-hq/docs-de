import "zx/globals";
$.verbose = false;

console.log(chalk.blue("api-docs: build"));
const start = performance.now();

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

const end = performance.now();
console.log(
  chalk.blue(
    `api-docs: build finished in ${((end - start) / 1000).toFixed(3)}s`
  )
);
