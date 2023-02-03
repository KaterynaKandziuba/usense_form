import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  colors = {
    gray: 'rgb(190, 188, 188)',
    green: 'rgb(6, 133, 61)',
    yellow: 'rgb(255, 230, 0)',
    red: 'rgb(219, 31, 78)',
  };

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

  get easyBarColor() {
    if (this.getPasswordStrength().isEmpty) return this.colors.gray;
    if (this.getPasswordStrength().isShort || this.getPasswordStrength().isEasy)
      return this.colors.red;
    if (this.getPasswordStrength().isMedium) return this.colors.yellow;
    if (this.getPasswordStrength().isStrong) return this.colors.green;
    else return this.colors.red;
  }

  get mediumBarColor() {
    if (this.getPasswordStrength().isShort) return this.colors.red;
    if (this.getPasswordStrength().isMedium) return this.colors.yellow;
    if (this.getPasswordStrength().isStrong) return this.colors.green;
    else return this.colors.gray;
  }

  get strongBarColor() {
    if (this.getPasswordStrength().isShort) return this.colors.red;
    if (this.getPasswordStrength().isMedium) return this.colors.gray;
    if (this.getPasswordStrength().isStrong) return this.colors.green;
    else return this.colors.gray;
  }

  getPasswordStrength() {
    const errors = this.form.get('password')?.errors;
    const isEmpty = !this.form.get('password')?.value.length;
    const isShort =
      this.form.get('password')?.value.length &&
      this.form.get('password')?.value.length < 8;
    const isEasy = errors!['easy'] && !errors!['medium'] && !errors!['strong'];
    const isMedium = errors!['medium'] && !errors!['strong'];
    const isStrong = errors!['strong'];
    return {
      isEmpty,
      isShort,
      isEasy,
      isMedium,
      isStrong,
    };
  }
}
