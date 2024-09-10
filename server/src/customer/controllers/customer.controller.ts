import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CustomerService } from '../services/customer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerById(@Param('id') customerId: string) {
    const id = parseInt(customerId);

    return await this.customerService.getCustomerById(id);
  }

  @Post()
  async createCustomer(@Body() CreateCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(CreateCustomerDto);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const id = parseInt(customerId);

    return await this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') customerId: string) {
    const id = parseInt(customerId);

    await this.customerService.deleteCustomer(id);
  }
}
