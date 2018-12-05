import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-main.col',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public statistics: any = null;

  barChart: any[] = [
    {
      'name': '24.11.2018',
      'value': 156,
    },
    {
      'name': '25.11.2018',
      'value': 120,
    },
    {
      'name': '26.11.2018',
      'value': 143,
    },
  ];

  lineChart = [
    {
      'name': 'Просмотренно резюме',
      'series': [
        {
          'name': '20.11.2018',
          'value': 134,
        },
        {
          'name': '21.11.2018',
          'value': 156,
        },
        {
          'name': '22.11.2018',
          'value': 167,
        },
        {
          'name': '23.11.2018',
          'value': 136,
        },
        {
          'name': '24.11.2018',
          'value': 128,
        },
        {
          'name': '25.11.2018',
          'value': 345,
        },
        {
          'name': '26.11.2018',
          'value': 104,
        }
      ],
    },

    {
      'name': 'Купленно данных резюме',
      'series': [
        {
          'name': '20.11.2018',
          'value': 40,
        },
        {
          'name': '21.11.2018',
          'value': 33,
        },
        {
          'name': '22.11.2018',
          'value': 15,
        },
        {
          'name': '23.11.2018',
          'value': 57,
        },
        {
          'name': '24.11.2018',
          'value': 79,
        },
        {
          'name': '25.11.2018',
          'value': 43,
        },
        {
          'name': '26.11.2018',
          'value': 56,
        }
      ],
    },
  ];

  pieChart = [
    {
      'name': 'Работодатель',
      'value': 11
    },
    {
      'name': 'Все',
      'value': 345
    },
  ];

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get('/api/v1/admin/statistics')
      .subscribe((res) => {
        this.statistics = res['statistics'];
      });
  }

}
