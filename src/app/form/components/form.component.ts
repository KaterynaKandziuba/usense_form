import { Component, DoCheck } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { PasswordValidationClasses } from 'src/app/types/passwordValidationClasses.enum';

@Component({
  selector: 'us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements DoCheck {
  readonly passwordControl = new FormControl('', [
    this.passwordStrengthValidator(),
  ]);
  private errors!: ValidationErrors | null;

  ngDoCheck() {
    this.errors = this.passwordControl?.errors;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const strongRegex = new RegExp(
        '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.,?!@#$%^&*])(?=.{8,})'
      );
      const mediumRegex = new RegExp(
        '^(((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[.,?!@#$%^&*]))|((?=.*[.,?!@#$%^&*])(?=.*[0-9])))(?=.{8,})'
      );
      const easyRegex = new RegExp(
        '^((?=.*[a-zA-Z])|(?=.*[0-9])|(?=.*[.,?!@#$%^&*]))(?=.{8,})'
      );
      const errors = {
        short: !easyRegex.test(control.value) && control.value.length > 0,
        easy: easyRegex.test(control.value),
        medium: mediumRegex.test(control.value),
        strong: strongRegex.test(control.value),
      };
      return errors ?? null;
    };
  }

  get passwordStrengthClass(): string {
    if (this.isStrong) return PasswordValidationClasses.Strong;
    else if (this.isMedium) return PasswordValidationClasses.Medium;
    else if (this.isEasy) return PasswordValidationClasses.Easy;
    else if (this.isEmpty) return PasswordValidationClasses.Empty;
    else return PasswordValidationClasses.Short;
  }

  get isEasy(): boolean {
    return (
      this.errors!['easy'] && !this.errors!['medium'] && !this.errors!['strong']
    );
  }

  get isMedium(): boolean {
    return this.errors!['medium'] && !this.errors!['strong'];
  }

  get isStrong(): boolean {
    return this.errors!['strong'];
  }

  get isEmpty(): boolean {
    return !this.passwordControl?.value?.length;
  }
}
