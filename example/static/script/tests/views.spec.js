require('static/script/vendor/pagination.js');
require('static/script/app/app.js');

describe ("Views Tests", function(){

    var root, rootElement, get = Ember.get, set = Ember.set;

    beforeEach(function(){
        root = $('body').append('<div id="view-tests" />');
        rootElement = window.App.rootElement;
        window.App.rootElement = $("#view-tests");
    });

    afterEach(function() {
        Ember.run(function() {
            window.App.rootElement = rootElement;
            $("#view-tests").html('');
        });
    });

    it ("template will render given output", function(){
        var view = Ember.View.create({
            template: Ember.Handlebars.compile('bar')
        });
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$().text())).toEqual("bar");
    });

    it ("model property is output when view bound to content", function(){
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

    it ("model property is output when view bound", function(){
        var person = App.Person.createRecord({id: 2, username: 'foobar'});
        var view = Ember.View.create({
            template: Ember.Handlebars.compile('{{#each foo in controller}}{{foo.username}}{{/each}}')
        });
        var controller = Ember.ArrayController.create({
            content: []
        });
        get(controller, 'content').push(person);
        set(view, 'controller', controller);
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$().text())).toEqual("foobar");
    });

    it ("actual template will bind model property", function(){
        Ember.TEMPLATES['person'] = Ember.Handlebars.compile('{{username}}');
        var person = App.Person.createRecord({id: 3, username: 'foobar'});
        var view = Ember.View.create({
            template: Ember.TEMPLATES["person"]
        });
        var controller = Ember.ObjectController.create({
            content: null
        });
        set(controller, 'content', person);
        set(view, 'controller', controller);
        Ember.run(function() {
            view.appendTo("#view-tests");
        });
        expect(Ember.$.trim(view.$().text())).toEqual("foobar");
    });

});
