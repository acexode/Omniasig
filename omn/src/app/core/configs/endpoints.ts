import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
  login: serverBaseUrl + '/User/LoginAndCreateToken',
  findUserByPhoneNumber: serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
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
  updatePassword: serverBaseUrl + '/UserProfile/UpdatePassword',
  ChangeMarketingAndNotificationSettings:
    serverBaseUrl + '/UserProfile/ChangeMarketingAndNotificationSettings',
  confirmNewEmail:
    serverBaseUrl + '/UserProfile/ConfirmEmailForRegisterUserProfile',
  confirmEmailChange: serverBaseUrl + '/UserProfile/ConfirmationNewEmailChange',
  changeEmail: serverBaseUrl + '/UserProfile/RequestNewEmailChange',
  updateUserProfile: serverBaseUrl + '/UserProfile/UpdateUserProfile',
};

export const baseEndpoints = {
  policy: serverBaseUrl + '/policy',
  userProfile: serverBaseUrl + '/UserProfile',
  pad: serverBaseUrl + '/PADInsurance',
  amplus: serverBaseUrl + '/AmplusInsurance',
  paidExtS: serverBaseUrl + '/PAIDExternalService',
  downloadDocs: serverBaseUrl + '/Documents',
};

export const policyEndpoints = {
  base: baseEndpoints.policy,
  userPoliciesBase: baseEndpoints.policy,
  userPoliciesArchive: baseEndpoints.policy + '/archive',
  userOffersBase: baseEndpoints.policy + '/offers',

  // real endpoints
  GetActivePADOffers: serverBaseUrl + '/PADInsurance/GetActivePADOffers',
  GetActivePADPolicies: serverBaseUrl + '/PADInsurance/GetActivePADPolicies',
  initiatePayment: serverBaseUrl + '/GPWebpay',
  confirmPayment: serverBaseUrl + '/Payment/GetPaymentbyUrlHash',
  GetActiveAmplusOffers:
    serverBaseUrl + '/AmplusInsurance/GetActiveAmplusOffers',
  GetActiveAmplusPolicies:
    serverBaseUrl + '/AmplusInsurance/GetActiveAmplusPolicies',
  GetActiveAmplusPadOffers:
    serverBaseUrl + '/AmplusInsurance/GetActiveAmplusPadOffers',
  GetActiveAmplusPadPolicies:
    serverBaseUrl + '/AmplusInsurance/GetActiveAmplusPadPolicies',
};

export const documentEndpoint = {
  getDocument: baseEndpoints.downloadDocs + '/GetDocumentById',
};

export const locuinteEndpoints = {
  base: serverBaseUrl + '/locuinte',
  add: serverBaseUrl + '/Location/AddAddressLocation',
  makeHomeAddress: serverBaseUrl + '/Location/MakeLocationHomeAddress',
  AlluserLocation: serverBaseUrl + '/Location/GetAllLocationsForLoggedUser',
  updateAddress: serverBaseUrl + '/Location/UpdateLocation',
  disAbleLocation: serverBaseUrl + '/Location/DisableLocation',
  GetAllLocationsForLoggedUser:
    serverBaseUrl + '/Location/GetAllLocationsForLoggedUser',
  singleLocation: serverBaseUrl + '/Location/GetLocationByIdForLoggedUser',
  getCities: serverBaseUrl + '/INSIS/Cities',
  getCounties: serverBaseUrl + '/INSIS/Counties',
  getStreets: serverBaseUrl + '/INSIS/Streets',
};

export const phoneNumberEndPoints = {
  RequestNewPhoneNumberChange:
    baseEndpoints.userProfile + '/RequestNewPhoneNumberChange',
  ConfirmNewPhoneNumber: baseEndpoints.userProfile + '/ConfirmNewPhoneNumber',
};

export const sugestii = {
  base: baseEndpoints.userProfile + '/ChangeSuggestions',
};

export const padEndpoints = {
  base: baseEndpoints.pad,
  VerifyPADInsuranceOffer: baseEndpoints.pad + '/VerifyPADInsuranceOffer',
  CreatePADInsuranceOffer: baseEndpoints.pad + '/CreatePADInsuranceOffer',
  CreatePADInsurancePolicy: baseEndpoints.pad + '/CreatePADInsurancePolicy',
};

export const amplusEndpoints = {
  base: baseEndpoints.amplus,
  CreateAmplusInsuranceOffer:
    baseEndpoints.amplus + '/CreateAmplusInsuranceOffer',
};

export const paidExternalService = {
  base: baseEndpoints.paidExtS,
  CheckPAD: baseEndpoints.paidExtS + '/CheckPAD',
};

export const documenteEndpoints = {
  GetAllDocumentsForCurrentUser:
    serverBaseUrl + '/Documents/GetAllDocumentsForCurrentUser',
  GetDocumentById: serverBaseUrl + '/Documents/GetDocumentById',
};
export const biometricsEndpoints = {
  uploadPicture:  serverBaseUrl + '/UserProfile/UploadPicture',
  processPicture: serverBaseUrl + '/UserProfile/IsIdenticalPictures',
};
