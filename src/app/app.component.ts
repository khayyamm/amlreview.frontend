import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'amlreview-frontend';
  companySchedule : any;

  private API_SERVER = "http://localhost:59757/api/Company";

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.http.get<CompanySchedule>(this.API_SERVER +'/GetCompanySchedule/0c92a255-77f2-4490-89f7-259385f7a6b0/DK/0').subscribe(data => {
      this.companySchedule = data;
      },
      error => {
        console.log(error);
      });
  }

  isActiveDate(date:string) : string {        
    const notificationDate = moment(date, 'DD-MM-YYYY');
    const today = moment(new Date(), 'DD-MM-YYYY');

    return notificationDate < today? 'active' : '';
  } 
}

interface CompanySchedule{
  companyId:string;
  notifications: string[];
}
