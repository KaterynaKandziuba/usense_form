import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordValidatorsComponent } from './components/passwordValidators.component';

@NgModule({
  declarations: [PasswordValidatorsComponent],
  imports: [CommonModule],
  exports: [PasswordValidatorsComponent],
})
export class PasswordValidatorsModule {}
