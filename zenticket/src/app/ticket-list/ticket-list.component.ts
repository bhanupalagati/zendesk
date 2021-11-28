import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from '../data.interface';
import { DataService } from '../data.service';
// import tickets from "../../assets/tickets.json"

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  ticketsList: Ticket[];
  displayedColumns: string[] = ['Id', 'Subject', 'created_at', 'priority'];
  dataSource = new MatTableDataSource([]);
  detailView = false;
  error = false;
  errorMsg = 'There is an issue with the API, please try later or contact the admin team.';

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(res => {
      // If there is an error from the Zendesk API
      if (res.hasOwnProperty('error')) {
        this.error = true;
        this.errorMsg = res.error.hasOwnProperty('message') ? res.error.message : res.error;
      }
      else {
        // Fetching and constructing tickets in list view.
        this.ticketsList = res.tickets;
        this.dataSource = new MatTableDataSource(this.ticketsList);
        this.dataSource.paginator = this.paginator;
      }
    },
    err => {
      // If there is an error from the system backend
      this.error = true;
    });
  }
  // If user clicks on a ticket then detailed view should be shown.
  ticketClicked(ticket): any {
    this.dataService.updateActiveTicket(ticket);
    this.dataService.updateView(true);
  }

}
