import { Entity } from "typeorm";

@Entity()
export class Product {
    id: number;
    title: string;
    description: string;
    price: number
}

