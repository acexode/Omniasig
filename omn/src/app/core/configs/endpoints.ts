import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
  login: serverBaseUrl + '/User/LoginAndCreateToken',
  findUserByPhoneNumber:
    serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
  getUserProfile: serverBaseUrl + '/UserProfile/GetUserProfile',
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
  confirmNewEmail:
    serverBaseUrl + '/UserProfile/ConfirmEmailForRegisterUserProfile',
  confirmEmailChange: serverBaseUrl + '/UserProfile/ConfirmationNewEmailChange',
  changeEmail: serverBaseUrl + '/UserProfile/RequestNewEmailChange',
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
};

export const locuinteEndpoints = {
  base: serverBaseUrl + '/locuinte',
  add: serverBaseUrl + '/Address/AddAddress',
  makeHomeAddress: serverBaseUrl + '/Address/MakeHomeAddress',
  AlluserLocation: serverBaseUrl + '/Address/GetAllAddressesForLoggedUser',
  updateAddress: serverBaseUrl + '/Location/UpdateLocationForAddressId',
  disAbleLocation: serverBaseUrl + '/Location/DisableLocationForAddressId',
};

export const phoneNumberEndPoints = {
  RequestNewPhoneNumberChange:
    baseEndpoints.userProfile + '/RequestNewPhoneNumberChange',
  ConfirmNewPhoneNumber: baseEndpoints.userProfile + '/ConfirmNewPhoneNumber',
};
