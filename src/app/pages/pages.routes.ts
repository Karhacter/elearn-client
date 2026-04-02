import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { roleGuard } from '../core/guards/role.guard';
import { UserList } from './crud/user/list';

export default [
    { 
        path: 'crud', 
        // 1. Tell Angular to trigger the new guard!
        canActivate: [roleGuard], 
        // 2. Pass exactly the strict list of roles who are granted permission
        data: { roles: ['ADMIN'] },
        children: [
            { path: '', component: Crud },
            { path: 'user/list', component: UserList },
        ]
    },
   
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
