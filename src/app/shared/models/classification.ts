export interface Classification {
  cls: number;
  pageMarking: string;
}

export const CONFIDENTIAL: Classification = { cls: 1, pageMarking: "CONFIDENTIAL" };

export const SECRET: Classification = { cls: 2, pageMarking: "SECRET" };

export const TOP_SECRET: Classification = { cls: 3, pageMarking: "TOP SECRET" };

export const UNCLASSIFIED: Classification = { cls: 0, pageMarking: "UNCLASSIFIED" };

export const UNDEFINED: Classification = { cls: -1, pageMarking: "UNCLASSIFIED" };
