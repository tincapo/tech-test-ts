jest.mock('../utils');
jest.mock('./dataServicePromise');

import { Utils } from "../utils";
import { DataServicePromise } from "./dataServicePromise";
import { UserServicePromise } from './userServicePromise';

describe('UserServicePromise', () => {

  describe('getUsersWithPopularPosts', () => {
    it('should call all the relevant service methods', () => {
      const dataServiceMock = new DataServicePromise();
      const utilsMock = new Utils();
      const userServicePromise = new UserServicePromise(dataServiceMock, utilsMock);

      return userServicePromise.getUsersWithPopularPosts(10).then(data => {
        expect(dataServiceMock.getUsers).toHaveBeenCalledTimes(1);
        expect(dataServiceMock.getPosts).toHaveBeenCalledTimes(1);
        expect(dataServiceMock.getComments).toHaveBeenCalledTimes(1);
        expect(utilsMock.assignPostsToUsers).toHaveBeenCalledTimes(1);
        expect(utilsMock.assignPopularFlagToUsers).toHaveBeenCalledTimes(1);
        expect(utilsMock.filterPopularUsers).toHaveBeenCalledTimes(1);
      });
    });
  });

});
