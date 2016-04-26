if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.rendered = function(){
    Session.set('name', undefined);
    Session.set('email', undefined);
    Session.set('comment', undefined);
    Session.set('gender', undefined);
  };

  Template.templateA.helpers({
    gender: function () {
        // items = [
        //     {value: 'F', selected: true},
        //     {value: 'M', selected: false}
        // ];
        items = ['F', 'M'];
        return items;
    },

    userName: function(){
        return Session.get('name');
    },

    userEmail: function(){
        return Session.get('email');
    },

    userComment: function(){
        return Session.get('comment');
    },

    updateUser: function () {
        return Session.get('update');
    }
    // userName: function(){
    //     return Session.set('gender', this.name);
    // },

  });

  Template.templateB.helpers({
    users: function () {
        return Users.find().fetch();
    }
  });

  Template.templateB.events({
    'click .delete': function (){
        Users.remove(this._id);
    },

    'click .user': function (){
        console.log("User: ", this);
        Session.set('name', this.name);
        Session.set('comment', this.comment);
        Session.set('email', this.email);
        Session.set('gender', this.gender);
        Session.set('update', this._id);


        //Users.update({_id: this._id}, newUser);
        //Users.update({_id: this._id}, {$set: {name: 'Javier'}});

    }
  });

  Template.templateA.events({

    'submit #form-a': function(event, template){
        event.preventDefault();        
        
        var name = event.target.name.value;
        var comment = event.target.comment.value;
        var email = event.target.email.value;
        var gender = Session.get('gender');

        if (gender === undefined) {
            alert("select your gender");
        } else {

            Session.set('name', name);
            Session.set('comment', comment);
            Session.set('email', email);
            Session.set('gen', gender);
            
            var user = {
                name: name,
                email: email,
                comment: comment,
                gender: gender
            };

            var userId = Session.get('update');
            if (userId != undefined){
                Users.update({_id: userId}, user);
            } else {
                Users.insert(user);
            }

            event.target.name.value = '';
            event.target.comment.value = '';
            event.target.email.value = '';
        }
    },

    'change select': function(evt) {
        evt.preventDefault();
        var newValue = $(evt.target).val();

        Session.set('gender', newValue);

        console.log("value: ", newValue);
        if (newValue === 'F') {
            //alert('Es mujer');
        } else {
            
        }        
    },

    'blur #comment': function(event) {
        event.preventDefault();
        var _comment = $('[name="comment"]').val();
        console.log("blur comment", _comment);
    },

    'blur #name': function(event) {
        event.preventDefault();
        var _name = $('[name="search"]').val();
        console.log("blur name", _name);
    },

    'keyup #comment': function () {
        var text_max = 120;
        var text_length = $('#comment').val().length;
        var text_remaining = 120;
        if (text_remaining > 0) {
            text_remaining = text_max - text_length;
            $('#comment_feedback').html(text_remaining + 
                ' characters remaining...');        
        } 
    },

    'submit #form-b': function(event, template){
        event.preventDefault();
        //var _name = event.target.fupInput.value
        var _name = $('[name="fupInput"]').val();
        console.log("submit b: ", _name);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
