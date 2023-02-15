import { Component, Input } from '@angular/core';

@Component({
  selector: 'us-pwd-validators',
  templateUrl: './passwordValidators.component.html',
  styleUrls: ['./passwordValidators.component.scss'],
})
export class PasswordValidatorsComponent {
  @Input() passwordStrengthClass!: string;
}
