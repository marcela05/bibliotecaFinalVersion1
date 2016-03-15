if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    types: function () {
      return ['a', 'b', 'c', 'd']
    }

  });

  Template.body.events({
    // 'change select': function(evt) {
    //     event.preventDefault();
    //     var newValue = $(evt.target).val();
    //     console.log("value: ", newValue);
    //     if (newValue === 'List') {
    //         Session.set('fieldType', newValue);
    //     } else {
            
    //     }        
    // },

    // 'keyup #comment': function () {
    //     var text_max = 120;
    //     var text_length = $('#comment').val().length;
    //     var text_remaining = 120;
    //     if (text_remaining > 0) {
    //         text_remaining = text_max - text_length;
    //         $('#comment_feedback').html(text_remaining + ' characters remaining...');        
    //     } 
    // },

    // 'blur #comment': function(event) {
    //     console.log("blur comment");
    //     event.preventDefault();
    // },

    'submit #new-form': function(event, template){
        event.preventDefault();
        //var _name = event.target.fupInput.value
        var _name = $('[name="fupInput"]').val();
        console.log("submit: ", _name);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
