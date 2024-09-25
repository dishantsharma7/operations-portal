export interface JobFilesInterface {
  id: string; // UUID
  jobDetailsID: string;
  fileName: string;
  fileDescription?: string;
  fileUploadLink: string;
  uploadedBy: string;
  uploadedAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
