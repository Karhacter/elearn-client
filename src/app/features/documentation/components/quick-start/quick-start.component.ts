import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  template: `
    <div class="pb-10 md:scroll-m-[180px] scroll-m-28" id="start">
      <h3 class="text-black text-2xl font-semibold mt-8">Quick Start</h3>
      <div class="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 class="text-black text-lg font-medium">1. Requirements</h6>
        <p class="text-base font-medium text-muted text-opacity-60">
          Before proceeding, you need to have the latest stable
          <a href="https://nodejs.org/" class="text-primary hover:underline">node.js</a>
        </p>
        <h6 class="mt-4 mb-2 text-black font-medium text-base">
          Recommended environment:
        </h6>
        <ul class="list-disc text-muted text-opacity-60 ps-6">
          <li>node js 20+</li>
          <li>npm js 10+</li>
        </ul>
      </div>
      <div class="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 class="text-black text-lg font-medium">2. Install</h6>
        <p class="text-base font-medium text-muted text-opacity-60">
          Open package folder and install its dependencies. We recommend yarn or npm.
        </p>
        <h6 class="mt-4 mb-2 text-black text-dark font-medium text-base">
          1) Install with npm:
        </h6>
        <div class="py-4 px-3 rounded-md bg-black">
          <p class="text-sm text-white/60">
            <span class="text-yellow-500">cd</span> project-folder
          </p>
          <p class="text-sm text-white/60 mt-2">npm install</p>
        </div>
      </div>
      <div class="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 class="text-black text-lg font-medium">3. Start</h6>
        <p class="text-base font-medium text-muted text-opacity-60 mb-4">
          Once npm install is done now you can run the app.
        </p>
        <div class="py-4 px-3 rounded-md bg-black">
          <p class="text-sm text-white/60">npm start or ng serve</p>
        </div>
        <p class="text-base font-medium text-muted text-opacity-60 my-4">
          This command will start a local webserver
          <span class="dark:text-black font-semibold">http://localhost:4200:</span>
        </p>
        <div class="py-4 px-3 rounded-md bg-black">
          <p class="text-sm text-white/60">
            > elearn-client&#64;0.0.0 start
          </p>
          <p class="text-sm text-white/60 mt-1">> ng serve</p>
          <p class="text-sm text-white/60 mt-6">- Angular CLI: 19.x</p>
          <p class="text-sm text-white/60 mt-1">
            - Local: http://localhost:4200
          </p>
        </div>
      </div>
      <div class="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 class="text-black text-lg font-medium">
          4. Build / Deployment
        </h6>
        <p class="text-base font-medium text-muted text-opacity-60 mb-4">
          Run below command for build a app.
        </p>

        <div class="py-4 px-3 rounded-md bg-black">
          <p class="text-sm text-white/60">npm run build or ng build</p>
        </div>
        <p class="text-base font-medium text-muted text-opacity-60 mt-6">
          Finally, Your webiste is ready to be deployed.🥳
        </p>
      </div>
    </div>
  `
})
export class QuickStartComponent {}
