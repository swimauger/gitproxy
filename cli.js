#!/usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander');
const package = require('./package.json');
const GitProxy = require('./lib/js/gitproxy');

console.log(chalk.bgKeyword('darkgreen')(`  GitProxy    :   GitProxy Library by Mark Auger, ${package.version}  `));

program
    .option('-u, --up <protocol>', 'open proxy with protocol http or https')
    .option('-d, --down <protocol>', 'shutdown proxy with protocol http or https')
    .option('-l, --list', 'list current proxies')
    .allowUnknownOption();

const git = process.argv.slice(2).join(' ');
program.parse(process.argv);

async function run() {
    try {
        if (program.up) {
            switch (program.up) {
                case 'https':
                    await GitProxy.proxyUp('https');
                    break;
                case 'http':
                    await GitProxy.proxyUp('http');
                    break;
                default:
                    throw ` Invalid Protocol: Needed https or http, given ${program.up || 'no arguments'} `;
            }
            console.log(chalk.greenBright(`Proxy up over ${program.up}`));
        } else if (program.down) {
            switch (program.down) {
                case 'https':
                    await GitProxy.proxyDown('https');
                    break;
                case 'http':
                    await GitProxy.proxyDown('http');
                    break;
                default:
                    throw ` Invalid Protocol: Needed https or http, given ${program.down || 'no arguments'} `;
            }
            console.log(chalk.greenBright(`Proxy over ${program.down} shut off`));
        } else if (program.list) {
            console.log(await GitProxy.listProxies());
        } else if(git.length > 0) {
            console.log(chalk.cyanBright('\nOpening up proxy...'));
            await GitProxy.proxyUp();
            console.log(chalk.greenBright('Proxy opened successfully, executing', chalk.cyanBright(`git ${git}`)));
            console.log(await GitProxy.execGit(git));
        } else {
            program.help();
        }
    } catch (error) {
        console.error(`\n${chalk.red(error)}\n`);
    }
}

run();
