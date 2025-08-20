
import { Component, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';

@Component({
  selector: 'app-onbaording-form',
  imports: [ReactiveFormsModule],
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
        phone: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', Validators.required],
      }),
      // STEP 2: Company Details
      companayDetails: this.fb.group({
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
        bankName: ['', Validators.required],
      }),
      confirm: this.fb.group({ agree: [false, Validators.requiredTrue] }),
    })
  }

  onSubmit() {
    console.log(this.onboardingForm);
    console.log(this.onboardingForm.value);
  }
}
