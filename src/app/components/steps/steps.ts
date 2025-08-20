import { NgClass } from '@angular/common';
import { Component, inject, } from '@angular/core';
import { User } from '../../services/user';

@Component({
  selector: 'app-steps',
  imports: [NgClass],
  templateUrl: './steps.html',
  styleUrl: './steps.scss'
})
export class Steps {
  userService = inject(User)

  currentStep = this.userService.currentStep
  steps = [
    'Personal details',
    'Company details',
    'Store details',
    'Link bank account',
    'Preview and confirm',
  ];

  isCompleted(i: number) { return this.currentStep() > i + 1; }
  isActive(i: number) { return this.currentStep() === i + 1; }

}
