import { TestScheduler } from 'rxjs/testing';
import { Utils } from '../utils';
import { DataServiceObservable } from './dataServiceObservable';
import { UserServiceObservable } from './userServiceObservable';

describe('UserServiceObservable', () => {

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  const dataService = new DataServiceObservable();
  const utils = new Utils();
  const userService = new UserServiceObservable(dataService, utils);

  it('should ', (done) => {
    userService.getUsersWithPopularPosts(10).subscribe(res => {
      expect(res.length).toBe(4);
      done();
    });
  });

  /* it('should 2', () => {
    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '999ms a |';
      const expectedLength = 3;
      expectObservable(userService.getUsersWithPopularPosts(10)).toBe(expectedMarble, expectedLength);
    });
  }); */

});
