import { Comment, Post, User } from "./types";

export class Utils {

  /**
   * Method that will assing posts to relevant users object.
   * 
   * @param users 
   * @param posts 
   */
  assignPostsToUsers(users: User[], posts: Post[]): void {
    for (const user of users) {
      user.posts = posts.filter(post => post.userId === user.id);
    }
  }

  /**
   * Method that will set popular flag on users object based on a given comment threshold.
   * Requires posts to be populated on users object.
   * 
   * @param users with posts alrady populated
   * @param comments 
   */
  assignPopularFlagToUsers(users: User[], comments: Comment[], commentThreshold: number = 10): void {
    if (users.some(user => user.posts === undefined)) {
      throw new Error('Some users `posts` value is undefined. `posts` value is required to be populated.');
    }

    for (const user of users) {
      user.popular = user.posts && user.posts.some(post => comments.filter(comment => comment.postId === post.id).length >= commentThreshold);
    }
  }

  /**
   * Method that will return flagged as popular users only.
   * 
   * @param users 
   * @returns 
   */
  filterPopularUsers(users: User[]): User[] {
    if (users.some(user => user.popular === undefined)) {
      throw new Error('Some users `popular` value is undefined. `popular` value is required to be populated.');
    }

    return users.filter(user => user.popular);
  }

}