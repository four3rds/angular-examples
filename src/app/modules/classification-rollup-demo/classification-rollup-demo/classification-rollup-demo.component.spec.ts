import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationRollupDemoComponent } from './classification-rollup-demo.component';

describe('ClassificationRollupDemoComponent', () => {
  let component: ClassificationRollupDemoComponent;
  let fixture: ComponentFixture<ClassificationRollupDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationRollupDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationRollupDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
