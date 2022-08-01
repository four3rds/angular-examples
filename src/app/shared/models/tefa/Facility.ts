/**
 * ---------------------------------------------------------------------------------
 * Classification:      UNCLASSIFIED
 * ---------------------------------------------------------------------------------
 * File: Facility.ts 
 * Project: DIODE
 * Author: Jason W. Ramsey
 * File Created: Monday, 1st August 2022 8:04:26 am
 * ---------------------------------------------------------------------------------
 * Copyright © 2022, Northrop Grumman Systems Corporation.  All rights reserved.
 * ---------------------------------------------------------------------------------
 */


export class Facility {

    constructor(public id: string,
        public aboveMeanSeaLevel: string,
        public address: string,
        public beNumber: string,
        public categoryCode: string,
        public countryCode: string,
        public facilityName: string,
        public latitudeDms: string,
        public longitudeDms: string,
        public midbAssignedIndicator: string,
        public midbFacilitySurrogateKey: string,
        public oSuffix: string,
        public operationalStatus: string,
        public politicalSubdivision: string,
        public technicalSupport: string,
        public systemId: string) { }

}