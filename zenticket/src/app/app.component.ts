import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  detailsView = false;
  constructor(private dataService: DataService) {
    // Prompts to get the credentials from user
    const email = prompt('enter email');
    const password = prompt('enter password');
    const subdomain = prompt('enter subdomain');

    // Save user credentials in a service file
    this.dataService.getCredentials(email, password, subdomain);
    // Start the application in ListView and track the Current application view.
    this.dataService.detailedViewActive.subscribe(res => this.detailsView = res);
  }
}
