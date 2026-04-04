import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-profile-info',
    standalone: true,
    imports: [CommonModule, FormsModule, CardModule, FluidModule, InputTextModule, SelectModule, DatePickerModule, ButtonModule],
    templateUrl: './profile-info.html'
})
export class ProfileInfoComponent {
    @Input() user: any = {};
    @Input() genders: any[] = [];
    @Input() countries: any[] = [];
    @Input() cities: any[] = [];
    @Input() isBirthdayInvalid: boolean = false;

    @Output() birthdayChanged = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();

    onBirthdayChange() {
        this.birthdayChanged.emit();
    }

    onBack() {
        this.back.emit();
    }

    onSave() {
        this.save.emit();
    }
}
