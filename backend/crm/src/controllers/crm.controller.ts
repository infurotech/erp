import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Contact } from "../entities/contact.entity";
import { Address } from "../entities/address.entity";
import { Company } from "../entities/company.entity";
import { ContactCompany } from "../entities/contact-company.entity";
import { Tag } from "../entities/tag.entity";
import { ContactTag } from "../entities/contact-tag.entity";
import { Note } from "../entities/note.entity";

import { ContactService, AddressService,
    CompanyService, ContactCompanyService, TagService, ContactTagService, 
    NoteService, 
    LeadService
} from "../services/crm.service";
import { Lead } from "src/entities/lead.entity";

// Contact Controller
@Crud({ model: { type: Contact } })
@Controller("contacts")
export class ContactController {
    constructor(private readonly service: ContactService) {}
}

// Address Controller
@Crud({ model: { type: Address } })
@Controller("addresses")
export class AddressController {
    constructor(private readonly service: AddressService) {}
}

// Company Controller
@Crud({ model: { type: Company } })
@Controller("companies")
export class CompanyController {
    constructor(private readonly service: CompanyService) {}
}

// ContactCompany Controller
@Crud({ model: { type: ContactCompany } })
@Controller("contact-companies")
export class ContactCompanyController {
    constructor(private readonly service: ContactCompanyService) {}
}

// Tag Controller
@Crud({ model: { type: Tag } })
@Controller("tags")
export class TagController {
    constructor(private readonly service: TagService) {}
}

// ContactTag Controller
@Crud({ model: { type: ContactTag } })
@Controller("contact-tags")
export class ContactTagController {
    constructor(private readonly service: ContactTagService) {}
}

// Note Controller
@Crud({ model: { type: Note } })
@Controller("notes")
export class NoteController {
    constructor(private readonly service: NoteService) {}
}


@Crud({ model: { type: Lead } })
@Controller("leads")
export class LeadController {
    constructor(private readonly service: LeadService) {}
}