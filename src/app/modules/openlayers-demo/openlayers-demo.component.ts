import { Component, OnInit } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import { Map } from 'ol';

@Component({
  selector: 'app-openlayers-demo',
  templateUrl: './openlayers-demo.component.html',
  styleUrls: ['./openlayers-demo.component.scss']
})
export class OpenlayersDemoComponent {

  readonly EGLIN: Coordinate = fromLonLat([-86.36, 30.49])
  readonly ROBINS: Coordinate = fromLonLat([-83.42, 32.62]);
  readonly WPAFB: Coordinate = fromLonLat([-83.94, 39.81]);

  center: Coordinate = this.WPAFB;

  map!: Map;

  constructor() { }

  onMapReady(map: Map) {
    this.map = map;
  }

  setCenter(coordinate: Coordinate) {
    if (this.map) {
      this.map.getView().setCenter(coordinate);
    }
  }

}
