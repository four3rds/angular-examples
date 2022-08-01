import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlayersDemoComponent } from './openlayers-demo.component';

describe('OpenlayersDemoComponent', () => {
  let component: OpenlayersDemoComponent;
  let fixture: ComponentFixture<OpenlayersDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenlayersDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenlayersDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
