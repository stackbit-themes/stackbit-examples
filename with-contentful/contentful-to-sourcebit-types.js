#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let types = fs.readFileSync(path.join(__dirname, 'types/contentful.d.ts'), 'utf-8');

types = types.replace(
    /import { Document } [^\n]+\n/,
    `$&
export interface Metadata {
    __metadata: {
        id: string;
        modelName: string;
        urlPath?: string;
    };
}
`
);

types = types.replace(/export interface I(\S+)Fields {/g, 'export interface I$1 extends Metadata {');
types = types.replace(/export interface I(\S+) extends Entry<I(\S+)> {[\s\S]+?\n}\n/g, '');
types = types.replace(/Asset \| undefined/g, 'string | null');

fs.writeFileSync(path.join(__dirname, 'types/sourcebit.ts'), types);
