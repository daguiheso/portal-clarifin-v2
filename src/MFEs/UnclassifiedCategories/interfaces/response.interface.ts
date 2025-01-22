export interface TemplateCategory {
	id: string
	name: string
	industry: string
	idBusiness: string
	nameBusiness: string
}

export interface Key {
	id: string
  name: string
  idCompany: any
  idBusinessUnit: any
  externalHostId: any
  businessUnitName: any
}

export interface AccountingResp {
  numberOfColumns: number
  columnsName: string[]
  numberOfRecords: number
  presignedUrl: any
  accounting: Accounting[]
}

export interface Accounting {
  code: string
  description: string
  transactional: string
  category?: string
	[key: string]: any,
	level: any
}

