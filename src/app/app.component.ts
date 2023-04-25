import { Component, OnInit } from '@angular/core';

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
      description: 'Test description content',
    },
    {
      selector: '#block5',
      title: 'Test Title 5',
      description: 'Test description content',
    },
    {
      selector: '#block2',
      title: 'Test Title 2',
      description: 'Test description content',
    },
    {
      selector: '#block6',
      title: 'Test Title 6',
      description: 'Test description content',
    },
    {
      selector: '#block3',
      title: 'Test Title 3',
      description: 'Test description content',
    },
    {
      selector: '#block7',
      title: 'Test Title 7',
      description: 'Test description content',
    },
    {
      selector: '#block4',
      title: 'Test Title 4',
      description: 'Test description content',
    },
  ];

  ngOnInit(): void {}
}
