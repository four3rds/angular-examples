import { Component, OnInit } from '@angular/core';
import { Facility } from '@app/shared/models/tefa/Facility';
import { FacilityGroupAssociation } from '@app/shared/models/tefa/FacilityGroupAssociation';
import { MenuItemAssociation } from '@app/shared/models/tefa/MenuItemAssociation';
import { ProductAssociation } from '@app/shared/models/tefa/ProductAssociation';
import { TefaService } from '@app/shared/services/tefa/tefa.service';
import { Feature, Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import BaseLayer from 'ol/layer/Base';
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

  private facilityGroupLayers: Map<string, VectorLayer<VectorSource>> = new Map<
    string,
    VectorLayer<VectorSource>
  >();

  facilityGroupNames!: string[];

  map!: OLMap;

  private menuItemAssociations!: Map<string, MenuItemAssociation>;

  private productAssociations!: Map<string, ProductAssociation>;

  constructor(private tefaService: TefaService) {}

  private addPointForMenuItemAssociation(
    features: Array<Feature>,
    menuItemAssociationId: string
  ): void {
    if (
      this.menuItemAssociations &&
      this.menuItemAssociations.get(menuItemAssociationId) &&
      this.menuItemAssociations.get(menuItemAssociationId)!.productAssociationId
    ) {
      this.addPointForProductAssociation(
        features,
        this.menuItemAssociations.get(menuItemAssociationId)!
          .productAssociationId
      );
    } else {
      console.log(
        'Menu Item Association ' + menuItemAssociationId + ' not found'
      );
    }
  }

  private addPointForProductAssociation(
    features: Array<Feature>,
    productAssociationId: string
  ): void {
    if (
      this.productAssociations &&
      this.productAssociations.has(productAssociationId)
    ) {
      this.addPointForFacility(
        features,
        this.productAssociations.get(productAssociationId)!.facilityId
      );
    } else {
      console.log('Product Association ' + productAssociationId + ' not found');
    }
  }

  private addPointForFacility(
    features: Array<Feature>,
    facilityId: string
  ): void {
    if (this.facilities && this.facilities.has(facilityId)) {
      let facility = this.facilities.get(facilityId);
      features.push(
        new Feature({
          facility: this.facilities.get(facilityId),
          geometry: new Point(
            fromLonLat([
              this.dmsToDd(this.facilities.get(facilityId)!.longitudeDms),
              this.dmsToDd(this.facilities.get(facilityId)!.latitudeDms),
            ])
          ),
        })
      );
      console.log(
        'Push::' +
          this.dmsToDd(this.facilities.get(facilityId)!.longitudeDms) +
          '::' +
          this.dmsToDd(this.facilities.get(facilityId)!.latitudeDms)
      );
    } else {
      console.log('Facility ' + facilityId + ' not found');
    }
  }

  private addPointsForFacilityGroupName(
    features: Array<Feature>,
    facilityGroupName: string
  ): void {
    if (this.facilityGroupAssociations) {
      this.facilityGroupAssociations.forEach((value, key, map) => {
        if (value.facilityGroupName == facilityGroupName) {
          this.addPointForMenuItemAssociation(
            features,
            value.menuItemAssociationId
          );
        }
      });
    } else {
      console.log('Facility Group Associations not yet populated');
    }
  }

  private createFacilityGroupLayer(
    facilityGroupName: string
  ): VectorLayer<VectorSource> | null {
    let layer: VectorLayer<VectorSource> | null = null;
    const features: Array<Feature> = [];
    this.addPointsForFacilityGroupName(features, facilityGroupName);
    if (features.length > 0) {
      const source = new VectorSource();
      source.addFeatures(features);
      layer = new VectorLayer({
        source: source,
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
      });
    }
    return layer;
  }

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

  toggleFacilityGroup(facilityGroupName: string): void {
    if (this.map) {
      let layer = this.facilityGroupLayers.get(facilityGroupName);

      if (layer instanceof BaseLayer) {
        if (this.map.removeLayer(layer)) {
          console.log(
            layer.getSource()?.getFeatures().length + ' points removed'
          );
        } else {
          this.map.addLayer(layer);
          console.log(
            layer.getSource()?.getFeatures().length + ' points added'
          );
        }
      } else {
        let layer: VectorLayer<VectorSource> | null =
          this.createFacilityGroupLayer(facilityGroupName);
        if (layer) {
          this.facilityGroupLayers.set(facilityGroupName, layer);
          this.map.addLayer(layer);
          console.log('Layer created');
          console.log(
            layer.getSource()?.getFeatures().length + ' points added'
          );
        } else {
          console.log(
            'Unable to create layer for Facility Group Name ' +
              facilityGroupName
          );
        }
      }
    } else {
      console.log('Map not set');
    }
  }
}
