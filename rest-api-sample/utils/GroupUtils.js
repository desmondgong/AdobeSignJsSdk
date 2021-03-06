/*
 *  Copyright 2016 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

(function(factory) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../../rest-api-sdk/src/index'), require('./Errors'), require('./ApiUtils'));
  
}(function(AdobeSignSdk, Errors, ApiUtils) {
  'use strict';

  var GroupUtils = function(){};

    var groupsApi = new AdobeSignSdk.GroupsApi(ApiUtils.getContext());
    var groupsModel = AdobeSignSdk.GroupsModel;
    var ACCESS_TOKEN_KEY= "accessToken";

    /**
     * Create a sample group.
     *
     * @param userEmail Email Id of the user
     * @return String containing id of the newly created group.
     * @throws ApiError
     */
    GroupUtils.createGroupWithOAuthWorkflow = function(groupName,
                                                       accessToken) {

      var groupCreationInfo = new groupsModel.GroupCreationInfo();
      groupCreationInfo.setGroupName(groupName);
      var headers = {};
      headers[ACCESS_TOKEN_KEY] = accessToken;

      return groupsApi.createGroup(headers,
                                   groupCreationInfo)
                      .then(function(groupCreationResponse) {
                        return groupCreationResponse.getGroupId();
                      })
                      .catch(function(apiError) {
                        ApiUtils.logAndThrowError(Errors.CREATE_USER, apiError);
                      });

    };

  return GroupUtils;
}));
