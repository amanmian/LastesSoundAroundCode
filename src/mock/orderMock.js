import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/orders').reply(200, {
  orders: [
    {
      id: uuid(),
      created_at: moment().subtract(10, 'minutes'),
      customer: {
        name: 'Email Template Name 1'
      },
      payment: {
        ref: 'FAD103',
        method: 'Email Template Subject',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(32, 'minutes')
        .subtract(23, 'seconds'),
      customer: {
        name: 'Email Template Name 2'
      },
      payment: {
        ref: 'FAD102',
        method: 'Email Template Subject',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(36, 'minutes')
        .subtract(51, 'seconds'),
      customer: {
        name: 'Email Template Name 3'
      },
      payment: {
        ref: 'FAD101',
        method: 'Email Template Subject',
        total: '500.00',
        currency: '$',
        status: 'completed'
      },
      status: 'active'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(38, 'minutes')
        .subtract(55, 'seconds'),
      customer: {
        name: 'Email Template Name 4'
      },
      payment: {
        ref: 'FAD100',
        method: 'Email Template Subject',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(40, 'minutes')
        .subtract(3, 'seconds'),
      customer: {
        name: 'Email Template Name 5'
      },
      payment: {
        ref: 'FAD99',
        method: 'Email Template Subject',
        total: '500.00',
        currency: '$',
        status: 'completed'
      },
      status: 'active'
    },
  ]
});

mock.onGet('/api/orders11').reply(200, {
  orders11: [
    {
      id: uuid(),
      created_at: moment().subtract(10, 'minutes'),
      customer: {
        name: 'SMS Provider 1'
      },
      payment: {
        ref: 'FAD103',
        method: 'Username 1',
        total: 'provider@123',
        currency: '$',
        status: 'http://dummy.restapiexample.com/api/v1/create'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(32, 'minutes')
        .subtract(23, 'seconds'),
      customer: {
        name: 'SMS Provider 2'
      },
      payment: {
        ref: 'FAD102',
        method: 'Username 2',
        total: 'provider@123',
        currency: '$',
        status: 'http://dummy.restapiexample.com/api/v1/create'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(36, 'minutes')
        .subtract(51, 'seconds'),
      customer: {
        name: 'SMS Provider 3'
      },
      payment: {
        ref: 'FAD101',
        method: 'Username 3',
        total: 'provider@123',
        currency: '$',
        status: 'http://dummy.restapiexample.com/api/v1/create'
      },
      status: 'active'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(38, 'minutes')
        .subtract(55, 'seconds'),
      customer: {
        name: 'SMS Provider 4'
      },
      payment: {
        ref: 'FAD100',
        method: 'Username 4',
        total: 'provider@123',
        currency: '$',
        status: 'http://dummy.restapiexample.com/api/v1/create'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(40, 'minutes')
        .subtract(3, 'seconds'),
      customer: {
        name: 'SMS Provider 5'
      },
      payment: {
        ref: 'FAD99',
        method: 'Username 5',
        total: 'provider@123',
        currency: '$',
        status: 'http://dummy.restapiexample.com/api/v1/create'
      },
      status: 'active'
    },
  ]
});


mock.onGet('/api/orders1').reply(200, {
  orders1: [
    {
      id: uuid(),
      created_at: moment().subtract(10, 'minutes'),
      customer: {
        name: 'SMS Template Name 1'
      },
      payment: {
        ref: 'FAD103',
        method: 'SMS Text 1',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(32, 'minutes')
        .subtract(23, 'seconds'),
      customer: {
        name: 'SMS Template Name 2'
      },
      payment: {
        ref: 'FAD102',
        method: 'SMS Text 2',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(36, 'minutes')
        .subtract(51, 'seconds'),
      customer: {
        name: 'SMS Template Name 3'
      },
      payment: {
        ref: 'FAD101',
        method: 'SMS Text 3',
        total: '500.00',
        currency: '$',
        status: 'completed'
      },
      status: 'active'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(38, 'minutes')
        .subtract(55, 'seconds'),
      customer: {
        name: 'SMS Template Name 4'
      },
      payment: {
        ref: 'FAD100',
        method: 'SMS Text 4',
        total: '500.00',
        currency: '$',
        status: 'pending'
      },
      status: 'inactive'
    },
    {
      id: uuid(),
      created_at: moment()
        .subtract(40, 'minutes')
        .subtract(3, 'seconds'),
      customer: {
        name: 'SMS Template Name 5'
      },
      payment: {
        ref: 'FAD99',
        method: 'SMS Text 5',
        total: '500.00',
        currency: '$',
        status: 'completed'
      },
      status: 'active'
    },
  ]
});


mock.onGet('/api/orders/1').reply(200, {
  order: {
    id: uuid(),
    ref: 'FAD107',
    promoCode: null,
    value: '55.25',
    currency: '$',
    status: 'canceled',
    customer: {
      name: 'Ekaterina Tankova',
      address: 'Street King William, 42456',
      city: 'Montgomery',
      country: 'United States'
    },
    items: [
      {
        id: uuid(),
        name: 'Project Points',
        cuantity: 25,
        billing: 'monthly',
        status: 'completed',
        value: '50.25',
        currency: '$'
      },
      {
        id: uuid(),
        name: 'Freelancer Subscription',
        cuantity: 1,
        billing: 'monthly',
        status: 'completed',
        value: '5.00',
        currency: '$'
      }
    ],
    created_at: moment()
  }
});
