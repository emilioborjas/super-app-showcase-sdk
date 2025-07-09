const { execSync } = require('child_process');
const fs = require('fs');

const command = process.argv[2];
const bumpType = process.argv[3]; // major | minor | patch

const bumpVersion = (type) => {
    if (!['major', 'minor', 'patch'].includes(type)) {
        console.error('Usage: node release.js bump [major|minor|patch]');
        process.exit(1);
    }

    console.log(`Bumping version (${type})...`);
    execSync(`pnpm version ${type} --no-git-tag-version`, { stdio: 'inherit' });
};

const publish = () => {
    console.log('Publishing package...');
    execSync(`pnpm publish `, { stdio: 'inherit' });
};

const run = async () => {
    if (command === 'bump') {
        bumpVersion(bumpType);
    } else if (command === 'publish') {
        publish();
    } else {
        console.log(`
Usage:
  node scripts/release.js bump [major|minor|patch]
  node scripts/release.js publish
    `);
        process.exit(1);
    }
};

run();