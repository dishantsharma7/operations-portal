export interface JobCommunicationsInterface {
  id: string;
  jobDetailsID: string;
  communicationSender: string;
  communicationMessage: string;
  anonymityStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
