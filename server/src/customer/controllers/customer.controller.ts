import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { DeleteCustomersDto } from '../dtos/delete-customers.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CustomerService } from '../services/customer.service';
import {
  Controller,
  Delete,
  Param,
  Body,
  Post,
  Put,
  Get,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerById(
    @Param('id') customerId: string,
    @Query('includeOrders', new DefaultValuePipe(false), ParseBoolPipe)
    includeOrders: boolean,
  ) {
    const id = parseInt(customerId);

    return await this.customerService.getCustomerById(id, includeOrders);
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

  @Delete()
  async deleteCustomers(@Body() deleteCustomersDto: DeleteCustomersDto) {
    const { customerIds } = deleteCustomersDto;

    return await this.customerService.deleteCustomers(customerIds);
  }
}
