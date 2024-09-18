import { Customer } from '@/types/customer'
import { orders } from './orders'

const cleanOrders = orders.map((order) => {
  const { customer, ...rest } = order
  return rest
})

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Ana Oliveira',
    phone: '(88) 91234-5678',
    email: 'ana@example.com',
    balance: 150,
    orders: cleanOrders,
    address: {
      id: 1,
      district: 'Jardins',
      street: 'Rua Tavares',
      number: '101',
      complement: 'Apartamento A',
      landmark:
        'Próximo ao bar do João na esquina e na rua da academia Fitness Life',
    },
  },
  {
    id: 2,
    name: 'Carlos Souza',
    phone: '(88) 91123-4567',
    email: 'carlos@example.com',
    balance: 300,
    orders: cleanOrders,
    address: {
      id: 2,
      landmark:
        'Próximo ao bar do João na esquina e na rua da academia Fitness Life',
    },
  },
  {
    id: 3,
    name: 'Beatriz Lima',
    phone: '',
    email: '',
    balance: 90,
    orders: cleanOrders,
    address: {
      id: 3,
      district: 'Cohab',
      street: 'Rua Fulano',
      number: '143',
      complement: 'Casa 2',
    },
  },
  {
    id: 4,
    name: 'Daniel Alves',
    balance: 220,
    orders: cleanOrders,
    address: {
      id: 4,
      street: 'Rua João Martins',
      number: '55',
    },
  },
  {
    id: 5,
    name: 'Eduarda Campos',
    phone: '(88) 91567-8901',
    email: 'eduarda@example.com',
    balance: 180,
    orders: cleanOrders,
    address: {
      id: 5,
    },
  },
  {
    id: 6,
    name: 'Felipe Andrade',
    phone: '(88) 91678-9012',
    email: 'felipe@example.com',
    balance: 75,
    orders: cleanOrders,
    address: {
      id: 6,
    },
  },
  {
    id: 7,
    name: 'Gabriela Souza',
    phone: '(88) 91789-0123',
    email: 'gabriela@example.com',
    balance: 60,
    orders: cleanOrders,
    address: {
      id: 7,
    },
  },
  {
    id: 8,
    name: 'Henrique Matos',
    phone: '(88) 91890-1234',
    email: 'henrique@example.com',
    balance: 100,
    orders: cleanOrders,
    address: {
      id: 8,
    },
  },
  {
    id: 9,
    name: 'Maria Oliveira',
    phone: '(88) 92123-4567',
    email: 'maria@example.com',
    balance: 50,
    orders: cleanOrders,
    address: {
      id: 9,
    },
  },
  {
    id: 10,
    name: 'Ana Souza',
    phone: '(88) 92234-5678',
    email: 'ana@example.com',
    balance: 15,
    orders: cleanOrders,
    address: {
      id: 10,
    },
  },
  {
    id: 11,
    name: 'Carlos Mendes',
    phone: '(88) 92345-6789',
    email: 'carlos@example.com',
    balance: 60,
    orders: cleanOrders,
    address: {
      id: 11,
    },
  },
  {
    id: 12,
    name: 'Fernanda Costa',
    phone: '(88) 92456-7890',
    email: 'fernanda@example.com',
    balance: 30,
    orders: cleanOrders,
    address: {
      id: 12,
    },
  },
  {
    id: 13,
    name: 'Rafael Lima',
    phone: '(88) 92567-8901',
    email: 'rafael@example.com',
    balance: 75,
    orders: cleanOrders,
    address: {
      id: 13,
    },
  },
  {
    id: 14,
    name: 'Isabela Rocha',
    phone: '(88) 92678-9012',
    email: 'isabela@example.com',
    balance: 90,
    orders: cleanOrders,
    address: {
      id: 14,
    },
  },
  {
    id: 15,
    name: 'Lucas Pereira',
    phone: '(88) 92789-0123',
    email: 'lucas@example.com',
    balance: 20,
    orders: cleanOrders,
    address: {
      id: 15,
    },
  },
  {
    id: 16,
    name: 'Juliana Santos',
    phone: '(88) 92890-1234',
    email: 'juliana@example.com',
    balance: 100,
    orders: cleanOrders,
    address: {
      id: 16,
    },
  },
  {
    id: 17,
    name: 'Pedro Martins',
    phone: '(88) 92901-2345',
    email: 'pedro@example.com',
    balance: 120,
    orders: cleanOrders,
    address: {
      id: 17,
    },
  },
  {
    id: 18,
    name: 'Renata Ferreira',
    phone: '(88) 93012-3456',
    email: 'renata@example.com',
    balance: 250,
    orders: cleanOrders,
    address: {
      id: 18,
    },
  },
  {
    id: 19,
    name: 'Bruno Silva',
    phone: '(88) 93123-4567',
    email: 'bruno@example.com',
    balance: 80,
    orders: cleanOrders,
    address: {
      id: 19,
    },
  },
  {
    id: 20,
    name: 'Carla Figueiredo',
    phone: '(88) 93234-5678',
    email: 'carla@example.com',
    balance: 95,
    orders: cleanOrders,
    address: {
      id: 20,
    },
  },
]
