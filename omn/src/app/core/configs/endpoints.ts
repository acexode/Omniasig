import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
  login: serverBaseUrl + '/User/LoginAndCreateToken',
  findUserByPhoneNumber: serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
  getUserProfile: serverBaseUrl + '/UserProfile/GetUserProfile',
  requestPincodeReset:serverBaseUrl + '/UserProfile/RequestPinChangeWithoutAuthentification',
  confirmPincodeReset:serverBaseUrl + '/UserProfile/ConfirmPinChangeWithoutAuthentification',
  sendPhoneNumberSms: serverBaseUrl + '/UserProfile/SmsPhoneNumberVerification',
  confirmPhoneNumberSms: serverBaseUrl + '/UserProfile/SmsPhoneNumberConfirm',
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
  disAbleLocation: serverBaseUrl + '/Location/DisableLocationForAddressId',
};
