export class AssignManpower {
    ContractId: number;
    Customer: any = {};
    BranchId: number;
    SiteId: number;
    ClassificationId: number;
    ServiceId: number;
    CreatedBy: string
}
export class GetAssignManpower {
    AllocationId: number;
    ContractId: number;
    CustomerId: number;
    BranchId: number;
    SiteId: number;
    ClassificationId: number;
    ServiceId: number;
    NoofManpower: number;
    CustomerName: string;
    BranchName: string;
    SiteName: string;
    ClassificationName: string;
    ServiceName: string;
    ManPowerId: number;
    ManPowerName: string;
}