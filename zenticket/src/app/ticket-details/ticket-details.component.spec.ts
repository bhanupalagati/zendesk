import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { TicketDetailsComponent } from './ticket-details.component';
import {ticketsMock, ticketsRespMock} from '../testData';
import { DataService } from '../data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let service: DataService;

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
      declarations: [ TicketDetailsComponent ],
      providers: [{provide: DataService, useClass: DataServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    service.updateActiveTicket(ticketsRespMock.tickets[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should fetch the active ticket from the data service', () => {
    service.updateActiveTicket(ticketsRespMock.tickets[0]);
    component.ngOnInit();
    expect(component.activeTicket).toEqual(ticketsRespMock.tickets[0]);
  });

  it('Should set the header appropriately ', () => {
    service.updateActiveTicket(ticketsRespMock.tickets[0]);
    component.ngOnInit();
    expect(component.headerContent).toEqual('Active Ticket Id 10');
  });

  it('Should update the detailedView to List view on clicking return to List', () => {
    service.updateActiveTicket(ticketsRespMock.tickets[0]);
    const dataServicesViewSpy = spyOn(TestBed.get(DataService).detailedViewActive, 'next');
    component.returnToList();
    expect(dataServicesViewSpy).toHaveBeenCalledWith(false);
  });
});
