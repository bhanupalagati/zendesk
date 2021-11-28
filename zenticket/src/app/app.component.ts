import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  detailsView = false;
  testInput = false;
  
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    // Prompts to get the credentials from user
    let email, password, subdomain: string;
    email = prompt('enter email');
    password = prompt('enter password');
    subdomain = prompt('enter subdomain');

    // Save user credentials in a service file
    this.dataService.getCredentials(email, password, subdomain);
    // Start the application in ListView and track the Current application view.
    this.dataService.detailedViewActive.subscribe(res => this.detailsView = res);
  }

  gather
}
