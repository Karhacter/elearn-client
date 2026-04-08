import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '@/app/core/services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];
    authService = inject(AuthService);

    ngOnInit() {
        const user = this.authService.getAuthUser();
        const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

        this.model = [
            // Trang chu
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'CRUD',
                icon: 'pi pi-fw pi-briefcase',
                path: '/crud',
                items: [
                    {
                        label: 'User',
                        path: '/user',
                        icon: 'pi pi-fw pi-users',
                        // PrimeNG property to natively hide it if false
                        visible: isAdmin,
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/crud/user/list']
                            },
                            {
                                label: 'Create',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/crud/user/create']
                            },
                            {
                                label: 'Trash',
                                icon: 'pi pi-fw pi-trash',
                                routerLink: ['/pages/crud/user/trash']
                            }
                        ]
                    },
                    {
                        label: 'Course',
                        icon: 'pi pi-fw pi-tag',
                        path: '/crud/course',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['pages/crud/course/list']
                            },
                            {
                                label: 'Create',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['pages/crud/course/create']
                            },
                            {
                                label: 'Trash',
                                icon: 'pi pi-fw pi-trash',
                                routerLink: ['pages/crud/course/trash']
                            }
                        ]
                    },
                    {
                        label: 'Category',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['pages/crud/category/list']
                    }
                ]
            },
            {
                label: 'Components',
                icon: 'pi pi-fw pi-briefcase',
                path: '/components',
                items: [
                    {
                        label: 'Section',
                        path: '/section',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/components/course/section/list']
                            }
                        ]
                    }
                ]
            }
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
        ];
    }
}
