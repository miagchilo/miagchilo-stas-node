#!/usr/bin/env node

const axios = require('axios');
const { program } = require('commander');

program
  .option('-c, --concurrency <number>', 'number of parallel requests', parseInt)
  .option('-n, --requests <number>', 'number of requests to perform', parseInt)
  .arguments('<url>')
  .action(async (url) => {
    const concurrency = program.concurrency || 1;
    const requests = program.requests || 1;

    let successCount = 0;
    let failureCount = 0;
    let totalTime = 0;

    console.log(`bombarded\n${requests} times`);

    const promises = Array.from({ length: requests }).map(async (_, index) => {
      const startTime = Date.now();
      try {
        await axios.get(url);
        const requestTime = Date.now() - startTime;
        totalTime += requestTime;
        successCount++;
        console.log(`${index + 1} ${requestTime}`);
      } catch (error) {
        failureCount++;
        console.log(`${index + 1} Failed`);
      }
    });

    await Promise.all(promises);

    console.log(`${successCount} successful, ${failureCount} failing`);
    console.log(`average response time ${totalTime / successCount}ms`);
  });

program.parse(process.argv);

