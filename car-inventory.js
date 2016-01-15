Cars = new Mongo.Collection('cars');

if (Meteor.isClient) {
    angular
        .module('carInventory', ['angular-meteor'])

        .service('appService', function () {
            var self = this;
            self.mongoTimeStamp = function (coll) {
                return _.extend(coll, {createdAt: new Date()});
            };

            self.lifoCars = function () {
                return Cars.find({}, {sort: {createdAt: -1}})
            };

            self.fifoCars = function (filteredBy) {
                filteredBy = filteredBy || {};
                return Cars.find(filteredBy, {sort: {createdAt: 1}})
            }
        })
        .controller('AppController', function (appService, $meteor) {
            var self = this;
            self.helloMeteor = 'Hey, Bob! This is your first MeteorJS app! Are you excited??!!';
            self.sorters  = [['newest', 'lifoCars'], ['oldest', 'fifoCars']];
            self.sortBy = self.sorters[0];
            self.cars = $meteor.collection(appService[self.sortBy[1]]);

            self.addCar = function (newCar) {
                console.log(newCar);
                self.cars.push(appService.mongoTimeStamp(newCar));
            }

        })
}


