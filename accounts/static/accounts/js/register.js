const formRegister = $("#id_form_register"); //cibler form
moveErrorServer(); //déplacer erreur du serveur (activer function)


jQuery.validator.setDefaults({
    debug: false,
    success: "is-valid",
    validClass: "is-valid",
    errorClass: "is-invalid",
});

/* // pour ajouter une méthode
$.validator.addMethod('pasDeSpace', function (value, element) {
    return value === '' || value.trim().length !== 0
}, "espace not autorisé");    */

// pour modifier une méthode existante
$.validator.methods.email = function (value, element) { //correction validation mail
    return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+[a-z]+/.test(value);//correction validation mail
};//correction validation mail

formRegister.validate({
    rules: {
        email: {
            required: true,
            email: true,
            function:deleteErrorServer, //supprimer erreur du serveur (activer function)
        },
        username: {
            required: true,
            minlength: 3,
            nowhitespace: true
        },
        password1: {
            required: true,
            minlength: 6,
        },
        password2: {
            required: true,
            equalTo: '#id_password1'
        }
    },
    messages: {
        email: {
            required: 'email bassif @',
            email: 'ha goulna email machi...',
        },
        username: {
            required: 'username bassif ',
            minlength: 'au moins 3 chart pour username',
            nowhitespace: "pas despace svp"
        },
        password1: {
            required: 'ha dir pw',
            minlength: 'au moins 6 chart pour pw',
        },
        password2: {
            required: 'entrer confirmation de password',
            equalTo: 'password nest pas le meme'
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().children('div').children('div.cls_error'));
    },
});

function moveErrorServer() { //déplacer erreur du serveur
    let erreur = $('#labelerrorserver');
    let cible = erreur.parent().children('div').children('div.cls_error');
    erreur.appendTo(cible);
}//déplacer erreur du serveur

function deleteErrorServer() { //supprimer erreur du serveur
    $('#labelerrorserver').remove();
}//supprimer erreur du serveur
