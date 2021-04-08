import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../utils';
import { DataServiceObservable } from './dataServiceObservable';

export class UserServiceObservable {

    constructor(
        private dataService: DataServiceObservable,
        private utils: Utils
    ) { }

    getUsersWithPopularPosts(commentThreshold: number): Observable<any[]> {
        let users$ = this.dataService.getUsers();
        let posts$ = this.dataService.getPosts();
        let comments$ = this.dataService.getComments();

        const combinedResult = combineLatest([users$, posts$, comments$])
            .pipe(map(([users, posts, comments]) => {
                this.utils.assignPostsToUsers(users, posts);
                this.utils.assignPopularFlagToUsers(users, comments, commentThreshold);

                return this.utils.filterPopularUsers(users);
            }));

        return combinedResult;
    }

}
