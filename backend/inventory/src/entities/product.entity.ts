import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, 
    ManyToMany, JoinTable, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";


    @Entity()
    export class StaffMember {
        @PrimaryGeneratedColumn("uuid")
        id: string;
    
        @Column({ length: 255 })
        name: string;
    
        @Column({ length: 255 })
        role: string;
    
        @Column({ length: 255, nullable: true })
        email: string;
    
        @Column({ length: 50, nullable: true })
        phone: string;
    
        @OneToMany(() => Service, (service) => service.staffMember)
        services: Service[];
    
        @Column({ type: "boolean", nullable: true })
        is_deleted: boolean;
    
        @CreateDateColumn()
        created_at: Date;
    
        @UpdateDateColumn()
        updated_at: Date;
    
        @Column({ type: "timestamp", nullable: true })
        deleted_at: Date;
    
        @Column({ type: "uuid", nullable: true })
        created_by: string;
    
        @Column({ type: "uuid", nullable: true })
        updated_by: string;
    
        @Column({ type: "uuid", nullable: true })
        deleted_by: string;
    }

    @Entity()
    @Index(["name", "slug"], { unique: true })
    export class Category {
        @PrimaryGeneratedColumn("uuid")
        id: string;
    
        @Column({ length: 255 })
        name: string;
    
        @OneToMany(() => Category, (category) => category.parent, { cascade: true })
        children: Category[];
    
        @ManyToOne(() => Category, (category) => category.parent, { nullable: true })
        parent: Category;
    
        @Column({ length: 255, unique: true })
        slug: string;
    
        @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
        products: ProductCategory[];
    
        @Column({ type: "boolean", nullable: true })
        is_deleted: boolean;
    
        @CreateDateColumn()
        created_at: Date;
    
        @UpdateDateColumn()
        updated_at: Date;
    
        @Column({ type: "timestamp", nullable: true })
        deleted_at: Date;
    
        @Column({ type: "uuid", nullable: true })
        created_by: string;
    
        @Column({ type: "uuid", nullable: true })
        updated_by: string;
    
        @Column({ type: "uuid", nullable: true })
        deleted_by: string;
    }
    

    @Entity()
    @Index(["name", "slug"], { unique: true })
    export class Brand {
    
        @PrimaryGeneratedColumn("uuid")
        id: string;
    
        @Column({ length: 255 })
        name: string;
    
        @Column({ length: 255, unique: true })
        slug: string;
    
        @OneToMany(() => Product, (product) => product.brand)
        products: Product[];
    
        @Column({ type: "boolean", nullable: true })
        is_deleted: boolean;
    
        @CreateDateColumn()
        created_at: Date;
    
        @UpdateDateColumn()
        updated_at: Date;
    
        @Column({ type: "timestamp", nullable: true })
        deleted_at: Date;
    
        @Column({ type: "uuid", nullable: true })
        created_by: string;
    
        @Column({ type: "uuid", nullable: true })
        updated_by: string;
    
        @Column({ type: "uuid", nullable: true })
        deleted_by: string;
    }

@Entity()
@Index(["name", "slug"], { unique: true })
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column({ type: "enum", enum: ["physical", "service", "fulfillment"], default: "physical" })
    productType: "physical" | "service" | "fulfillment";

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @Column({ default: true })
    isActive: boolean;

    @Column({ length: 255, nullable: true })
    seoTitle: string;

    @Column("text", { nullable: true })
    seoDescription: string;

    @Column("text", { nullable: true })
    seoKeywords: string;

    @Column({ length: 255, unique: true })
    slug: string;

    @OneToMany(() => ProductVariant, (variant) => variant.product)
    variants: ProductVariant[];

    @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
    categories: ProductCategory[];

    @OneToMany(() => ProductVendor, (productVendor) => productVendor.product)
    vendors: ProductVendor[];

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.categories, { onDelete: "CASCADE" })
    product: Product;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
    category: Category;

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
@Index(["sku", "product"], { unique: true })
export class ProductVariant {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.variants, { onDelete: "CASCADE" })
    product: Product;

    @Column({ length: 100, unique: true })
    sku: string;

    @Column({ length: 100, nullable: true })
    barcode: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column("int", { default: 0 })
    stockQuantity: number;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => ProductVariantAttribute, (attribute) => attribute.variant)
    attributes: ProductVariantAttribute[];

    @OneToMany(() => ProductImage, (image) => image.variant)
    images: ProductImage[];


    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
export class ProductVariantAttribute {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProductVariant, (variant) => variant.attributes, { onDelete: "CASCADE" })
    variant: ProductVariant;

    @Column({ length: 255 })
    attributeName: string;

    @Column({ length: 255 })
    attributeValue: string;

    @Column({ length: 50, nullable: true })
    attributeUnit: string;


    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
@Index(["name"], { unique: true })
export class Vendor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, nullable: true })
    contactEmail: string;

    @Column({ length: 50, nullable: true })
    contactPhone: string;

    @Column("text", { nullable: true })
    address: string;

    @OneToMany(() => ProductVendor, (productVendor) => productVendor.vendor)
    products: ProductVendor[];

    @OneToMany(() => Service, (service) => service.vendor)
    services: Service[];

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
@Index(["product", "vendor"], { unique: true })
export class ProductVendor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.vendors, { onDelete: "CASCADE" })
    product: Product;

    @ManyToOne(() => Vendor, (vendor) => vendor.products, { onDelete: "CASCADE" })
    vendor: Vendor;

    @Column({ length: 100, nullable: true })
    vendorSku: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    purchasePrice: number;

    @Column("int", { default: 0 })
    stockQuantity: number;

    @Column("int", { default: 0 })
    leadTimeDays: number;

    @Column({ default: false })
    isPreferredVendor: boolean;

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProductVariant, (variant) => variant.images, { onDelete: "CASCADE" })
    variant: ProductVariant;

    @Column("text")
    imageUrl: string;

    @Column("text", { nullable: true })
    altText: string;

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

@Entity()
export class Service {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    price: number;

    @Column("int", { nullable: true })
    durationMinutes: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isInternalService: boolean;

    @ManyToOne(() => Vendor, (vendor) => vendor.services, { nullable: true })
    vendor: Vendor;

    @ManyToOne(() => StaffMember, (staff) => staff.services, { nullable: true })
    staffMember: StaffMember;

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

