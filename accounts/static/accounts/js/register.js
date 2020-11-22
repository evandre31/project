// Input fields
const userName = document.getElementById('id_username');
const password = document.getElementById('id_password1');
const confirmPassword = document.getElementById('id_password2');
const email = document.getElementById('id_email');
// Form
const form = document.getElementById('id_form_register');
const form_j = $('#id_form_register');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';
const h2 = document.getElementById('h2');
// mes declarations
const dataUrlUsername = "data-validate-username-url";
const dataUrlEmail = "data-validate-email-url";


// Validators
function validateUserName() {
    // check if is empty
    if (checkIfEmpty(userName)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(userName)) return;
    // is username taken
    if (!CheckFieldInDb(userName, form_j, dataUrlUsername)) return;
    return true;
}

function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
    if (!CheckFieldInDb(email, form_j, dataUrlEmail)) return;
    return true;
}

function validatePassword() {
    // Empty check
    if (checkIfEmpty(password)) return;
    // Must of in certain length
    if (!meetLength(password, 8, 30)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    //   if (!containsCharacters(password, 4)) return;
    return true;
}

function validateConfirmPassword() {
    if (password.className !== 'form-control is-valid') {
        setInvalid(confirmPassword, 'Password must be valid');
        return;
    }
    // If they match
    if (password.value !== confirmPassword.value) {
        setInvalid(confirmPassword, 'Passwords must match');
        return;
    } else {
        setValid(confirmPassword);
    }
    return true;
}


// Utility functions
function CheckFieldInDb(field, form, dataUrl) {
    const username = field.value; //val de input qui va être envoyé au view
    $.ajax({
        url: form.attr(dataUrl),
        data: form.serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.is_taken) {
                // language=HTML
                var login =  `<a href="/accounts/login/">login</a>`;
                setInvalid(field, `${field.name} : "${field.value}" déja pris ${login}`);
            } else {
                setValid(field);
            }
        }
    });
}


function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}


function isEmpty(value) {
    return value === '';
}

function setInvalid(field, message) {
    field.className = 'form-control is-invalid';
    // field.nextElementSibling.innerHTML = message;
    field.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML = message;
}


function setValid(field) {
    field.className = 'form-control is-valid';
    field.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML = "";
    //field.nextElementSibling.style.color = green;
}


function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(
            field,
            `${field.name} must be at least ${minLength} characters long`
        );
        return false;
    } else {
        setInvalid(
            field,
            `${field.name} must be shorter than ${maxLength} characters`
        );
        return false;
    }
}

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
        case 1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            // letter and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one letter and one number'
            );
        case 3:
            // uppercase, lowercase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one uppercase, one lowercase letter and one number'
            );
        case 4:
            // uppercase, lowercase, number and special char
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one uppercase, one lowercase letter, one number and one special character'
            );
        case 5:
            // Email pattern
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must be a valid email address');
        default:
            return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}


function moveErrorServer(id) { //déplacer erreur du serveur
    const erreur = document.getElementById(id);
    const cible = erreur.parentElement.firstElementChild.firstElementChild.nextElementSibling;
    // console.log(erreur.textContent);
    // console.log(cible);
    cible.appendChild(erreur);
}//déplacer erreur du serveur


moveErrorServer('id_password2_labelerrorserver');
moveErrorServer('id_email_labelerrorserver');
moveErrorServer('id_username_labelerrorserver');
moveErrorServer('id_password1_labelerrorserver');
