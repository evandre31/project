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
    return this.optional(element) || /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);//correction validation mail
};//correction validation mail

formRegister.validate({
    rules: {
        email: {
            required: true,
            email: true,
            function: {
                deleteErrorServer, //supprimer erreur du serveur (activer function)
                deleteErrorFoued, //supprimer erreur du serveur (activer function)
            },
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
            equalTo: '#id_password1',
            minlength: 6,
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
            equalTo: 'password nest pas le meme',
            minlength: 'au moins 6 chart pour conf pw',
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().children('div').children('div.cls_error'));
    },
});

const email_input = $("#id_email");

email_input.on('keyup input', function CheckEmail() { // check email
    const email_Ele = document.getElementById('id_email');
    const labelMsgEmail_ = document.createElement("label");
    labelMsgEmail_.id = 'id_labelMsgEmail';
    labelMsgEmail_.style.display = "none";
    email_Ele.parentNode.appendChild(labelMsgEmail_);
    const labelMsgEmail = $('#id_labelMsgEmail');
    labelMsgEmail.appendTo($('#id_email').parent().children('div').children('div.cls_error'));
    const form = $(this).closest("form");
    $.ajax({
        url: form.attr("data-validate-email-url"),
        data: form.serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.is_taken) {
                labelMsgEmail.text(data.error_message);
                labelMsgEmail.css("display", "block");
                email_input.addClass('is-invalid');
                email_input.removeClass('is-valid');
                deleteErrorJquery();
                deleteErrorServer();
            } else {
                labelMsgEmail.css("display", "none");
                email_input.addClass('is-valid');
                email_input.removeClass('is-invalid');
                deleteErrorFoued();
                deleteErrorJquery();
            }
        }
    });
});


function moveErrorServer() { //déplacer erreur du serveur
    let erreur = $('#labelerrorserver');
    let cible = erreur.parent().children('div').children('div.cls_error');
    erreur.appendTo(cible);
}//déplacer erreur du serveur

function deleteErrorServer() { //supprimer erreur du serveur
    $('#labelerrorserver').remove();
}//supprimer erreur du serveur

function deleteErrorJquery() { //supprimer erreur du Jquery
    $('#id_email-error').remove();
}//supprimer erreur du Jquery

function deleteErrorFoued() { //supprimer erreur du foued
    $('#id_message_email').remove();
}//supprimer erreur du foued