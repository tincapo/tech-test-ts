import { DataServiceObservable } from './observables/dataServiceObservable';
import { UserServiceObservable } from './observables/userServiceObservable';
import { DataServicePromise } from './promises/dataServicePromise';
import { UserServicePromise } from './promises/userServicePromise';
import { Utils } from './utils';

function main() {
    const utils = new Utils();
    const threshold = 10;

    const dso = new DataServiceObservable();
    const uso = new UserServiceObservable(dso, utils);
    uso.getUsersWithPopularPosts(threshold).subscribe((data) => {
        console.log(`Observable -> There are ${data.length} users with more than ${threshold} comments.`);
    });

    const dsp = new DataServicePromise();
    const usp = new UserServicePromise(dsp, utils);
    usp.getUsersWithPopularPosts(threshold).then(data => {
        console.log(`Promise -> There are ${data.length} users with more than ${threshold} comments.`);
    });
}

console.log('Starting...');
main();
