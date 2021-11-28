import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { TicketListComponent } from './ticket-list.component';
import {ticketsRespMock, ticketsMock} from '../testData';
import { DataService } from '../data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

  class DataServiceSpy {
    activeTicket = ticketsMock[0];
    detailedViewActive = new Subject();
    updateActiveTicket(ticket) {this.activeTicket = ticket};
    updateView(view) {this.detailedViewActive.next(view)};
    getData() {return of(JSON.parse(JSON.stringify(ticketsRespMock)))};
    getDataWithPage(page) {return of(JSON.parse(JSON.stringify(ticketsRespMock)))}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TicketListComponent ],
      providers: [{provide: DataService, useClass: DataServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    component.pageSize = 2
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should fetch the ticket details on initialization', () => {
    component.ngOnInit();
    expect(component.ticketsList.length).toBe(4);
    expect(component.ticketsList[0].id).toEqual(ticketsMock[0].id);
  });

  it('Should set the active ticket and update the view to detail view on clicking a ticket', () => {
    component.ngOnInit();
    const dataServiceInstance = TestBed.get(DataService);
    component.ticketClicked(component.ticketsList[1]);
    expect(dataServiceInstance.activeTicket).toEqual(ticketsMock[1]);
  });
  it('Should fetch new tickets if there is an update request', () => {
    component.ngOnInit();
    component.fetchNextPage({pageIndex: 1})
    expect(component.ticketsList.length).toBe(4);
    expect(component.ticketsList[2].id).toEqual(ticketsMock[0].id);
  });

});
