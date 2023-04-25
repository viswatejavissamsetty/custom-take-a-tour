import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tourSteps: Array<{
    selector: string;
    title: string;
    description: string;
  }> = [
    {
      selector: '#block1',
      title: 'Test Title 1',
      description: 'Test dsecription content',
    },
    {
      selector: '#block2',
      title: 'Test Title 2',
      description: 'Test dsecription content',
    },
    {
      selector: '#block3',
      title: 'Test Title 3',
      description: 'Test dsecription content',
    },
    {
      selector: '#block4',
      title: 'Test Title 4',
      description: 'Test dsecription content',
    },
    {
      selector: '#block5',
      title: 'Test Title 5',
      description: 'Test dsecription content',
    },
  ];

  ngOnInit(): void {}

  createPoperDom(totalCount: number) {
    $(`
      <div id="tour-poper" class="my-popper popper tour-new-popper">
        <div class="content" id="content"></div>
        <div class="controls">
          <button id="next" class="btn btn-primary">Next</button>
          <button id="next" class="btn btn-primary">Prev</button>
          <button id="next" class="btn btn-primary">End</button>
        </div>
        <div>
          <span id="current-count">0</span> /
          <span id="current-count">${totalCount}</span>
        </div>
      </div>
    `).appendTo('body');
  }
}
