import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketDatailPage } from './ticket-datail.page';

describe('TicketDatailPage', () => {
  let component: TicketDatailPage;
  let fixture: ComponentFixture<TicketDatailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDatailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDatailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
