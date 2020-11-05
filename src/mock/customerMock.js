import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/management/filters').reply(200, {
  Filters: [
    {
      id: uuid(),
      customer:'Esther Howard'
    },
    {
      id: uuid(),
      customer:'Esther'
    },
    {
      id: uuid(),
      customer:'Howard'
    }
  ]
});

mock.onGet('/api/management/customers').reply(200, {
  customers: [
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Savannah Nguyen',
      orderdate: '06/20/2020',
      total: '$446.61',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Open',
      store:'DropShip Central',
      customer:'Leslie Alexander',
      orderdate: '06/20/2020',
      total: '$169.43',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'87',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Bessie Cooper',
      orderdate: '06/20/2020',
      total: '$630.44',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Ronald Richards',
      orderdate: '06/20/2020',
      total: '$475.22',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'8',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Open',
      store:'DropShip Central',
      customer:'Jane Cooper',
      orderdate: '06/20/2020',
      total: '$219.78',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Theresa Webb',
      orderdate: '06/20/2020',
      total: '$105.55',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'59',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Jacob Jones',
      orderdate: '06/20/2020',
      total: '$293.01',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Esther Howard',
      orderdate: '06/20/2020',
      total: '$351.02',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Kathryn Murphy',
      orderdate: '06/20/2020',
      total: '$948.55',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Darlene Robertson',
      orderdate: '06/20/2020',
      total: '$106.58',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Devon Lane',
      orderdate: '06/20/2020',
      total: '$943.65',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Cody Fisher',
      orderdate: '06/20/2020',
      total: '$576.28',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Kristin Watson',
      orderdate: '06/20/2020',
      total: '$601.13',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    },
    {
      id: uuid(),
      order: 'UTgRedl6E',
      status: 'Shipped',
      store:'DropShip Central',
      customer:'Arlene McCoy',
      orderdate: '06/20/2020',
      total: '$778.35',
      warehouse: 'Ca',
      shipdate: '07/23/2020',
      totalunits:'3',
      shippingcost:'$6.98'
    }
  ]
});

mock.onGet('/api/management/customers/1/summary').reply(200, {
  summary: {
    title: 'Title Name',
    name: 'Gregor',
    surname: 'Gregor',
    Username: 'Gregor Gregor',
    country: 'slovenia',
    Address: 'slovenia address',
    Gender: 'Female',
    Age: '32',
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    autoCC: false,
    verified: true,
    currency: '$',
    Work:'Phone number 1',
    Mobile:'Phone number',
    FAX:'Phone number 3',
    Other:'Phone number 4',
    Work1:'Email 1',
    Mobile1:'Email 2',
    FAX1:'Email 3',
    Other1:'Email 4',
    fb:'https://www.facebook.com/',
    g:'https://www.facebook.com/',
    twitter:'https://www.facebook.com/',
    other1:'https://www.facebook.com/',
    

    invoices: [
      {
        id: uuid(),
        type: 'paid',
        value: 10.0
      },
      {
        id: uuid(),
        type: 'paid',
        value: 15.0
      },
      {
        id: uuid(),
        type: 'due',
        value: 5
      },
      {
        id: uuid(),
        type: 'income',
        value: 10.0
      }
    ],
    vat: 19,
    balance: 0,
    emails: [
      {
        id: uuid(),
        description: 'Order confirmation',
        created_at: moment()
          .subtract(3, 'days')
          .subtract(5, 'hours')
          .subtract(34, 'minutes')
      },
      {
        id: uuid(),
        description: 'Order confirmation',
        created_at: moment()
          .subtract(4, 'days')
          .subtract(11, 'hours')
          .subtract(49, 'minutes')
      }
    ]
  }
});

mock.onGet('/api/management/customers/1/invoices').reply(200, {
  invoices: [
    {
      id: uuid(),
      date: moment(),
      description: 'Freelancer Subscription (12/05/2019 - 11/06/2019)',
      paymentMethod: 'Credit Card',
      value: '5.25',
      currency: '$',
      status: 'paid'
    },
    {
      id: uuid(),
      date: moment(),
      description: 'Freelancer Subscription (12/05/2019 - 11/06/2019)',
      paymentMethod: 'Credit Card',
      value: '5.25',
      currency: '$',
      status: 'paid'
    }
  ]
});

mock.onGet('/api/management/customers/1/logs').reply(200, {
  logs: [
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 522,
      error: 'Invalid credit card',
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'DELETE',
      route: '/api/products/d65654e/remove',
      desc: 'Cart remove',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(8, 'minutes')
        .subtract(23, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/d65654e/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(20, 'minutes')
        .subtract(54, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(34, 'minutes')
        .subtract(16, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f',
      desc: 'View product',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(54, 'minutes')
        .subtract(30, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products',
      desc: 'Get products',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(56, 'minutes')
        .subtract(40, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/login',
      desc: 'Login',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(57, 'minutes')
        .subtract(5, 'seconds')
    }
  ]
});
