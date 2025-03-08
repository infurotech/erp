import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    ContactService, AddressService,
    CompanyService, ContactCompanyService, TagService, ContactTagService,
    NoteService,
    LeadService
} from "./services/crm.service";
import { Contact } from "./entities/contact.entity";
import { Address } from "./entities/address.entity";
import { Company } from "./entities/company.entity";
import { ContactCompany } from "./entities/contact-company.entity";
import { Tag } from "./entities/tag.entity";
import { ContactTag } from "./entities/contact-tag.entity";
import { Note } from "./entities/note.entity";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "@infuro/shared";
import { DataSource } from "typeorm";
import { AddressController, CompanyController, ContactCompanyController, ContactController, ContactTagController, LeadController, NoteController, TagController } from "./controllers/crm.controller";
import { Lead } from "./entities/lead.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Contact, Address,
            Company, ContactCompany, Tag, ContactTag, Note, Lead
        ])
    ],
    providers: [
        {
            provide: DatabaseService,
            useFactory: (dataSource: DataSource) => new DatabaseService(dataSource),
            inject: [DataSource],
          },
        JwtService, ContactService, AddressService,
        CompanyService, ContactCompanyService, TagService, ContactTagService,
        NoteService, LeadService
    ],
    exports: [
        DatabaseService,
        ContactService, AddressService,
        CompanyService, ContactCompanyService, TagService, ContactTagService,
        NoteService, LeadService
    ],
    controllers: [ContactController, AddressController, CompanyController,
         ContactCompanyController, TagController, ContactTagController,
         NoteController, LeadController],
})
export class CrmModule { }
