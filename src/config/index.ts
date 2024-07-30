import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

const configFileNameObj = {
    development: 'dev',
    production: 'prod',
}

const env = process.env.NODE_ENV || 'development';
console.log('environment: ', env);

export default () => {
    return yaml.load(
        readFileSync(join(__dirname, `./${configFileNameObj[env]}.yml`), 'utf8')
    ) as Record<string, any>;
}