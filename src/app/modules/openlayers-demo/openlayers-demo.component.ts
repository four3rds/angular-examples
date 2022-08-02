import { Component, OnInit } from '@angular/core';
import { Facility } from '@app/shared/models/tefa/Facility';
import { FacilityGroupAssociation } from '@app/shared/models/tefa/FacilityGroupAssociation';
import { MenuItemAssociation } from '@app/shared/models/tefa/MenuItemAssociation';
import { ProductAssociation } from '@app/shared/models/tefa/ProductAssociation';
import { TefaService } from '@app/shared/services/tefa/tefa.service';
import { Feature, Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

@Component({
  selector: 'app-openlayers-demo',
  templateUrl: './openlayers-demo.component.html',
  styleUrls: ['./openlayers-demo.component.scss'],
})
export class OpenlayersDemoComponent implements OnInit {
  readonly EGLIN: Coordinate = fromLonLat([-86.36, 30.49]);
  readonly ROBINS: Coordinate = fromLonLat([-83.42, 32.62]);
  readonly WPAFB: Coordinate = fromLonLat([-83.94, 39.81]);

  center: Coordinate = this.WPAFB;

  private facilities!: Map<string, Facility>;

  private facilityGroupAssociations!: Map<string, FacilityGroupAssociation>;

  facilityGroupNames!: string[];

  private facilityGroupMembershipCounts = new Map<string, number>();

  map!: OLMap;

  private menuItemAssociations!: Map<string, MenuItemAssociation>;

  readonly plottedFacilityGroups = new Set<string>;

  private productAssociations!: Map<string, ProductAssociation>;

  readonly source = new VectorSource();

  constructor(private tefaService: TefaService) { }

  private dmsToDd(dms: string): number {
    let dd = 0;
    if (dms) {
      if (
        dms.length == 10 &&
        (dms.substring(9) == 'N' || dms.substring(9) == 'S')
      ) {
        dd =
          +dms.substring(0, 2) +
          +dms.substring(2, 4) / 60 +
          +dms.substring(4, 9) / 1000 / 3600;

        if (dms.substring(9) == 'S') {
          dd = dd * -1;
        }
      } else if (
        dms &&
        dms.length == 11 &&
        (dms.substring(10) == 'E' || dms.substring(10) == 'W')
      ) {
        dd =
          +dms.substring(0, 3) +
          +dms.substring(3, 5) / 60 +
          +dms.substring(5, 10) / 1000 / 3600;

        if (dms.substring(10) == 'W') {
          dd = dd * -1;
        }
      }
    }

    return dd;
  }

  ngOnInit(): void {
    this.tefaService
      .getFacilities()
      .subscribe((facilities) =>
        this.storeFacilities(
          new Map<string, Facility>(Object.entries(facilities))
        )
      );

    this.tefaService
      .getFacilityGroupAssociations()
      .subscribe((facilityGroupAssociations) =>
        this.storeFacilityGroupAssociations(
          new Map<string, FacilityGroupAssociation>(
            Object.entries(facilityGroupAssociations)
          )
        )
      );

    this.tefaService
      .getMenuItemAssociations()
      .subscribe(
        (menuItemAssociations) =>
          (this.menuItemAssociations = new Map<string, MenuItemAssociation>(
            Object.entries(menuItemAssociations)
          ))
      );

    this.tefaService
      .getProductAssociations()
      .subscribe(
        (productAssociations) =>
          (this.productAssociations = new Map<string, ProductAssociation>(
            Object.entries(productAssociations)
          ))
      );
  }

  onMapReady(map: OLMap) {
    this.map = map;    
    this.map.addLayer(new VectorLayer({
      source: this.source,
      style: new Style({
        image: new Circle({
          radius: 6,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
      }),
    }));
  }

  setCenter(coordinate: Coordinate) {
    if (this.map) {
      this.map.getView().setCenter(coordinate);
    }
  }

  private storeFacilities(facilities: Map<string, Facility>): void {
    this.facilities = facilities;
  }

  private storeFacilityGroupAssociations(
    facilityGroupAssociations: Map<string, FacilityGroupAssociation>
  ): void {
    this.facilityGroupAssociations = facilityGroupAssociations;

    let set: Set<string> = new Set<string>();

    this.facilityGroupAssociations.forEach((value, key, map) =>
      set.add(value.facilityGroupName)
    );

    this.facilityGroupNames = Array.from(set).sort((a, b) =>
      a.toUpperCase() < b.toUpperCase()
        ? -1
        : a.toUpperCase() > b.toUpperCase()
        ? 1
        : 0
    );
  }

  private toggleFacility(facilityId: string, add: boolean): void {
    let facilityGroupMembershipCount: number = 1;
    if (add) {
      if (!this.facilityGroupMembershipCounts.has(facilityId)) {
        let feature: Feature = new Feature({
          geometry: new Point(
            fromLonLat([
              this.dmsToDd(this.facilities.get(facilityId)!.longitudeDms),
              this.dmsToDd(this.facilities.get(facilityId)!.latitudeDms),
            ])
          ),
        });
        feature.setId(facilityId);
        this.source.addFeature(feature);
        console.log('Facility ' + facilityId + ' added to map');
        console.log("this.source.getFeatures().length=" + this.source.getFeatures().length);
      } else {
        facilityGroupMembershipCount = this.facilityGroupMembershipCounts.get(facilityId)! + 1;
      }
    } else {
      facilityGroupMembershipCount = this.facilityGroupMembershipCounts.get(facilityId)! - 1;
    }
    if (facilityGroupMembershipCount != 0) {
      this.facilityGroupMembershipCounts.set(facilityId, facilityGroupMembershipCount);
    } else {
      this.source.removeFeature(this.source.getFeatureById(facilityId)!);
      this.facilityGroupMembershipCounts.delete(facilityId);
      console.log('Facility ' + facilityId + ' removed from map');
      console.log("this.source.getFeatures().length=" + this.source.getFeatures().length);
    }
  }

  toggleFacilityGroup(facilityGroupName: string) {
    if (this.facilityGroupAssociations) {
      const add = !this.plottedFacilityGroups.has(facilityGroupName);
      const toggledFacilityIDs = new Set<string>();
      this.facilityGroupAssociations.forEach((value, key, map) => {
        if (value.facilityGroupName == facilityGroupName) {
          this.toggleMenuItemAssociation(value.menuItemAssociationId, add, toggledFacilityIDs);
        }
      });
      if (add) {
        this.plottedFacilityGroups.add(facilityGroupName);
        console.log('Facility Group ' + facilityGroupName + ' added');
      } else {
        this.plottedFacilityGroups.delete(facilityGroupName);
        console.log('Facility Group ' + facilityGroupName + ' removed');
      }
    } else {
      console.log('Facility Group Associations not yet populated');
    }
  } 

  private toggleMenuItemAssociation(menuItemAssociationId: string, add: boolean, toggledFacilityIDs: Set<string>): void {
    if (
      this.menuItemAssociations &&
      this.menuItemAssociations.get(menuItemAssociationId) &&
      this.menuItemAssociations.get(menuItemAssociationId)!.productAssociationId
    ) {
      this.toggleProductAssociation(this.menuItemAssociations.get(menuItemAssociationId)!.productAssociationId, add, toggledFacilityIDs);
    } else {
      console.log(
        'Menu Item Association ' + menuItemAssociationId + ' not found or has no Product Association ID'
      );
    }
  }

  private toggleProductAssociation(productAssociationId: string, add: boolean, toggledFacilityIDs: Set<string>): void {
    if (
      this.productAssociations &&
      this.productAssociations.has(productAssociationId) && 
      this.productAssociations.get(productAssociationId)!.facilityId) {
      if (!toggledFacilityIDs.has(this.productAssociations.get(productAssociationId)!.facilityId)) {
        this.toggleFacility(this.productAssociations.get(productAssociationId)!.facilityId, add);
        toggledFacilityIDs.add(this.productAssociations.get(productAssociationId)!.facilityId);
      } else {
        console.log('Skipping Facility ' + this.productAssociations.get(productAssociationId)!.facilityId + ' -- already toggled');
      }
    } else {
      console.log('Product Association ' + productAssociationId + ' not found or has no Facility ID');
    }
  }

}
