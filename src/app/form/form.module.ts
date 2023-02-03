import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormComponent],
})
export class FormModule {}
