export interface Process {
  idProcess:     string
  idClient:      string
  createAt:      Date
  status:        Status
  updatedAt:     Date
  idCompany:     string
  companyName:   string
  idFormat:      string
  formatName:    null
  dateProcess:   Date
  businessUnits: BusinessUnit[]
  errors:        null | string
}

export interface BusinessUnit {
  id:             string
  name:           string
  externalHostId: string
  description:    string
}

export enum Status {
  Error = "ERROR",
  Initial = "INITIAL",
  Success = "SUCCESS",
}

export interface ProcessStatus {
  idProcess:        string;
  status:           string;
  rows:             null;
  errorDescription: string;
  errors:           any[];
}

