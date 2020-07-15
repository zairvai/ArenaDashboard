/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByUsername = `query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
    id
    name
    emailAddress
    isEmailVerified
    phoneNumber
    isPhoneVerified
    createdAt
    updatedAt
    isEnabled
    status
  }
}
`;
export const getAccount = `query GetAccount($input: GetItemInput!) {
  getAccount(input: $input) {
    id
    name
    status
    createdBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    updatedBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const getVenue = `query GetVenue($input: GetItemInput!) {
  getVenue(input: $input) {
    id
    account {
      id
      name
      status
      createdAt
      updatedAt
      version
    }
    name
    location {
      lat
      lon
    }
    address
    phoneNumber {
      label
      phoneNumber
    }
    emailAddress
    socialMedia {
      id
      channel
    }
    tags
    description
    openHours {
      day
      from
      to
    }
    availStatus
    status
    createdBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    updatedBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const getFacility = `query GetFacility($input: GetItemInput!) {
  getFacility(input: $input) {
    id
    account {
      id
      name
      status
      createdAt
      updatedAt
      version
    }
    venue {
      id
      name
      address
      emailAddress
      tags
      description
      availStatus
      status
      createdAt
      updatedAt
      version
    }
    name
    courtType
    entryType
    pricing
    price {
      day
    }
    location {
      lat
      lon
    }
    openHours {
      day
      from
      to
    }
    availStatus
    address
    tags
    description
    status
    createdBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    updatedBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const getBooking = `query GetBooking($input: GetItemInput!) {
  getBooking(input: $input) {
    id
    account {
      id
      name
      status
      createdAt
      updatedAt
      version
    }
    venue {
      id
      name
      address
      emailAddress
      tags
      description
      availStatus
      status
      createdAt
      updatedAt
      version
    }
    facility {
      id
      name
      courtType
      entryType
      pricing
      availStatus
      address
      tags
      description
      status
      createdAt
      updatedAt
      version
    }
    currency
    totalPrice
    location {
      lat
      lon
    }
    status
    bookStatus
    createdBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    updatedBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    createdAt
    updatedAt
    description
    version
  }
}
`;
export const getTicket = `query GetTicket($input: GetItemInput!) {
  getTicket(input: $input) {
    id
    booking {
      id
      currency
      totalPrice
      status
      bookStatus
      createdAt
      updatedAt
      description
      version
    }
    start
    end
    location {
      lat
      lon
    }
    ticketStatus
    status
    createdBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    updatedBy {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    createdAt
    updatedAt
    description
    version
  }
}
`;
export const listUsers = `query ListUsers($input: ListItemInput) {
  listUsers(input: $input) {
    items {
      id
      name
      emailAddress
      isEmailVerified
      phoneNumber
      isPhoneVerified
      createdAt
      updatedAt
      isEnabled
      status
    }
    foundDocs
  }
}
`;
export const listAccounts = `query ListAccounts($input: ListItemInput) {
  listAccounts(input: $input) {
    items {
      id
      name
      status
      createdAt
      updatedAt
      version
    }
    foundDocs
  }
}
`;
export const listVenues = `query ListVenues($input: ListVenueInput) {
  listVenues(input: $input) {
    items {
      id
      name
      address
      emailAddress
      tags
      description
      availStatus
      status
      createdAt
      updatedAt
      version
    }
    foundDocs
  }
}
`;
export const listFacilities = `query ListFacilities($input: ListFacilityInput) {
  listFacilities(input: $input) {
    items {
      id
      name
      courtType
      entryType
      pricing
      availStatus
      address
      tags
      description
      status
      createdAt
      updatedAt
      version
    }
    foundDocs
  }
}
`;
export const listBookings = `query ListBookings($input: ListBookingInput) {
  listBookings(input: $input) {
    items {
      id
      currency
      totalPrice
      status
      bookStatus
      createdAt
      updatedAt
      description
      version
    }
    foundDocs
  }
}
`;
export const searchFacilitiesAggregateByVenue = `query SearchFacilitiesAggregateByVenue($input: SearchFacilitiesInput!) {
  searchFacilitiesAggregateByVenue(input: $input) {
    items {
      id
      name
      address
      emailAddress
      tags
      description
      availStatus
      status
      createdAt
      updatedAt
      version
    }
    afterKey
  }
}
`;
