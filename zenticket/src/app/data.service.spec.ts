import { TestBed, tick } from '@angular/core/testing';
import {ticketsRespMock, ticketsMock} from './testData';
import { DataService } from './data.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  const httpSpy = {
    post: (prop1, prop2) => of(ticketsRespMock)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpSpy}]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get credentials from the user', () => {
    service.getCredentials('test.email.com', 'test', 'test');
    expect(service.email).toEqual('test.email.com');
  });

  it('Should emit a value on view update', () => {
    const serviceSpy = spyOn(service.detailedViewActive, 'next');
    service.updateView(true);
    expect(serviceSpy).toHaveBeenCalledWith(true);
  });

  it('Should update the active ticket', () => {
    expect(service.activeTicket).toBeFalsy();
    service.updateActiveTicket(ticketsMock[0]);
    expect(service.activeTicket).toEqual(ticketsMock[0]);
  });

  it('should return ticket response on get Data call', () => {
    service.getData().subscribe(res => expect(res).toEqual(ticketsRespMock));
  });

});
