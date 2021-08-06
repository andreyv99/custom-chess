import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { LocalStorageService } from '../../services/local-storage.service';

@Directive({
  selector: '[asyncUserNameValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }]
})
export class UsernameValidatorDirective implements Validator {

  constructor(private localStorageSvc: LocalStorageService) { }

  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.localStorageSvc.getItem(ctrl.value) ? { error1: { value: 'username is already taken' } } : null;
  }

}
