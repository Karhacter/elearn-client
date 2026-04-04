import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProfileInfoComponent } from './components/profile-info.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { UserChartComponent } from './components/user-chart.component';

@Component({
    selector: 'app-user-view',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, FluidModule, InputTextModule, SelectModule, DatePickerModule, ButtonModule, ToastModule, ChartModule, RippleModule, ProfileInfoComponent, ChangePasswordComponent, UserChartComponent],
    providers: [MessageService],
    templateUrl: './view.html'
})
export class UserView implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private userService = inject(UserService);
    private messageService = inject(MessageService);

    previewImage: string | null = null;
    selectedAvatarFile: File | null = null;
    isBirthdayInvalid: boolean = false;

    get avatarUrl(): string {
        if (this.previewImage) {
            return this.previewImage;
        }
        if (this.user?.profilePicture) {
            // Guard to make sure we don't prepend base URL twice
            if (this.user.profilePicture.startsWith('http')) {
                return this.user.profilePicture;
            }
            return 'http://localhost:5263' + this.user.profilePicture;
        }
        return 'https://primefaces.org/cdn/primeng/images/avatar/amyelsner.png';
    }

    user: any = {
        fullName: '',
        email: '',
        profilePicture: null,
        gender: null,
        birthday: null,
        country: null,
        city: null,
        street: ''
    };

    genders: any[] = [];
    countries: any[] = [];
    cities: any[] = [];

    // State
    currentTab: string = 'profile';
    menuItems = [
        { label: 'Public Profile', icon: 'pi pi-user', id: 'profile' },
        { label: 'Change Password', icon: 'pi pi-lock', id: 'password' },
        { label: 'User Activity', icon: 'pi pi-chart-bar', id: 'chart' }
    ];

    setTab(tabId: string) {
        this.currentTab = tabId;
    }

    ngOnInit(): void {
        this.genders = [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'PreferNotToSay', value: 'PreferNotToSay' }
        ];

        this.countries = [
            { name: 'United States', code: 'US' },
            { name: 'United Kingdom', code: 'UK' },
            { name: 'Vietnam', code: 'VN' }
        ];

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'London', code: 'LDN' },
            { name: 'Hanoi', code: 'HN' },
            { name: 'Los Angeles', code: 'LA' }
        ];

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.userService.getCurrentUser(Number(id)).subscribe({
                next: (res) => {
                    if (res && res.data) {
                        const data = res.data as any;
                        // Merge all backend data to preserve fields not shown in UI (like role, phoneNumber)
                        this.user = { ...this.user, ...data };

                        // Map backend string identifiers back to PrimeNG UI Dropdown objects
                        if (data.gender) {
                            this.user.gender = this.genders.find((g) => g.value === data.gender || g.label === data.gender) || { label: data.gender, value: data.gender };
                        }
                        if (data.countryName) {
                            this.user.country = { name: data.countryName, code: data.countryCode };
                        }
                        if (data.cityName) {
                            this.user.city = { name: data.cityName, code: data.cityCode };
                        }
                        if (data.birthday) {
                            this.user.birthday = new Date(data.birthday);
                        }
                    }
                },
                error: (err) => {
                    console.error('Error loading user data', err);
                }
            });
        }
    }

    back() {
        this.router.navigate(['pages/crud/user/list']);
    }

    validateBirthday(): boolean {
        if (!this.user.birthday) {
            this.isBirthdayInvalid = false;
            return true;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(this.user.birthday);
        if (selectedDate >= today) {
            this.isBirthdayInvalid = true;
            return false;
        }

        this.isBirthdayInvalid = false;
        return true;
    }

    saveUser() {
        if (!this.validateBirthday()) {
            this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fix validation errors before saving.' });
            return;
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            let task$ = of<any>(null); // base observable

            if (this.selectedAvatarFile) {
                task$ = this.userService.uploadUserImage(Number(id), this.selectedAvatarFile).pipe(
                    switchMap((res) => {
                        const newProfilePicture = (typeof res?.data === 'string') 
                            ? res.data 
                            : (res?.data?.imageUrl || res?.data?.profilePicture || res?.imageUrl);
                        if (newProfilePicture) {
                            this.user.profilePicture = newProfilePicture;
                        }
                        return of(true);
                    })
                );
            }

            task$
                .pipe(
                    switchMap(() => {
                        // Ensure profilePicture is completely fully-qualified to pass the strict .NET [Url] validation requirement
                        let finalProfilePicture = this.user.profilePicture;
                        if (finalProfilePicture && !finalProfilePicture.startsWith('http')) {
                            finalProfilePicture = 'http://localhost:5263' + finalProfilePicture;
                        }

                        // Map UI object configurations back into expected UpdateUserRequest DTO layout
                        const updatePayload = {
                            fullName: this.user.fullName,
                            email: this.user.email,
                            phoneNumber: this.user.phoneNumber || '000000000', // required
                            role: this.user.role || 'Student', // required
                            profilePicture: finalProfilePicture,
                            gender: this.user.gender?.value || this.user.gender?.label || this.user.gender,
                            birthday: this.user.birthday,
                            countryCode: this.user.country?.code || this.user.countryCode,
                            countryName: this.user.country?.name || this.user.countryName,
                            cityCode: this.user.city?.code || this.user.cityCode,
                            cityName: this.user.city?.name || this.user.cityName,
                            street: this.user.street
                        };

                        return this.userService.updateUser(Number(id), updatePayload);
                    })
                )
                .subscribe({
                    next: () => {
                        this.previewImage = null;
                        this.selectedAvatarFile = null;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
                        setTimeout(() => this.back(), 1500);
                    },
                    error: (err) => {
                        console.error('Error updating user', err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user.' });
                    }
                });
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            // 1. Show local preview instantly
            this.previewImage = URL.createObjectURL(file);
            // 2. Store the file to be uploaded purely on Save Changes click
            this.selectedAvatarFile = file;
        }
    }
}
