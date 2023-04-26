import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss'],
})
export class TourStepComponent implements OnInit, OnDestroy, AfterViewInit {
  description = '';
  currentStepNumber = 0;
  totalSteps = 0;
  transform = 'translate(0, 0)';

  @Input('show') show = false;
  @Output() onEnd = new EventEmitter();

  @ViewChild('tourElement') tourbox!: HTMLDivElement;

  @Input('steps') steps: Array<{
    selector: string;
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

  ngAfterViewInit(): void {
    $(`.tour-popper`).addClass('top');
  }

  next() {
    this.clearTourHeilighting();

    this.currentStepNumber = this.currentStepNumber + 1;
    const currentStep = this.steps[this.currentStepNumber - 1];

    const element = $(currentStep.selector);

    element
      .addClass('tour-highlight')[0]
      .scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });

    this.description = currentStep.description;

    const parameters = this.getparameters(element);

    $(`.tour-popper`).removeClass('top bottom left right');
    $(`.tour-popper`).addClass(parameters.lightBox.add);

    this.transform = `translate(${parameters.element.left}, ${parameters.element.top})`;
  }

  prev() {
    this.clearTourHeilighting();

    this.currentStepNumber = this.currentStepNumber - 1;
    const currentStep = this.steps[this.currentStepNumber - 1];

    const element = $(currentStep.selector);

    element
      .addClass('tour-highlight')[0]
      .scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.description = currentStep.description;

    const parameters = this.getparameters(element);

    $(`.tour-popper`).removeClass('top bottom left right');
    $(`.tour-popper`).addClass(parameters.lightBox.add);

    this.transform = `translate(${parameters.element.left}, ${parameters.element.top})`;
  }

  end() {
    this.clearTourHeilighting();
    this.deactivateTour();
    this.show = false;
    this.onEnd.emit();
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

  getparameters(element: JQuery<HTMLElement>) {
    const isBottom =
      element[0].clientHeight + element.position().top >=
      $('body')[0].offsetHeight;

    const left =
      element[0].offsetLeft + ((element.innerWidth() || 0) - 300) / 2;
    const top = isBottom
      ? element.position().top - element[0].offsetHeight + 10
      : element.position().top + element[0].clientHeight;

    return {
      element: {
        left: `${left}px`,
        top: `${top}px`,
      },
      lightBox: { add: isBottom ? 'bottom' : 'top' },
    };
  }

  ngOnDestroy(): void {
    this.deactivateTour();
  }
}
