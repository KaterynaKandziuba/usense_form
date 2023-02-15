import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputModule } from '../passwordInput/passwordInput.module';
import { PasswordValidatorsModule } from '../passwordValidators/passwordValidators.module';
import { FormComponent } from './components/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordInputModule,
    PasswordValidatorsModule,
  ],
  exports: [FormComponent],
})
export class FormModule {}
