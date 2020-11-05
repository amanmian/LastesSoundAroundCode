import mock from 'src/utils/mock';

mock.onGet('/api/management/Businesses').reply(200, {
  Businesses: [

    {
      post: 'Factory'
    },

    {
      post: 'Headquarters'
    },
    {
      post: 'Stores'
    },
    {
      post: 'Warehouse'
    },
  ],



  Companytype: [

    {
      post: 'B2B'
    },

    {
      post: 'B2C'
    },
    {
      post: 'Client'
    },
    {
      post: 'Partner'
    },
    {
      post: 'Supplier'
    },
    {
      post: 'Others'
    },
  ],


  Department: [

    {
      post: 'Accounting'
    },

    {
      post: 'Healthcare'
    },
    {
      post: 'Manufacturing'
    },
  ],

  Educationdegree: [

    {
      post: 'PHD'
    },
  ],


  Email: [

    {
      post: 'Home'
    },

    {
      post: 'Newsletter'
    },
    {
      post: 'Work'
    },
    {
      post: 'Other'
    },
  ],




  Industry: [

    {
      post: 'Banking Services'
    },

    {
      post: 'Consulting'
    },
    {
      post: 'Delivery'
    },
    {
      post: 'Entertainment'
    },
    {
      post: 'Finance'
    },
    {
      post: 'Government'
    },
    {
      post: 'Information Technology'
    },
    {
      post: 'Telecommunication'
    },
    {
      post: 'Manufacturing'
    },
    {
      post: 'Non-Profit'
    },
    {
      post: 'Others'
    },
  ],


  Phone: [

    {
      post: 'Fax'
    },

    {
      post: 'Home'
    },
    {
      post: 'Mobile'
    },
    {
      post: 'Pager'
    },
    {
      post: 'SMS Marketing'
    },
    {
      post: 'Work Phone'
    },
    {
      post: 'Others'
    },
  ],



  SocialMedia: [

    {
      post: 'Facebook'
    },

    {
      post: 'Instagram'
    },
    {
      post: 'Skype'
    },
    {
      post: 'Twitter'
    },
    {
      post: 'Others'
    },
  ],

  Title: [

    {
      post: 'CEO'
    },

    {
      post: 'CFO'
    },
    {
      post: 'Technical department'
    }

  ],

  EmployeeType: [
    {
      post: 'Admin'
    },

    {
      post: 'Supervisor'
    },
    {
      post: 'User'
    }
  ],

  Modules: [
    {
      post: 'Tracking'
    },

    {
      post: 'Module 1'
    },
    {
      post: 'Module 2'
    }
  ]

});
