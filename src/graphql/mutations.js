/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const createAccount = `mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
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
export const updateAccount = `mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
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
export const createVenue = `mutation CreateVenue($input: CreateVenueInput!) {
  createVenue(input: $input) {
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
export const updateVenue = `mutation UpdateVenue($input: UpdateVenueInput!) {
  updateVenue(input: $input) {
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
export const createFacility = `mutation CreateFacility($input: CreateFacilityInput!) {
  createFacility(input: $input) {
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
export const updateFacility = `mutation UpdateFacility($input: UpdateFacilityInput!) {
  updateFacility(input: $input) {
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
export const createBooking = `mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input) {
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
export const createTicket = `mutation CreateTicket($input: CreateTicketInput!) {
  createTicket(input: $input) {
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
export const deleteAccount = `mutation DeleteAccount($input: DeleteItemInput!) {
  deleteAccount(input: $input) {
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
export const deleteVenue = `mutation DeleteVenue($input: DeleteItemInput!) {
  deleteVenue(input: $input) {
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
export const deleteFacility = `mutation DeleteFacility($input: DeleteItemInput!) {
  deleteFacility(input: $input) {
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
export const deleteBooking = `mutation DeleteBooking($input: DeleteItemInput!) {
  deleteBooking(input: $input) {
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
export const deleteTicket = `mutation DeleteTicket($input: DeleteItemInput!) {
  deleteTicket(input: $input) {
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
