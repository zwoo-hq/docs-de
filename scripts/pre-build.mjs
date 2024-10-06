import "zx/globals";
$.verbose = false;

const start = performance.now();

const targets = ["api", "dev", "docs"];

targets.forEach((target) => {
  console.log(chalk.cyan(`${target}-docs: preparing`));
  const publicDir = `./public`;
  const targetDir = `./${target}/public/`;

  console.log(chalk.blue(`${target}-docs: copying common public directory`));
  console.log(chalk.green(`source dir: ${publicDir}`));
  console.log(chalk.green(`target dir: ${targetDir}`));
  const publicFiles = fs.readdirSync(publicDir);
  for (const file of publicFiles) {
    const filePath = path.join(publicDir, file);
    const copyPath = path.join(targetDir, file);

    if (!fs.existsSync(copyPath)) {
      fs.mkdirpSync(targetDir);
    }

    console.log(chalk.blueBright(`  - found: ${filePath}`));
    console.log(chalk.blueBright(`  - copied to: ${copyPath}`));
    fs.copyFileSync(filePath, copyPath);
  }
});

const end = performance.now();
console.log(
  chalk.cyan(`build finished in ${((end - start) / 1000).toFixed(3)}s`)
);
