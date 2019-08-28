const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/tictac-toe/runtime.js',
        './dist/tictac-toe/polyfills.js',
        './dist/tictac-toe/scripts.js',
        './dist/tictac-toe/main.js',
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/components.js');
    await fs.copyFile(
        './dist/tictac-toe/styles.css',
        'elements/styles.css'
    );
    await fs.copyFile(
        './dist/assets/data.json',
        'elements/data.json'
    );
    
})();