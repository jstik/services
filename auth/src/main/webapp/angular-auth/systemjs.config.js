/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'ts':                        'npm:plugin-typescript@4.0.10/lib/plugin.js',
            'typescript':                'npm:typescript@2.0.3/lib/typescript.js',
            'underscore':                'npm:underscore@1.8.3',
            'jquery':                    'npm:jquery/dist/jquery.js',

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './login.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }});
       /* if (!global.noBootstrap) { bootstrap(); }*/

    // Bootstrap the `AppModule`(skip the `app/main.ts` that normally does this)
    function bootstrap() {

        // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
        System.set(System.normalizeSync('app/main.ts'), System.newModule({ }));

        // bootstrap and launch the app (equivalent to standard main.ts)
        Promise.all([
            System.import('@angular/platform-browser-dynamic'),
            System.import('app/app.module')
        ])
            .then(function (imports) {
                var platform = imports[0];
                var app      = imports[1];
                platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
            })
            .catch(function(err){ console.error(err); });
    }
})(this);
