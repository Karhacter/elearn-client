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
                                icon: 'pi pi-fw pi-user',
                                path: '/list',
                                items: [
                                    {
                                        label: 'Student',
                                        icon: 'pi pi-fw pi-user',
                                        routerLink: ['/pages/crud/user/list/student']
                                    },
                                    {
                                        label: 'Instructors',
                                        icon: 'pi pi-fw pi-user',
                                        routerLink: ['/pages/crud/user/list/instructors']
                                    }
                                ]
                            },
                            {
                                label: 'Create',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/pages/crud/user/create']
                            },
                            {
                                label: 'Trash',
                                icon: 'pi pi-fw pi-trash',
                                path: '/trash',
                                items: [
                                    {
                                        label: 'Student',
                                        icon: 'pi pi-fw pi-user',
                                        routerLink: ['/pages/crud/user/trash/student']
                                    },
                                    {
                                        label: 'Instructors',
                                        icon: 'pi pi-fw pi-user',
                                        routerLink: ['/pages/crud/user/trash/instructors']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Course',
                        icon: 'pi pi-fw pi-book',
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
                        routerLink: ['/pages/components/course/section/list']
                    }
                ]
            },
            {
                label: 'UI View',
                items: [
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/pages/menu/list']
                    }
                ]
            },

            {
                label: 'Systems',
                items: [
                    {
                        label: 'Contact',
                        icon: 'pi pi-fw pi-envelope',
                        routerLink: ['/pages/contact/list']
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/faq/list']
                    },
                    {
                        label: 'Topic',
                        icon: 'pi pi-fw pi-hashtag'
                    },
                    {
                        label: 'Blog',
                        icon: 'pi pi-fw pi-book'
                    },
                    {
                        label: 'About',
                        icon: 'pi pi-fw pi-info-circle'
                    }
                ]
            }
        ];
    }
}
