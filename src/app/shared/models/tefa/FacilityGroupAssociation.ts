/**
 * ---------------------------------------------------------------------------------
 * Classification:      UNCLASSIFIED
 * ---------------------------------------------------------------------------------
 * File: FacilityGroupAssociation.ts
 * Project: DIODE
 * Author: Jason W. Ramsey
 * File Created: Monday, 1st August 2022 7:59:16 am
 * ---------------------------------------------------------------------------------
 * Copyright © 2022, Northrop Grumman Systems Corporation.  All rights reserved.
 * ---------------------------------------------------------------------------------
 */

export class FacilityGroupAssociation {
  constructor(
    public id: string,
    public facilityGroupIdentifier: string,
    public facilityGroupName: string,
    public menuItemAssociationId: string
  ) {}
}
