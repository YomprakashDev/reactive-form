import { Component, inject, signal } from '@angular/core';

import { Steps } from "./components/steps/steps";
import { NgClass } from '@angular/common';
import { OnbaordingForm } from "./components/onbaording-form/onbaording-form";
import { User } from './services/user';

@Component({
  selector: 'app-root',
  imports: [Steps, NgClass, OnbaordingForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('reactive-form');

  userService = inject(User)

  currentStep = this.userService.currentStep

  prevStep() { this.userService.prevStep() }
  nextStep() { this.userService.nextStep() }
}
