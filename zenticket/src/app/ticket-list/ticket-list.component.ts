import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from '../data.interface';
import { DataService } from '../data.service';

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
  currentPage = 1
  pageSize = 25
  maxPageReached = 1
  loading = true
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
        // Faking the tickets counts so that paginator works
        this.ticketsList.length = res.count
        this.dataSource = new MatTableDataSource(this.ticketsList);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }
    },
      err => {
        // If there is an error from the system backend
        this.error = true;
      });
  }

  // This method is for getting new tickets data
  fetchNextPage(event): void {
    if (event.pageIndex == this.maxPageReached) {
      this.loading = true;
      this.maxPageReached += 1;
      this.dataService.getDataWithPage(this.maxPageReached).subscribe(res => {
        this.loading = false;
        this.ticketsList.length = this.currentPage * this.pageSize
        this.currentPage += 1
        this.ticketsList.push(...res.tickets)
        
        this.ticketsList.length = res.count
        this.dataSource = new MatTableDataSource(this.ticketsList);
        this.dataSource._updateChangeSubscription()
        this.dataSource.paginator = this.paginator
      })
    }
  }

  // If user clicks on a ticket then detailed view should be shown.
  ticketClicked(ticket): any {
    this.dataService.updateActiveTicket(ticket);
    this.dataService.updateView(true);
  }

}
