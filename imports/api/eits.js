import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Eits = new Mongo.Collection('eits');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('eits', function tasksPublication() {
      return Eits.find();
    });
  }

Meteor.methods({
    'eits.insert'(name, age, country) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Eits.insert({
            name,
            age,
            country,
            createdAt: new Date(),
            owner: this.userId,           // _id of logged in user
            username: Meteor.users.findOne(this.userId).username,  // username of logged in user
        });
    },
    'eits.remove'(eitId) {
        const eit = Eits.findOne(eitId);
        if (eit.owner !== this.userId) {
                throw new Meteor.Error('not-authorized');
              }
            Eits.remove(eitId);
    
        },
    'eits.setChecked'(eitId, setChecked){
                    Eits.update(eitId, {
                        $set: { checked: setChecked },
                    });

                },
            
    'eits.deleteSelected'(){
        const eit = Eits.findOne(eitId);
        if (eit.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
              }
        const checkedEits = Eits.find({checked: true}).fetch();
                checkedEits.map((eit) => Eits.remove(eit._id))
        
        
            },
    'eits.edit'(eitId, newData){
        const eit = Eits.findOne(eitId);
        if (eit.owner !== this.userId) {
                throw new Meteor.Error('not-authorized');
              }
        Eits.update(eitId,{
                    $set: {
                    name: newData.name,
                age: newData.age,
                country: newData.country,
                updatedAt: new Date(),
                owner: this.userId,           // _id of logged in user
            username: Meteor.users.findOne(this.userId).username,  // username of logged in user
            
            }
        }

        )
        console.log(eitId)
    }

})