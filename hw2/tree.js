const fs = require('fs').promises;
const path = require('path');
const { program } = require('commander');

async function printTree(filePath, depth, currDepth = 0, indent = '') {
  const stats = await fs.stat(filePath);
  if (stats.isDirectory()) {
    if (currDepth <= depth) {
      console.log(`${indent}${path.basename(filePath)}/`);
      const files = await fs.readdir(filePath);
      for (const file of files) {
        await printTree(path.join(filePath, file), depth, currDepth + 1, indent + '  ');
      }
    }
  } else {
    console.log(`${indent}${path.basename(filePath)}`);
  }
}

program
  .arguments('<path>')
  .option('-d, --depth <n>', 'Set maximum depth for directory traversal', parseInt)
  .action(async (path) => {
    const { depth } = program.opts();
    await printTree(path, depth || Number.POSITIVE_INFINITY);
  });

program.parse(process.argv);