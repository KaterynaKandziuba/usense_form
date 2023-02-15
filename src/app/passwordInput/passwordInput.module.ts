import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './components/passwordInput.component';

@NgModule({
  declarations: [PasswordInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
