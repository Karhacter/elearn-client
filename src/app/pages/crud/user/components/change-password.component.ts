import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, FluidModule, InputTextModule, ButtonModule],
    template: `
        <p-card header="Change Password">
            <p-fluid>
                <div class="flex flex-col gap-6 max-w-lg">
                    <div class="flex flex-col gap-2">
                        <label for="currentPassword" class="font-bold text-surface-900">Current Password</label>
                        <input pInputText id="currentPassword" type="password" [(ngModel)]="passwordData.current" placeholder="Enter current password" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="newPassword" class="font-bold text-surface-900">New Password</label>
                        <input pInputText id="newPassword" type="password" [(ngModel)]="passwordData.new" placeholder="Enter new password" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="confirmPassword" class="font-bold text-surface-900">Confirm Password</label>
                        <input pInputText id="confirmPassword" type="password" [(ngModel)]="passwordData.confirm" placeholder="Confirm new password" />
                    </div>
                    <div class="flex justify-end mt-4">
                        <p-button label="Change Password" icon="pi pi-lock" (click)="changePassword()"></p-button>
                    </div>
                </div>
            </p-fluid>
        </p-card>
    `
})
export class ChangePasswordComponent {
    private messageService = inject(MessageService);

    passwordData = { current: '', new: '', confirm: '' };

    changePassword() {
        if (!this.passwordData.current || !this.passwordData.new || !this.passwordData.confirm) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all password fields.' });
            return;
        }
        if (this.passwordData.new !== this.passwordData.confirm) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'New passwords do not match.' });
            return;
        }

        // Mock successful password change
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully!' });
        this.passwordData = { current: '', new: '', confirm: '' };
    }
}
