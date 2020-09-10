import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
  login: serverBaseUrl + '/User/LoginAndCreateToken',
  findUserByPhoneNumber:
    serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
  getUserProfile: serverBaseUrl + '/UserProfile/GetUserProfile',
  updateUserProfile: serverBaseUrl + '/UserProfile/UpdateUserProfile',
  sendPhoneNumberSms: serverBaseUrl + '/UserProfile/SmsPhoneNumberVerification',
  confirmPhoneNumberSms: serverBaseUrl + '/UserProfile/SmsPhoneNumberConfirm',
  GetUserNameByPhoneNumber:
    serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
  RegisterPhoneNumber: serverBaseUrl + '/UserProfile/RegisterPhoneNumber',
  ConfirmRegisterPhoneNumber: serverBaseUrl + '/UserProfile/ConfirmPhoneNumber',
  RegisterUserProfile: serverBaseUrl + '/UserProfile/RegisterUserProfile',
  requestPincodeReset:
    serverBaseUrl + '/UserProfile/RequestPinChangeWithoutAuthentification',
  confirmPincodeReset:
    serverBaseUrl + '/UserProfile/ConfirmPinChangeWithoutAuthentification',
  updatePassword: serverBaseUrl + '/User/UpdatePassword',
};

export const baseEndpoints = {
  policy: serverBaseUrl + '/policy',
  userProfile: serverBaseUrl + '/UserProfile',
};

export const policyEndpoints = {
  base: baseEndpoints.policy,
  userPoliciesBase: baseEndpoints.policy,
  userPoliciesArchive: baseEndpoints.policy + '/archive',
  userOffersBase: baseEndpoints.policy + '/offers',

  // real endpoints
  GetActivePADOffers: serverBaseUrl + '/PADInsurance/GetActivePADOffers',
  GetActivePADPolicies: serverBaseUrl + '/PADInsurance/GetActivePADPolicies',
};

export const locuinteEndpoints = {
  base: serverBaseUrl + '/locuinte',
  add: serverBaseUrl + '/Location/AddAddressLocation',
  makeHomeAddress: serverBaseUrl + '/Address/MakeHomeAddress',
  AlluserLocation: serverBaseUrl + '/Location/GetAllLocationsForLoggedUser',    
  disAbleLocation: serverBaseUrl + '/Location/DisableLocation',
  getCities: serverBaseUrl + '/INSIS/Cities',
  getCounties: serverBaseUrl + '/INSIS/Counties',
  getStreets: serverBaseUrl + '/INSIS/Streets', 
  updateAddress: serverBaseUrl + '/Location/UpdateLocation',  
};

export const phoneNumberEndPoints = {
  RequestNewPhoneNumberChange:
    baseEndpoints.userProfile + '/RequestNewPhoneNumberChange',
  ConfirmNewPhoneNumber: baseEndpoints.userProfile + '/ConfirmNewPhoneNumber',
};
