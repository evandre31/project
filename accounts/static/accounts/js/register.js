const username_ele = $("#id_username"); //username input
const form = $("#id_form_register").closest("form"); //cible form
const error_msg = $('#id_error'); //small in form.html
const username_val = username_ele.val();


// username_ele.on('keyup input', function () {
//     checkUsername();
// });
//
// function checkUsername() {
//     username_ele.removeClass('is-valid is-invalid');
//     const username = username_ele.val();
//     $.ajax({
//         url: form.attr("data-validate-username-url"),
//         data: form.serialize(),
//         dataType: 'json',
//         success: function (data) {
//             if (data["is_taken"]) {
//                 error_msg.text(data["error_message"]);
//                 error_msg.css("display", "block");
//                 username_ele.addClass('is-invalid');
//                 username_ele.removeClass('is-valid');
//             } else {
//                 error_msg.css("display", "none");
//                 username_ele.addClass('is-valid');
//                 username_ele.removeClass('is-invalid');
//             }
//         }
//     });
// }


const spanValUserele = '<span style="color: #de434a" id="id_spanValUser"></span>';
username_ele.after(spanValUserele);
const spanValUser = $('#id_spanValUser');
username_ele.keyup(function () {
    if (validateUsername()) {
        username_ele.css("border", "2px solid green");
        spanValUser.html("<p class='text-success'>username cava</p>");
    } else {
        username_ele.css("border", "2px solid red");
        spanValUser.html("<p class='text-danger'>username trop court</p>");
    }
});

function validateUsername() {
    return username_val.length > 3;
}