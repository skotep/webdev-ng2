// Import the Angular JIT compiler.
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from '@angular/core';

import { AppModule } from "./app/app.module";

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

// Compile and mount the root component.
platformBrowserDynamic().bootstrapModule(AppModule);
