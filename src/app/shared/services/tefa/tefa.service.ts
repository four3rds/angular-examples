import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facility } from '@app/shared/models/tefa/Facility';
import { MenuItemAssociation } from '@app/shared/models/tefa/MenuItemAssociation';
import { ProductAssociation } from '@app/shared/models/tefa/ProductAssociation';
import { FacilityGroupAssociation } from '@app/shared/models/tefa/FacilityGroupAssociation';

const URL_FACILITIES = 'assets/json/tefa/facilities.json';

const URL_FACILITY_GROUP_ASSOCIATIONS = 'assets/json/tefa/facilityGroupAssociations.json';

const URL_MENU_ITEM_ASSOCIATIONS = 'assets/json/tefa/menuItemAssociations.json';

const URL_PRODUCT_ASSOCIATIONS = 'assets/json/tefa/productAssociations.json';

@Injectable({
  providedIn: 'root'
})

export class TefaService {

  constructor(private http: HttpClient) { }

  getFacilities(): Observable<Map<string, Facility>> {

    return this.http.get<Map<string, Facility>>(URL_FACILITIES);

  }

  getFacilityGroupAssociations(): Observable<Map<string, FacilityGroupAssociation>> {

    return this.http.get<Map<string, FacilityGroupAssociation>>(URL_FACILITY_GROUP_ASSOCIATIONS);

  }

  getMenuItemAssociations(): Observable<Map<string, MenuItemAssociation>> {

    return this.http.get<Map<string, MenuItemAssociation>>(URL_MENU_ITEM_ASSOCIATIONS);

  }

  getProductAssociations(): Observable<Map<string, ProductAssociation>> {

    return this.http.get<Map<string, ProductAssociation>>(URL_PRODUCT_ASSOCIATIONS);

  }

}
