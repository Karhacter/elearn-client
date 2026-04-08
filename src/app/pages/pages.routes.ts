import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { roleGuard } from '../core/guards/role.guard';
import { UserList } from './crud/user/list';
import { UserCreate } from './crud/user/create';
import { UserTrash } from './crud/user/trash';
import { UserView } from './crud/user/view';
import { CategoryList } from './crud/category/list';
import { CourseList } from './crud/course/list';
import { CourseTrash } from './crud/course/trash';
import { CourseCreate } from './crud/course/create';
import { CourseView } from './crud/course/view';
import { CourseEdit } from './crud/course/edit';
import { SectionList } from './crud/section/list';
import { SectionListDetail } from './crud/section/section-list';
import { SectionTrash } from './crud/section/trash';
import { CreateLesson } from './crud/section/component/create-lesson';

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
            // { path: 'user/edit/:id', component: UserEdit },
            { path: 'user/view/:id', component: UserView },

            // Category
            { path: 'category/list', component: CategoryList },

            // Course
            { path: 'course/list', component: CourseList },
            { path: 'course/trash', component: CourseTrash },
            { path: 'course/create', component: CourseCreate },
            { path: 'course/view/:id', component: CourseView },
            { path: 'course/edit/:id', component: CourseEdit }

            // Lesson
            // { path: 'lesson/list', component: LessonList },
        ]
    },

    {
        path: 'components',
        // 1. Tell Angular to trigger the new guard!
        canActivate: [roleGuard],
        // 2. Pass exactly the strict list of roles who are granted permission
        data: { roles: ['ADMIN'] },
        children: [
            { path: 'course/:courseId/section/list', component: SectionListDetail },
            { path: 'course/section/list', component: SectionList },
            { path: 'course/:courseId/section/trash', component: SectionTrash },
        ]
    },

    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
