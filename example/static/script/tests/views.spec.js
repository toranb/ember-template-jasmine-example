require('static/script/vendor/pagination.js');
require('static/script/app/app.js');

describe ("Views Tests", function(){

    var get = Ember.get, set = Ember.set;

    it ("template will render given output", function(){
        var view = Ember.View.create({
            template: Ember.Handlebars.compile('bar')
        });
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$().text())).toEqual("bar");
    });

    it ("the username property is bound to the handlebars template", function(){
        var person = App.Person.createRecord({id: 1, username: 'foobar'});
        var view = Ember.View.create({
            template: Ember.Handlebars.compile('{{username}}')
        });
        var controller = Ember.ObjectController.create({
            content: []
        });
        set(controller, 'content', person);
        set(view, 'controller', controller);
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$().text())).toEqual("foobar");
    });

    it ("each model is bound to the handlebars template", function(){
        var first = App.Person.createRecord({id: 2, username: 'first'});
        var last = App.Person.createRecord({id: 3, username: 'last'});
        var view = Ember.View.create({
            template: Ember.TEMPLATES["_peopleTable"]
        });
        var controller = App.PersonController.create({
            content: []
        });
        get(controller, 'content').push(first);
        get(controller, 'content').push(last);
        set(view, 'controller', controller);
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$('.ember-text-field').eq(0).val())).toEqual("first");
        expect(Ember.$.trim(view.$('.ember-text-field').eq(1).val())).toEqual("last");
        expect(Ember.$.trim(view.$('.person_id').eq(0).text())).toEqual("2");
        expect(Ember.$.trim(view.$('.person_id').eq(1).text())).toEqual("3");
    });

});
