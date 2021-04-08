import { Utils } from '../utils';
import { DataServicePromise } from './dataServicePromise';

export class UserServicePromise {

  constructor(
    private dataService: DataServicePromise,
    private utils: Utils
  ) { }

  getUsersWithPopularPosts(commentThreshold: number): Promise<any[]> {
    const usersPromise = this.dataService.getUsers();
    const postsPromise = this.dataService.getPosts();
    const commentsPromise = this.dataService.getComments();

    return Promise.all([usersPromise, postsPromise, commentsPromise])
      .then(([users, posts, comments]) => {
        this.utils.assignPostsToUsers(users, posts);
        this.utils.assignPopularFlagToUsers(users, comments, commentThreshold);

        return users;
      })
      .then(users => this.utils.filterPopularUsers(users));
  }

}
