import { Component } from '@angular/core';
import { DocNavigationComponent } from './components/doc-navigation/doc-navigation.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { PackageStructureComponent } from './components/package-structure/package-structure.component';
import { QuickStartComponent } from './components/quick-start/quick-start.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    DocNavigationComponent,
    IntroductionComponent,
    PackageStructureComponent,
    QuickStartComponent,
    ConfigurationComponent
  ],
  template: `
    <div>
      <div class="container mx-auto max-w-7xl p-6 lg:pt-44 pt-16">
        <div class="grid grid-cols-12 gap-6">
          <div class="lg:col-span-3 col-span-12 lg:block hidden relative">
            <app-doc-navigation></app-doc-navigation>
          </div>
          <div class="lg:col-span-9 col-span-12">
            <app-introduction></app-introduction>
            <app-package-structure></app-package-structure>
            <app-quick-start></app-quick-start>
            <app-configuration></app-configuration>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DocumentationComponent {}
