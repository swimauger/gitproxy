const proxies = require('../json/proxies.json');
const { exec } = require('child_process');
const directory = process.cwd();

function _cmd(command) {
    return new Promise(function (resolve) {
        exec(command, { cwd: directory}, function (err, stdout, stderr) {
            if (err) {
                resolve(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

class GitProxy {
    
    static getProxy() {
        return proxies[Math.floor(Math.random() * Math.floor(proxies.length))];
    }

    static async proxyUp(protocol) {
        protocol = protocol || await GitProxy.getProtocol();
        const { ip, port } = GitProxy.getProxy();
        return _cmd(`git config --global ${protocol}.proxy ${ip}:${port}`);
    }

    static async proxyDown(protocol) {
        protocol = protocol || await GitProxy.getProtocol();
        return _cmd(`git config --global --unset ${protocol}.proxy`);
    }

    static async listProxies() {
        const https = await _cmd('git config --global https.proxy');
        const http = await _cmd('git config --global http.proxy');
        return `\n[https]\t${https || '\n'}\n[http]\t${http || '\n'}`;
    }

    static execGit(command) {
        return _cmd(`git ${command}`);
    }

    static async getProtocol() {
        const remote = await _cmd('git config --get remote.origin.url');
        return remote.includes('https') ? 'https' : 'http';
    }
}

module.exports = GitProxy;
