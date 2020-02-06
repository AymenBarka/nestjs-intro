/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Post, Body, Get, Param} from "@nestjs/common";
import { ProductsService } from "../service/products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    async addProduct(
        // @Body() completeBody: {title: string, description: string, price: number}
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }
    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return await this.productsService.getSingleProduct(prodId);
    }

    @Post('update/:id')
    async updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
        ) {
            await this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
            return null;
    }
    @Post(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}