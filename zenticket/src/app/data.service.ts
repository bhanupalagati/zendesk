import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Ticket, TicketResp} from './data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  detailedViewActive: Subject<boolean> = new Subject();
  activeTicket: Ticket;
  email = '';
  password = '';
  subdomain = '';
  url = `http://127.0.0.1:7999/`;
  constructor(private httpClient: HttpClient) {}

  getCredentials(email, password, subdomain): any {
    this.email = email;
    this.password = password;
    this.subdomain = subdomain;
  }

  updateView(detailView: boolean): any {
    this.detailedViewActive.next(detailView);
  }

  updateActiveTicket(ticket: Ticket): any {
    this.activeTicket = ticket;
  }

  getData(): any {
    return this.httpClient.post<TicketResp>(this.url, {email: this.email, password: this.password, subdomain: this.subdomain});
  }

  getDataWithPage(page): any {
    return this.httpClient.post<TicketResp>(this.url+"page", {email: this.email, password: this.password, subdomain: this.subdomain, page});

  }

}
