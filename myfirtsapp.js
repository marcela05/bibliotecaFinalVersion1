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
      return ['M', 'F']
    },
  });

  Template.templateB.helpers({

    name: function (){
        return Session.get('name');
    },

    email: function (){
        return Session.get('email');
    },

    comment: function (){
        return Session.get('comment');
    },

    genero: function (){
        return Session.get('gen');
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
            
            console.log("Name: ", name);
            console.log("Comment: ", comment);
            console.log("Gender: ", gender);
            console.log("Email: ", email);

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
