import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

enum PasswordValidationClasses {
  Empty = 'empty-pass',
  Short = 'short-pass',
  Easy = 'easy-pass',
  Medium = 'medium-pass',
  Strong = 'strong-pass',
}

@Component({
  selector: 'us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      password: new FormControl('', [this.passwordStrengthValidator()]),
    });
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
      const strong = strongRegex.test(control.value);
      const medium = mediumRegex.test(control.value);
      const easy = easyRegex.test(control.value);
      const short = !easy && control.value.length;
      const errors = {
        short,
        easy,
        medium,
        strong,
      };
      return errors ?? null;
    };
  }

  get passwordStrength(): string {
    const errors = this.form.get('password')?.errors;
    const isEmpty = !this.form.get('password')?.value.length;
    const isEasy = errors!['easy'] && !errors!['medium'] && !errors!['strong'];
    const isMedium = errors!['medium'] && !errors!['strong'];
    const isStrong = errors!['strong'];
    if (isStrong) return PasswordValidationClasses.Strong;
    else if (isMedium) return PasswordValidationClasses.Medium;
    else if (isEasy) return PasswordValidationClasses.Easy;
    else if (isEmpty) return PasswordValidationClasses.Empty;
    else return PasswordValidationClasses.Short;
  }
}
