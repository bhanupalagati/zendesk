import { Component, OnInit } from '@angular/core';
import { Ticket } from '../data.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  activeTicket: Ticket;
  headerContent: string;
  constructor(private dataService: DataService) { }

  // On entering detailed view the complete info of the ticket should be displayed.
  ngOnInit(): void {
    this.activeTicket = this.dataService.activeTicket;
    this.headerContent = `Active Ticket Id ${this.activeTicket?.id}`;
  }

  // On clicking back button list view should be displayed
  returnToList(): any {
    this.dataService.activeTicket = undefined;
    this.dataService.detailedViewActive.next(false);
  }
}
