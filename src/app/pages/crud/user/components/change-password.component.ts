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
    templateUrl: './change-password.html'
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
