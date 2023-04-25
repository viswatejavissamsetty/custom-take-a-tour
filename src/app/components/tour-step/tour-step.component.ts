import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss'],
})
export class TourStepComponent implements OnInit, OnDestroy {
  title = '';
  description = '';
  currentStepNumber = 0;
  totalSteps = 0;
  transform = 'translate(0, 0)';

  @ViewChild('tourElement') tourbox!: HTMLDivElement;

  @Input('steps') steps: Array<{
    selector: string;
    title: string;
    description: string;
  }> = [];

  ngOnInit(): void {
    this.totalSteps = this.steps
      .map((step) => document.querySelector(step.selector))
      .filter((step) => step).length;

    this.steps.map((step) => $(step.selector).css({ position: 'relative' }));

    this.activateTour();

    this.next();
  }

  next() {
    this.clearTourHeilighting();

    this.currentStepNumber = this.currentStepNumber + 1;
    const currentStep = this.steps[this.currentStepNumber - 1];

    const element = $(currentStep.selector);

    element
      .addClass('tour-highlight')[0]
      .scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });

    this.title = currentStep.title;
    this.description = currentStep.description;

    this.transform = `translate(${((element.innerWidth() || 0) - 300) / 2}px,
    ${element.position().top + element[0].clientHeight}px
    )`;
  }

  prev() {
    this.clearTourHeilighting();

    this.currentStepNumber = this.currentStepNumber - 1;
    const currentStep = this.steps[this.currentStepNumber - 1];

    const element = $(currentStep.selector);

    element
      .addClass('tour-highlight')[0]
      .scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.title = currentStep.title;
    this.description = currentStep.description;

    this.transform = `translate3d(${((element.innerWidth() || 0) - 300) / 2}px,
    ${element.position().top + element[0].clientHeight}px,
    0px
    )`;
  }

  end() {
    this.clearTourHeilighting();
    this.deactivateTour();
    this.totalSteps = 0;
  }

  clearTourHeilighting() {
    this.steps.map((step) => {
      $(step.selector).removeClass('tour-highlight');
    });
  }

  activateTour() {
    $('<div />')
      .appendTo('body')
      .attr('id', 'tour-click-blocker')
      .attr('class', 'tour-click-blocker');

    $('body').addClass('tour-active');

    $(`<div id="tour-fade" class="tour-fade"></div>`).appendTo('body');
  }

  deactivateTour() {
    $('#tour-click-blocker').remove();
    $('#tour-fade').remove();
    $('body').removeClass('tour-active');
  }

  ngOnDestroy(): void {
    this.deactivateTour();
  }
}
