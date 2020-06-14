# GitProxy Node.js Package

![](https://img.shields.io/npm/dw/@swimauger/gitproxy?style=for-the-badge)
![](https://img.shields.io/npm/v/@swimauger/gitproxy?style=for-the-badge)
![](https://img.shields.io/github/license/swimauger/gitproxy?style=for-the-badge)

Node.js package built for running git commands over a proxy

| NOTE: GitProxy uses the `git` command to run over a proxy, so please be sure [Git](https://git-scm.com/downloads) is installed before proceeding! |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: |


## Installation

**Install gitproxy**
`npm install gitproxy -g`

## Usage
```
    Usage: gitproxy [options]

    If no options are selected it will treat the command like git

    Options:
    -u, --up <protocol>    open proxy with protocol http or https
    -d, --down <protocol>  shutdown proxy with protocol http or https
    -l, --list             list current proxies
    -h, --help             display help for command
```
## Examples

### Running normal git
```Shell
    gitproxy push origin master
```
Treat gitproxy like a normal git command. For instance `git add .` would be `gitproxy add .`

#

### GitProxy can also be used interchangably with normal Git
```Shell
    git add -A
    git commit -m "A very urgent test commit"
    gitproxy push origin master
```
GitProxy mostly serves a purpose for pushing to repos and such. For example `gitproxy status` does not really serve any purpose over the normal `git status`. That said, feel free to use however you like : )

#

### Edit git config proxies
```Shell
    # Open up a new https proxy in the git config
    gitproxy -u https

    # Delete the http proxy in the git config
    gitproxy -d http
```
GitProxy can set a new random proxy for you in the gitconfig; however, by running `gitproxy` as a git command, it could overwrite the old proxy with a new one under the conditions that the repo is using the same SSL protocol

#

### List git config proxies
```Shell
      gitproxy -l

# ======= OR ======= #

    gitproxy --list
```
`gitproxy -l` will list open proxies on either http or https and if there are any.

#

### Help
```Shell
    gitproxy -h
```
If you are ever stuck refer to the help menu with `gitproxy -h` or `gitproxy --help`. You can also see the different flag names there are.