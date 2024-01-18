export const TableNames = {
  accounts: 'ACCOUNTS',
  profiles: 'PROFILES',
  campaigns: 'CAMPAIGNS',
} as const;

export const TABLES = {
  ACCOUNTS: {
    HEADER: 'Accounts Table',
    TITLES: {
      accountId: 'Account ID',
      email: 'Email',
      authToken: 'Auth Token',
      creationDate: 'Creation Date',
    },
  },
  PROFILES: {
    HEADER: 'Profiles Table',
    TITLES: {
      profileId: 'Profile ID',
      marketplace: 'Country',
      country: 'Marketplace',
    },
  },
  CAMPAIGNS: {
    HEADER: 'Campaigns Table',
    TITLES: {
      campaignId: 'Campaign ID',
      clicks: 'Clicks',
      cost: 'Cost',
      date: 'Date',
    },
  },
} as const;
