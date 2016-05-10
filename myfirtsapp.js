if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.rendered = function(){
    Session.set('nombre', undefined);
    Session.set('ano', undefined);
    Session.set('autor', undefined);
    Session.set('lsbn', undefined);
    Session.set('estado', undefined);
  };
  Template.templateA.helpers({
    userNombre: function(){
        return Session.get('nombre');
    },

    userAno: function(){
        return Session.get('ano');
    },

    userAutor: function(){
        return Session.get('autor');
    },
    userLsbn: function(){
        return Session.get('lsbn');
    },
    userEstado: function () {
        return Session.get('estado');
    },

  });

  Template.templateB.helpers({
    users: function () {
        return Users.find().fetch();
    },
    libros: function () {
        return Libros.find().fetch();
    },
    userListarLibros: function () {
        return Session.get('listarLibro');
    },
    userListarEstudiantes: function () {
        return Session.get('listarEstudiante');
    },
  });

   Template.templateC.helpers({
    userNombre2: function(){
        return Session.get('nombre2');
    },

    userEdad: function(){
        return Session.get('edad');
    },

    userCodigo: function(){
        return Session.get('codigo');
    }
  });

    Template.templateD.helpers({

       updateEstudiante: function () {
        return Session.get('update');
    },
        updateLibro: function () {
        return Session.get('update2');
    }
    });

  Template.templateA.events({

    'submit #form-a': function(event, template){
        event.preventDefault();        
        
        var name = event.target.name.value;
        var ano = event.target.ano.value;
        var lsbn = event.target.lsbn.value;
        var autor = event.target.autor.value;
        var estado = Session.get('estado');

        if (estado === undefined) {
            alert("Selecciona algún estado");
        } else {
            Session.set('name', name);
            Session.set('ano', ano);
            Session.set('lsbn', lsbn);
            Session.set('autor', autor);
            Session.set('estado', estado);
            
            var user = {
                name: name,
                ano: ano,
                lsbn: lsbn,
                autor: autor,
                estado: estado
            };
             Users.insert(user);
            // var userId = Session.get('update');
            // if (userId != undefined){
            //     Users.update({_id: userId}, user);
            // } else {
               
            //     console.log("Este es el libro: ", user);

            // }

            event.target.name.value = '';
            event.target.autor.value = '';
        }
    },

    'change select': function(evt) {
        evt.preventDefault();
        var newValue = $(evt.target).val();

        Session.set('estado', newValue);

        console.log("El estado es: ", newValue);
        if (newValue === 'Disponible') {
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
        var _name = $('[name="name"]').val();
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
    Template.templateB.events({
    'click .delete': function (){
        Users.remove(this._id);
        Libros.remove(this._id)
    },

    'click .user': function (){
        console.log("User: ", this);
        Session.set('nombre', this.name);
        Session.set('ano', this.ano);
        Session.set('autor', this.autor);
        Session.set('lsbn', this.lsbn);
        Session.set('estado', this.estado);
        Session.set('update', this._id);
    },
    'click .libro': function (){
        console.log("Libro: ", this);
        Session.set('nombre2', this.name);
        Session.set('edad', this.edad);
        Session.set('codigo', this.codigo);
        Session.set('update2', this._id);
    },
    'click .listarLibro': function(event, template){
        event.preventDefault();
            Session.set('listarLibro', true);
            Session.set('listarEstudiante', false);
            console.log("submit lib bbbbbbb: ", Session.get('listarLibro'));
    },
    'click .listarEstudiante': function(event, template){
        event.preventDefault();
       Session.set('listarLibro', false);
        Session.set('listarEstudiante', true);
        console.log("submit est bbbbbbb: ", 2);
    },

  });
    Template.templateC.events({

    'submit #form-c': function(event, template){
        event.preventDefault();         
        var name = event.target.name.value;
        var edad = event.target.edad.value;
        var codigo = event.target.codigo.value;
        Session.set('nombre2', name);
        Session.set('edad', edad);
        Session.set('codigo', codigo);
            
            var libro = {
                name: name,
                edad: edad,
                codigo: codigo,
            };
        var libroId = Session.get('update');
            if (libroId != undefined){
                Libros.update({_id: libroId}, libro);
            } else {
                Libros.insert(libro);
                console.log("Este es el libro: ", libro);

            }
        console.log("Este es el estudiante: ", libro);
            event.target.name.value = '';
            event.target.edad.value = '';
    },
    });

    Template.templateD.events({

        'click .updateLibro': function(event, template){
            event.preventDefault();
            var userId = Session.get('update');
            console.log("Nuevooooo user", userId);
            console.log("name user", name);
            var name= document.forms["form-a"].elements[0].value;
            var ano = document.forms["form-a"].elements[1].value;
            var autor = document.forms["form-a"].elements[2].value;
            var lsbn = document.forms["form-a"].elements[3].value;
            var estado = Session.get('estado');

            var user = {
                name: name,
                ano: ano,
                lsbn: lsbn,
                autor: autor,
                estado: estado
            };
            if (userId != undefined){
                Users.update({_id: userId}, user);
                console.log("Nuevooooo user", user);
            }
        },      
        'click .updateEstudiante': function(event, template){
            event.preventDefault();
            var libroId = Session.get('update2');
            console.log("Nuevooooo id  est", libroId);
            var name= document.forms["form-c"].elements[0].value;
            var edad = document.forms["form-c"].elements[1].value;
            var codigo = document.forms["form-c"].elements[2].value;

            var libro = {
                name: name,
                edad: edad,
                codigo: codigo
            };
             if (libroId != undefined){
                Libros.update({_id: libroId}, libro);
                console.log("Nuevooooo libro", libro);
            }
        },
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
