import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-structure',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div id="structure" class="md:scroll-m-[130px] scroll-m-28">
      <h3 class="text-2xl font-semibold mt-8 text-black">
        Package Structure
      </h3>
      <div class="rounded-md p-6 pt-3 border border-dark_border border-opacity-60 mt-6">
        <div class="flex items-center gap-4">
          <h5 class="text-base font-medium text-muted mt-3 mb-1">
            SiEducational Tailwind Angular Template
          </h5>
        </div>
        <ul class="ps-0 md:ps-5 list-none m-0 p-0">
          <li class="py-2">
            <div class="flex items-center gap-3">
              <p class="text-xl text-black m-0">|—</p>
              <span class="font-medium text-muted flex items-center">
                <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                packages
              </span>
            </div>
            <div class="flex">
              <div class="flex flex-col justify-between gap-2 mt-2">
                <p class="text-xl text-black m-0" *ngFor="let item of [].constructor(22)">|</p>
              </div>
              <ul class="ps-5 md:ps-5 list-none m-0 p-0">
                <li class="py-0">
                  <ul class="ps-2 ps-md-3 list-none m-0 p-0">
                    <li class="py-2">
                      <ul class="ps-0 md:ps-5 list-none m-0 p-0">
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                              markdown
                            </span>
                          </div>
                        </li>
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                              public
                            </span>
                          </div>
                        </li>
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                              src
                            </span>
                          </div>
                          
                          <div class="flex">
                            <div class="flex flex-col justify-between gap-2 mt-2">
                              <p class="text-xl text-black m-0" *ngFor="let item of [].constructor(16)">|</p>
                            </div>
                            <ul class="ps-5 md:ps-12 list-none m-0 p-0">
                              <li class="py-2">
                                <div class="flex items-center gap-3">
                                  <p class="text-xl text-black m-0">|—</p>
                                  <span class="font-medium text-muted flex items-center">
                                    <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                                    app
                                  </span>
                                </div>
                                <div class="flex">
                                  <div class="flex flex-col justify-between gap-2 mt-2">
                                    <p class="text-xl text-black m-0" *ngFor="let item of [].constructor(14)">|</p>
                                  </div>
                                  <ul class="ps-5 md:ps-12 list-none m-0 p-0">
                                    <li class="py-2">
                                      <div class="flex items-center gap-3">
                                        <p class="text-xl text-black m-0">|—</p>
                                        <span class="font-medium text-muted flex items-center">
                                          <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                                          features
                                        </span>
                                        <span class="text-xs text-muted ms-4">(Contains all the pages/modules)</span>
                                      </div>
                                    </li>
                                    <li class="py-2">
                                      <div class="flex items-center gap-3">
                                        <p class="text-xl text-black m-0">|—</p>
                                        <span class="font-medium text-muted flex items-center">
                                          <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                                          shared
                                        </span>
                                      </div>
                                    </li>
                                    <li class="py-2">
                                      <div class="flex items-center gap-3">
                                        <p class="text-xl text-black m-0">|—</p>
                                        <span class="font-medium text-muted">app.component.ts</span>
                                      </div>
                                    </li>
                                    <li class="py-2">
                                      <div class="flex items-center gap-3">
                                        <p class="text-xl text-black m-0">|—</p>
                                        <span class="font-medium text-muted">app.routes.ts</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              
                              <li class="py-2">
                                <div class="flex items-center gap-3">
                                  <p class="text-xl text-black m-0">|—</p>
                                  <span class="font-medium text-muted flex items-center">
                                    <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                                    styles
                                  </span>
                                </div>
                              </li>
                              
                              <li class="py-2">
                                <div class="flex items-center gap-3">
                                  <p class="text-xl text-black m-0">|—</p>
                                  <span class="font-medium text-muted flex items-center">
                                    <iconify-icon icon="tabler:folder" class="text-primary text-base inline-block me-2"></iconify-icon>
                                    environments
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                        
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <i class="ti ti-file me-2 text-primary font-bold"></i>
                              angular.json
                            </span>
                          </div>
                        </li>
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <i class="ti ti-file me-2 text-primary font-bold"></i>
                              tailwind.config.ts
                            </span>
                          </div>
                        </li>
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <i class="ti ti-file me-2 text-primary font-bold"></i>
                              package.json
                            </span>
                          </div>
                        </li>
                        <li class="py-2">
                          <div class="flex items-center gap-3">
                            <p class="text-xl text-black m-0">|—</p>
                            <span class="font-medium text-muted flex items-center">
                              <i class="ti ti-file me-2 text-primary font-bold"></i>
                              tsconfig.json
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    iconify-icon {
      vertical-align: sub;
    }
  `]
})
export class PackageStructureComponent {}
