import {Component, computed, inject, input, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-floating-configurator',
    imports: [CommonModule, ButtonModule, StyleClassModule, AppConfigurator],
    template: `
        <div class="flex gap-4 top-8 right-8" [ngClass]="{'fixed':float()}">
            <p-button type="button"  (onClick)="toggleDarkMode()" [rounded]="true" [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
            <div class="relative">
                <p-button icon="pi pi-palette" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" type="button" rounded />
              
            </div>
        </div>
    `
})
export class AppFloatingConfigurator implements OnInit {
    LayoutService = inject(LayoutService);

    float = input<boolean>(true);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    ngOnInit() {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                const isDark = savedTheme === 'dark';
                this.LayoutService.layoutConfig.update((state) => ({ ...state, darkTheme: isDark }));
            }
        }
    }

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update((state) => {
            const isDark = !state.darkTheme;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }
            return { ...state, darkTheme: isDark };
        });
    }

}
