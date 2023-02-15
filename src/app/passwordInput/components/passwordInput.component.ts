import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'us-pwd-input',
  styleUrls: ['./passwordInput.component.scss'],
  templateUrl: './passwordInput.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputComponent),
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  value!: string | null;
  passwordInputControl = new FormControl('');

  private onTouched = () => undefined;
  private onChanged = (v: string | null) => undefined;

  onValueChange() {
    this.writeValue(this.passwordInputControl.value);
    this.onChanged(this.value);
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
