import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

export const Eits = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(name, age, phone, country, area, fact){
        Eits.insert({
            name,
            age,
            phone,
            country,
            area,
            fact,
            createdAt: new Date(),
            // owner: Meteor.userId(),           // _id of logged in user
            // username: Meteor.user().username,  // username of logged in user
        })
    },
    'eits.remove'(eitId){
        Eits.remove(eitId);

    },
    'eits.setChecked'(eitId, setChecked){
        Eits.update(eitId, {
            $set: {checked: setChecked},
        });

    },

    'eits.deleteSelected'(){
        const checkedEits = Eits.find({checked:true}).fetch();
        checkedEits.map((eit) => Eits.remove(eit._id))


    },
    'eits.edit'(eitId, newData){
        Eits.update(eitId,{
            $set: {
                name: newData.name,
                age: newData.age,
                phone: newData.phone,
                country: newData.country,
                area: newData.area,
                fact: newData.fact,
                updatedAt: new Date()

            }
        }

        )
        console.log(eitId)
    }

})