import { environment } from '../../../environments/environment';

export const serverBaseUrl = environment.serverUrl;
export const authEndpoints = {
    login: serverBaseUrl + '/User/LoginAndCreateToken',
    findUserByPhoneNumber: serverBaseUrl + '/UserProfile/GetUserNameByPhoneNumber',
    getUserProfile: serverBaseUrl + '/UserProfile/GetUserProfile'
};

export const baseEndpoints = {
    policy: serverBaseUrl + '/policy',
    userProfile: serverBaseUrl + '/UserProfile'
};

export const policyEndpoints = {
    base: baseEndpoints.policy,
    userPoliciesBase: baseEndpoints.policy,
    userPoliciesArchive: baseEndpoints.policy + '/archive',
    userOffersBase: baseEndpoints.policy + '/offers',
};

export const locuinteEndpoints = {
    base: serverBaseUrl + '/locuinte',
};

export const phoneNumberEndPoints = {
    RequestNewPhoneNumberChange: baseEndpoints.userProfile + '/RequestNewPhoneNumberChange',
    ConfirmNewPhoneNumber: baseEndpoints.userProfile + '/ConfirmNewPhoneNumber',
};
