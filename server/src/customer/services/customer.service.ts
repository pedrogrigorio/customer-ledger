import { CustomerRepository } from '../repositories/customer.repository';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async getAllCustomers() {
    const customers = await this.customerRepository.findAll();
    return customers;
  }

  async getCustomerById(customerId: number) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error(`Customer not found`);
    }

    return customer;
  }

  async createCustomer(customer: CreateCustomerDto) {
    const createdCustomer = await this.customerRepository.create(customer);

    return createdCustomer;
  }

  async updateCustomer(customerId: number, customer: UpdateCustomerDto) {
    const existingCustomer = await this.customerRepository.findById(customerId);

    if (!existingCustomer) {
      throw new Error(`Customer not found`);
    }

    const updatedCustomer = await this.customerRepository.update(
      customerId,
      customer,
    );

    return updatedCustomer;
  }

  async deleteCustomer(customerId: number) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error(`Customer not found`);
    }

    await this.customerRepository.delete(customerId);
  }
}
