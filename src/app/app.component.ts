import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tourSteps: Array<{
    selector: string;
    description: string;
  }> = [
    {
      selector: '#block1',
      description: 'Test description content',
    },
    {
      selector: '#block7',
      description: 'Test description content',
    },
    {
      selector: '#block5',
      description: 'Test description content',
    },
    {
      selector: '#block2',
      description: 'Test description content',
    },
    {
      selector: '#block3',
      description: 'Test description content',
    },
    {
      selector: '#block6',
      description: 'Test description content',
    },
    {
      selector: '#block4',
      description: 'Test description content',
    },
  ];

  ngOnInit(): void {}

  eventEnd(e: any) {
    console.log('Event ended');
  }
}
