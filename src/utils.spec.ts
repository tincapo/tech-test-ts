import { Comment, Post, User } from './types';
import { Utils } from './utils';

describe('Utils', () => {

  let utils: Utils;
  let usersStub: User[];
  let postsStub: Post[];
  let commentsStub: Comment[];

  beforeEach(function () {
    utils = new Utils();
    usersStub = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      }
    ];
    postsStub = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body:
          'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 44,
        id: 3,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      }
    ];
    commentsStub = [
      {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
      },
      {
        postId: 33,
        id: 2,
        name: 'quo vero reiciendis velit similique earum',
        email: 'Jayne_Kuhic@sydney.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
      }
    ];
  });

  describe('assignPostsToUsers', () => {
    it('should assign posts to users', () => {
      utils.assignPostsToUsers(usersStub, postsStub);

      expect(usersStub[0].posts?.length).toBe(2);
      expect(usersStub[1].posts?.length).toBe(0);
    });
  });

  describe('assignPopularFlagToUsers', () => {
    it('should assign popular flag to users', () => {
      utils.assignPostsToUsers(usersStub, postsStub);
      utils.assignPopularFlagToUsers(usersStub, commentsStub, 1);

      expect(usersStub[0].popular).toBe(true);
      expect(usersStub[1].popular).toBe(false);
    });

    it('should throw if posts value is not populated on users', () => {
      try {
        utils.assignPopularFlagToUsers(usersStub, commentsStub);

        fail('should have failed!');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('filterPopularUsers', () => {
    it('should filter to popular users only', () => {
      utils.assignPostsToUsers(usersStub, postsStub);
      utils.assignPopularFlagToUsers(usersStub, commentsStub, 1);
      const filteredUsers = utils.filterPopularUsers(usersStub);

      expect(filteredUsers.length).toBe(1);
    });

    it('should throw if popular value is not populated on users', () => {
      try {
        utils.assignPopularFlagToUsers(usersStub, commentsStub);

        fail('should have failed!');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

});
