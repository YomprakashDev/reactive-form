import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  currentStep = signal<number>(1);

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(current => current - 1)
    }

  }

  nextStep() {
    this.currentStep.update(current => current + 1)
  }
  
}
