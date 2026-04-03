import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { roleGuard } from '../core/guards/role.guard';
import { UserList } from './crud/user/list';
import { UserCreate } from './crud/user/create';
import { UserTrash } from './crud/user/trash';
import { UserEdit } from './crud/user/edit';

export default [
    {
        path: 'crud',
        // 1. Tell Angular to trigger the new guard!
        canActivate: [roleGuard],
        // 2. Pass exactly the strict list of roles who are granted permission
        data: { roles: ['ADMIN'] },
        children: [
            { path: '', redirectTo: '/notfound', pathMatch: 'full' },
            { path: 'user/list', component: UserList },
            { path: 'user/create', component: UserCreate },
            { path: 'user/trash', component: UserTrash },
            { path: 'user/edit/:id', component: UserEdit }
        ]
    },

    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
