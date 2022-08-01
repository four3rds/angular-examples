import { Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { View, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls, MousePosition } from 'ol/control';
import proj4 from 'proj4';
import Projection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';
import { get as GetProjection } from 'ol/proj'
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';

@Component({
  selector: 'app-openlayers',
  templateUrl: './openlayers.component.html',
  styleUrls: ['./openlayers.component.scss']
})
export class OpenlayersComponent implements AfterViewInit {

  @Input() center!: Coordinate;

  @Input() zoom!: number;

  @Output() mapReady = new EventEmitter<Map>();

  map!: Map;

  view!: View;
  projection!: Projection | null
  extent: Extent = [-20026376.39, -20048966.10, 20026376.39, 20048966.10];

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) { }

  private initMap(): void {
    proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
    register(proj4)
    this.projection = GetProjection('EPSG:3857');
    if (this.projection != null) {
      this.projection.setExtent(this.extent);
      this.view = new View({
        center: this.center,
        zoom: this.zoom,
        projection: this.projection,
      });
      this.map = new Map({
        layers: [new TileLayer({
          source: new OSM({})
        })],
        target: 'map',
        view: this.view,
        controls: DefaultControls().extend([
          new ScaleLine({}),
        ]),
      });
      this.map.addControl(new MousePosition());
    }
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

}
