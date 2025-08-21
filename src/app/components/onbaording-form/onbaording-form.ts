
import { Component, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-onbaording-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './onbaording-form.html',
  styleUrl: './onbaording-form.scss'
})
export class OnbaordingForm {

  userService = inject(User)

  currentStep = this.userService.currentStep

  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.onboardingForm = this.fb.group({
      // STEP 1: Personal Details
      personalDetails: this.fb.group({
        name: ['', [Validators.required,
        Validators.minLength(2)]
        ],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', Validators.required],
      }),
      // STEP 2: Company Details
      companyDetails: this.fb.group({
        name: ['', Validators.required],
        industry: ['', Validators.required],
        companySize: ['', Validators.required],
      }),
      // STEP 3: Store Details
      storeDetails: this.fb.group({
        storeName: ['', Validators.required],
        category: ['', Validators.required],
        storeUrl: ['', Validators.required],
      }),
      // STEP 4: Bank Details
      bankDetails: this.fb.group({
        accountHolderName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        ifscCode: ['', Validators.required],
        bankName: [''],
      }),
      confirm: this.fb.group({ agree: [false, Validators.requiredTrue] }),
    })
  }

  /** Map current step (1..5) to its FormGroup */
  private getStepGroup(step = this.currentStep()): FormGroup {
    switch (step) {
      case 1: return this.onboardingForm.get('personalDetails') as FormGroup;
      case 2: return this.onboardingForm.get('companyDetails') as FormGroup;
      case 3: return this.onboardingForm.get('storeDetails') as FormGroup;
      case 4: return this.onboardingForm.get('bankDetails') as FormGroup;
      case 5: return this.onboardingForm.get('confirm') as FormGroup;
      default: return this.onboardingForm;
    }
  }

  private markGroupTouchedAndDirty(group: FormGroup) {
    Object.values(group.controls).forEach(ctrl => {
      ctrl.markAsTouched();
      ctrl.markAsDirty();
      // recurse into nested groups/arrays
      // @ts-expect-error — controls may have nested controls
      if (ctrl?.controls) {
        this.markGroupTouchedAndDirty(ctrl as FormGroup);
      }
    });
  }

  prevStep() { this.userService.prevStep() }
  nextStep() {
    const group = this.getStepGroup();
    if (group.invalid) {
      this.markGroupTouchedAndDirty(group);
      return; // don't advance
    }
    this.userService.nextStep()
  }

  onSubmit() {
    console.log('Form submitted', this.onboardingForm.value);
  }
}
