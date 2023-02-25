const mongoose = require('mongoose');
const { connectDB, dropDB, dropCollections } = require('../src/setuptestdb');

const { UsersService } = require('../build/src/users/usersService');

let db;

beforeAll(async () => {
    db = await connectDB();
});

afterEach(async () => {
    await dropCollections();
});

afterAll(async () => {
    db.connection.close()
});

describe('User test', () => {
    it('should create a user item successfully', async () => {
        const username = 'shri';
        const user = await new UsersService().create({
            'username': username,
            'password': 'pass'
          })

        expect(user.username).toEqual(username)
    })

    it('should not create a user item if username exists', async () => {
        const username = 'shri';
        const user = await new UsersService().create({
            'username': username,
            'password': 'pass'
          })

        try {
            await new UsersService().create({
                'username': username,
                'password': 'pass'
              })
        } catch(error){
            expect(error.message).toEqual('USERNAME_NOT_AVAILABLE')
        }
        expect(user.username).toEqual(username)
    })

    it('should return error when retriving non existant user', async () => {
        try {
            await new UsersService().get('nouser')
        } catch(error){
            expect(error.message).toEqual('NO_USER_FOUND')
        }
    })

    it('should valdate user for correct password', async () => {
        const payload = {
            'username': 'username',
            'password': 'pass'
          };
        await new UsersService().create(payload)

        const user = await new UsersService().validateUser(payload)
        expect(user.username).toEqual(payload.username)

    })

    it('should return error for incorrect password', async () => {
        
        await new UsersService().create({
            'username': 'username',
            'password': 'pass'
          })

        try {
         await new UsersService().validateUser({
            'username': 'username',
            'password': 'badpass'
          })
        } catch(error){
            expect(error.message).toEqual('USERNAME_PASSWORD_MISMATCH')
        }

    })
})