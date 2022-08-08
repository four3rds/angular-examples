import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePanelResizableComponent } from './three-panel-resizable.component';

describe('ThreePanelResizableComponent', () => {
  let component: ThreePanelResizableComponent;
  let fixture: ComponentFixture<ThreePanelResizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreePanelResizableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreePanelResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
