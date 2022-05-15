#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const strT = '├── ';
const strL = '└── ';
const strI = '│   ';
const strEmpty = '    ';
const route = [];
const inputPath = process.argv[2] || __dirname;
console.log(path.basename(inputPath));
walk(inputPath, route);

function walk(dir, route) {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) return;
    const files = fs.readdirSync(dir);
    files.forEach((filename, index) => {
        let preStr = strT;
        let extraStr = strI;
        if (index === files.length - 1) {
            preStr = strL;
            extraStr = strEmpty;
        }
        const curPath = path.join(dir, filename);
        console.log(route.join('') + preStr + path.relative(dir, curPath));

        route.push(extraStr);
        walk(curPath, route);
        route.pop();
    });
}

