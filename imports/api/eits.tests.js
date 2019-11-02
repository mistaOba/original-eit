/* eslint-env mocha */
import {Meteor} from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Accounts } from 'meteor/accounts-base';
import { Eits } from './eits.js';

if (Meteor.isServer){
  describe ('Eits', () => {
    describe ('methods', () =>{
      const username = 'hafeez';
      let eitId, userId;

      before(()=>{
        //create user if not already created.
        const user = Meteor.users.findOne({username: username});
        if (!user){
          userId = Accounts.createUser({
            'username': username,
            'email': 'a@a.com',
            'password': '12345678',
          });
        } else {
          userId = user._id;
        }
      });
      
      beforeEach(() =>{
        Eits.remove({});
        eitId = Eits.insert({
          name: 'test name',
          age: 12,
          country: 'Kenya',
          createdAt: new Date(),
          owner: userId,
          username: 'hafeez',
        });
      });

      //View
      it('can view EITs', () => {
      const userId = Random.id()
      Eits.insert({
        name: 'test name 2',
        age: 12,
        country: 'Kenya',
        createdAt: new Date(),
        owner: userId,
        username: 'hafeez'
      })
      const invocation = { userId }
      const TasksPublication = Meteor.server.publish_handlers.eits
      assert.strictEqual(TasksPublication.apply(invocation).count(), 2)
    })
      //insert
      it('can insert EIT', () => {
        const name = 'Abdul';
        const age = 21;
        const country = 'Nigeria';
        const insert = Meteor.server.method_handlers['eits.insert'];
        const invocation = { userId };
        insert.apply(invocation, [name, age, country]);
        assert.equal(Eits.find().count(), 2);
  });

      //Cannot insert if not logged in
      it('cannot insert EIT if not logged in', () => {
        const name = 'Lawrence';
        const age = 21;
        const country = 'Nigeria';
        const insert = Meteor.server.method_handlers['eits.insert']
        //No userId passed into fake method invocation
        const invocation = {};
        assert.throws(() => {
            insert.apply(invocation, [name, age, country]);
        }, Meteor.Error, '[not-authorized]');

        assert.equal(Eits.find().count(), 1)
      });

      //Can delete own eit
      it ('can delete own EIT', () => {
        // Find the internal implementation of the task method so we can
       // test it in isolation
       const deleteTask = Meteor.server.method_handlers['eits.remove'];
       const invocation = { userId };
       deleteTask.apply(invocation, [eitId]);
       assert.equal(Eits.find().count(), 0);
      });

      it("cannot delete someone else's EIT", () =>{
        //Set task to Private
        Eits.update(eitId, {$set: { private: true} })
        //Generate a random ID, representing a different users
        const userId = Random.id()
        const deleteTask = Meteor.server.method_handlers['eits.remove']
        const invocation = {userId}
        assert.throws(() => deleteTask.apply(invocation, [eitId]),
          Meteor.Error, "[not-authorized]")
        assert.strictEqual(Eits.find().count(), 1)
      });

      it ('cannot delete EIT if not logged in', () => {
        // Find the internal implementation of the task method so we can
       // test it in isolation
       const deleteTask = Meteor.server.method_handlers['eits.remove'];
       const invocation = {};
       assert.throws(() => deleteTask.apply(invocation, [eitId]),
          Meteor.Error, "[not-authorized]")
       assert.equal(Eits.find().count(), 1);
      });

        //Edit
      it ('can edit EIT', () => {
        const name = 'Lawna';
        const age = 25;
        const country = 'Liberia';
        const owner = userId;
        const update = Meteor.server.method_handlers['eits.edit'];
        const invocation = { userId };
        update.apply(invocation, [eitId, name, age, country, owner]);
        assert.equal(Eits.find().count(), 1);
      });

      it ('cannot edit EIT if not logged in', () => {
        const name = 'Lawna';
        const age = 25;
        const country = 'Liberia';
        const owner = userId;
        const update = Meteor.server.method_handlers['eits.edit'];
        const invocation = {};
        assert.throws(() =>  update.apply(invocation, [eitId, name, age, country, owner]),
          Meteor.Error, '[not-authorized]')
        assert.equal(Eits.find().count(), 1);
      });

      it ("cannot edit someone else's EIT", () => {
        Eits.update(eitId, {$set: { private: true} })
        //Generate a random ID, representing a different users
        const userId = Random.id()
        const name = 'Lawna';
        const age = 25;
        const country = 'Liberia';
        const owner = userId;
        const update = Meteor.server.method_handlers['eits.edit'];
        const invocation = {userId};
        assert.throws(() => update.apply(invocation, [eitId, owner]),
          Meteor.Error, "[not-authorized]")
        assert.equal(Eits.find().count(), 1);
      })
      
    });
  })
}
