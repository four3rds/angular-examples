import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Classification,
  CONFIDENTIAL,
  SECRET,
  UNCLASSIFIED,
  UNDEFINED,
} from '@app/shared/models/classification';
import { ClassificationRollupService } from '@app/shared/services/classification-rollup/classification-rollup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classification-banner',
  templateUrl: './classification-banner.component.html',
  styleUrls: ['./classification-banner.component.scss'],
})
export class ClassificationBannerComponent implements OnDestroy, OnInit {
  classificationBannerClass: string = 'unclassified-banner';

  classificationBannerText: string = 'UNCLASSIFIED';

  subscription!: Subscription;

  constructor(private rollup: ClassificationRollupService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.rollup
      .getRollup()
      .subscribe((classification: Classification) => {
        this.classificationBannerClass =
          classification.pageMarking.replace(' ', '-').toLocaleLowerCase() +
          '-banner';
        this.classificationBannerText = classification.pageMarking;
      });
  }
}
