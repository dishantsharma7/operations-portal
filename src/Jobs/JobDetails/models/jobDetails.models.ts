export interface JobDetailsInterface {
  id: string;
  clientID: string;
  adminID: string;
  salesAdminID: string;
  writerID: string;
  jobTitle: string;
  jobDescription: string;
  jobDeadline: Date;
  finalQuotationID?: string;
  jobAmount: number;
  jobTaxAmount: number;
  jobFinalAmount: number;
  completionDate: Date;
  completionStatus: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
