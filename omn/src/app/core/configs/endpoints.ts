import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
  login: serverBaseUrl + '/login',
};

export const baseEndpoints = {
  policy: serverBaseUrl + '/policy',
};

export const policyEndpoints = {
  base: baseEndpoints.policy,
  userPoliciesBase: baseEndpoints.policy,
  userPoliciesArchive: baseEndpoints.policy + '/archive',
  userOffersBase: baseEndpoints.policy + '/offers',
};

export const locuinteEndpoints = {
  base: serverBaseUrl + '/locuinte',
  add: serverBaseUrl + '/Address/AddAddress',
  makeHomeAddress: serverBaseUrl + '/Address/MakeHomeAddress',
  AlluserLocation: serverBaseUrl + '/Address/GetAllAddressesForLoggedUser',
  updateAddress: serverBaseUrl + '/Location/UpdateLocationForAddressId',
  disAbleLocation: serverBaseUrl + '/Location/DisableLocationForAddressId'
};
