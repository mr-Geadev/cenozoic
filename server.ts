import { enableProdMode } from "@angular/core";
// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

import * as express from "express";
import { readFileSync } from "fs";
import { join } from "path";
import "reflect-metadata";
import "zone.js/dist/zone-node";

import { ROUTES } from "./static.paths";

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');


// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/api/test', (req, res) => {
    res.send('adads');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

ROUTES.forEach((path: string) => {
    app.get(path, (req, res) => {
        res.render('index', { req });
    });
});


// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
