import { Component } from '@angular/core';
import { Classification, CONFIDENTIAL, SECRET, TOP_SECRET, UNCLASSIFIED, UNDEFINED } from '@app/shared/models/classification';
import { ClassificationRollupService } from '@app/shared/services/classification-rollup/classification-rollup.service';

@Component({
  selector: 'app-classification-rollup-demo',
  templateUrl: './classification-rollup-demo.component.html',
  styleUrls: ['./classification-rollup-demo.component.scss'],
})
export class ClassificationRollupDemoComponent {

  CONFIDENTIAL: Classification = CONFIDENTIAL;

  SECRET: Classification = SECRET;

  TOP_SECRET: Classification = TOP_SECRET;

  UNCLASSIFIED: Classification = UNCLASSIFIED;

  UNDEFINED: Classification = UNDEFINED;

  constructor(private rollup: ClassificationRollupService) {}

  addClassificationToRollup(classification: Classification): void {
    this.rollup.addClassificationToRollup(classification);
  }
}
