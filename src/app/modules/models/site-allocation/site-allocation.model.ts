export class AddSiteAllocation {
    CustomerId: number;
    Id: number;
    SiteId: number;
    ClassificationId: number;
    ServiceId: number;
    NoofManpower: number;
    CreatedBy: string;
}
export class GetSiteAllocation {
    Id: number;
    CustomerId: number;
    CustomerName: string;
    BranchId: number;
    BranchName: string;
    SiteId: number;
    SiteName: number;
    ClassificationId: number;
    ClassificationName: string;
    ServiceId: number;
    Service: string;
    NoofManpower: number;
    CreatedBy: string;
}
export class RemoveSiteAllocation {
    CustomerId: number;
    BranchId: number;
    SiteId: number;
    ClassificationId: number;
    ServiceId: number;
    NoofManpower: number;
    ActionBy: string;
}

export class getCustomer {
    ActionBy: string;
}

export class getAllCustomer {
    CustomerId: number;
    CustomerName: string;
}

export class getBranch {
    CustomerId: number;
    ActionBy: string;
}
export class getSite {
    CustomerId: number;
    BranchId: number;
    ActionBy: string;
}
export class getClassification {
    CustomerId: number;
    BranchId: number;
    SiteId: number;
    ActionBy: string;
}
export class getService {
    CustomerId: number;
    ActionBy: string;
}

export class getAllServiceByCustomer {
    DesignationId: number;
    EmployeeCount: number;
    Service: string;
}
export class getAllClassificationBySite {
    CustomerId: number;
    BranchId: number;
    SiteId: number;
    BranchName: string;
    SiteName: string;
    ClassificationId: number;
    Classification: string;
}

export class getAllSiteByBranch {
    CustomerId: number;
    SiteId: number;
    SiteName: string;
}

export class getAllBranchByCustomer {
    CustomerId: number;
    Id: number;
    Branch: string;
}

export class GetManpowerList {
    CustomerId: number;
    BranchId: number;
    SiteId: number;
    ClassificationId: number;
    ServiceId: number;
    ActionBy: string;
}

export class GetAllManpowerList {
    ManpowerId: number;
    ManpowerName: string;
}