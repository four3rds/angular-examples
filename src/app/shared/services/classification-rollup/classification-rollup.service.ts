import { BehaviorSubject, Observable } from 'rxjs';
import { Classification, UNDEFINED } from '@app/shared/models/classification';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassificationRollupService {
  private rollup = new BehaviorSubject<Classification>(UNDEFINED);

  addClassificationToRollup(classification: Classification) {
    if (
      classification.cls == UNDEFINED.cls ||
      this.rollup.getValue().cls < classification.cls
    ) {
      this.rollup.next(classification);
    }
  }

  resetRollup() {
    this.rollup.next(UNDEFINED);
  }

  getRollup(): Observable<Classification> {
    return this.rollup.asObservable();
  }
}
