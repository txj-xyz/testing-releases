const { MenuItem } = require('electron');

const [{ app, dialog, clipboard, BrowserWindow, Menu }, { writeFileSync, readFileSync, mkdirSync, existsSync }, { resolve }, Window] = ['electron', 'node:fs', 'path', '../base/Window.js'].map(
    require
);

module.exports = class Config extends Window {
    constructor() {
        super();
        // super().ipcLoader(this.managerListener);
        this.clicked();
    }

    clicked = _ => {
        const configBuffer = Buffer.from(JSON.stringify(config.referenceStorage)).toString('base64');

        const c = new Menu();

        try {
            const read = clipboard.readText()
            JSON.parse(Buffer.from(read, 'base64').toString());
            const importConfig = new MenuItem({
                label: 'Import',
                click: () => {
                    windows.main?.webContents.send('configManager', { type: 'import', config: JSON.parse(Buffer.from(read, 'base64').toString()) });
                },
            });
            c.append(importConfig);
        } catch {

        }

        const exportConfig = new MenuItem({
            label: 'Export',
            click: () => {
                clipboard.writeText(configBuffer);
                windows.main?.webContents.send('configManager', { type: 'export', config: configBuffer });
            },
        });

        c.append(exportConfig);
        c.popup(windows.main);
    };
};
