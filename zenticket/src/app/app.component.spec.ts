import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import {ticketsRespMock} from './testData';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const dataServiceSpy = {
    activeTicket: {},
    detailedViewActive: new Subject(),
    updateActiveTicket: (ticket) => dataServiceSpy.activeTicket = ticket,
    updateView: (view) => dataServiceSpy.detailedViewActive.next(view),
    getData: () => of(ticketsRespMock)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: DataService, useValue: dataServiceSpy}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render list view initially', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-ticket-list')).toBeTruthy();
    expect(compiled.querySelector('app-ticket-details')).toBeFalsy();
  });

  it('should render detail view on demand', () => {
    component.detailsView = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-ticket-list')).toBeFalsy();
    expect(compiled.querySelector('app-ticket-details')).toBeTruthy();
  });

  it('Should get the latest view', () => {
    expect(component.detailsView).toBeFalsy();
    TestBed.get(DataService).updateView(true);
    expect(component.detailsView).toBeTruthy();
  });

});
