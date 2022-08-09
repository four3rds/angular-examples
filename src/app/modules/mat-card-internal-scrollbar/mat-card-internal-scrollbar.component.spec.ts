import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardInternalScrollbarComponent } from './mat-card-internal-scrollbar.component';

describe('MatCardInternalScrollbarComponent', () => {
  let component: MatCardInternalScrollbarComponent;
  let fixture: ComponentFixture<MatCardInternalScrollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCardInternalScrollbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatCardInternalScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
