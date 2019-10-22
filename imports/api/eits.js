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
            createdAt: new Date()
        })
    },
    'eits.remove'(eitId){
        Eits.remove(eitId);

    },
    'eits.setChecked'(eitId, setChecked){
        Eits.update(eitId, {checked: setChecked});

    }

})