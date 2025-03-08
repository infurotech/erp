import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService, DatabaseService } from "@infuro/shared";
import { Repository } from "typeorm";

import { Contact } from "../entities/contact.entity";
import { Address } from "../entities/address.entity";
import { Company } from "../entities/company.entity";
import { ContactCompany } from "../entities/contact-company.entity";
import { Tag } from "../entities/tag.entity";
import { ContactTag } from "../entities/contact-tag.entity";
import { Note } from "../entities/note.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Lead } from "src/entities/lead.entity";

@Injectable({ scope: Scope.REQUEST })
export class ContactService extends CrudService<Contact> {
    constructor(
        @InjectRepository(Contact) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class AddressService extends CrudService<Address> {
    constructor(
        @InjectRepository(Address) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class CompanyService extends CrudService<Company> {
    constructor(
        @InjectRepository(Company) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class ContactCompanyService extends CrudService<ContactCompany> {
    constructor(
        @InjectRepository(ContactCompany) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class TagService extends CrudService<Tag> {
    constructor(
        @InjectRepository(Tag) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class ContactTagService extends CrudService<ContactTag> {
    constructor(
        @InjectRepository(ContactTag) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }

}

@Injectable({ scope: Scope.REQUEST })
export class NoteService extends CrudService<Note> {
    constructor(
        @InjectRepository(Note) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}

@Injectable({ scope: Scope.REQUEST })
export class LeadService extends CrudService<Lead> {
    constructor(
        @InjectRepository(Lead) repo,
        databaseService: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super(repo, databaseService);
    }
}