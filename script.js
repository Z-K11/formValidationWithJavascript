const form = document.querySelector('form');
const email = document.querySelector('#mail');
const country = document.querySelector('#country');
const postal = document.querySelector('#postalCode');
const password = document.querySelector('#password-1');
const confirmPassword = document.querySelector('#password-2');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const countryRegex = /^[a-zA-z]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const postalConstraints = 
{
    pk : ["^(PK-)?\\d{5}$",
        "Pkistani postal codes must have 5 digits e.g 12345 or PK-12345",
    ],
    fr : ["^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",]
    ,
    usa :["^\\d{5}(?:-\\d{4})",
        "American postal codes must have 5 digits and followed by option 4 digits 12345-1234",
    ],
};
function checkPostalValidity(constraints)
{
    const cr = country.value;
    const constraint = new RegExp(constraints[cr][0],"");
    if(constraint.test(postal.value))
    {
        postal.setCustomValidity("");
    }
    else
    {
        postal.setCustomValidity(constraints[cr][1]);
    }
}
form.addEventListener('input',event=>
{
    const target = event.target.id;
    switch (target) {
        case "mail":
            if(emailRegex.test(email.value))
            {
                email.setCustomValidity("");
            }
            else
            {
                email.setCustomValidity("Email needs to follow the format something@example.com");
            }
            email.reportValidity();
            break;
        case "postalCode":
            checkPostalValidity(postalConstraints);
            postal.reportValidity();
            break;
        case "password-1":
            if(strongPasswordRegex.test(password.value))
            {
                password.setCustomValidity("");
            }
            else
            {
                password.setCustomValidity("Password should contain 1 digit,1 special character,1 lowercase and uppercase letter and min-length is 8 ");

            }
            password.reportValidity();
            break;
        case "password-2":
            if(confirmPassword.value!==password.value)
            {
                confirmPassword.setCustomValidity("Passwords don't match");
            }
            else
            {
                confirmPassword.setCustomValidity("");
            }
            confirmPassword.reportValidity();
            break;
        default:
            break;
    }
}
);
form.addEventListener('submit', event => {
    if (emailRegex.test(email.value)) {
        email.setCustomValidity("");
    } else {
        email.setCustomValidity("Email needs to follow the format something@example.com");
    }

    if (countryRegex.test(country.value)) {
        country.setCustomValidity("");
    } else {
        country.setCustomValidity("Country must contain letters only");
    }

    checkPostalValidity(postalConstraints);

    if (strongPasswordRegex.test(password.value)) {
        password.setCustomValidity("");
    } else {
        password.setCustomValidity("Password should contain 1 digit, 1 special character, 1 lowercase and uppercase letter and min-length is 8");
    }

    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
    } else {
        confirmPassword.setCustomValidity("");
    }

    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
    }
});