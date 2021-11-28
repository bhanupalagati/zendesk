import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { TicketListComponent } from './ticket-list.component';
import {ticketsRespMock, ticketsMock} from '../testData';
import { DataService } from '../data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  const dataServiceSpy = {
    activeTicket: ticketsMock[0],
    detailedViewActive: new Subject(),
    updateActiveTicket: (ticket) => dataServiceSpy.activeTicket = ticket,
    updateView: (view) => dataServiceSpy.detailedViewActive.next(view),
    getData: () => of(ticketsRespMock)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TicketListComponent ],
      providers: [{provide: DataService, useValue: dataServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should fetch the ticket details on initialization', () => {
    component.ngOnInit();
    expect(component.ticketsList.length).toBe(2);
    expect(component.ticketsList).toEqual(ticketsMock);
  });

  it('Should set the active ticket and update the view to detail view on clicking a ticket', () => {
    const dataServiceInstance = TestBed.get(DataService);
    const dataServicesViewSpy = spyOn(dataServiceInstance.detailedViewActive, 'next');
    component.ticketClicked(component.ticketsList[1]);
    expect(dataServiceInstance.activeTicket).toEqual(ticketsMock[1]);
    expect(dataServicesViewSpy).toHaveBeenCalledWith(true);
  });
});
