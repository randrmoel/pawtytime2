

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});

$(document).ready(function(){
  function normalize(phone) {
    phone = phone.replace(/[^\d]/g, "");
    if (phone.length == 10) {
        //reformat and return phone number
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    return null;
}


  $('.modal').modal();
  $('select').formSelect();


// sign up
  $("#signUpBtn").on("click", function() {
    event.preventDefault();
    
    const firstName = $("#first_name").val().trim();
    const lastName = $("#last_name").val().trim();
    var email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const address1 = $("#address1").val().trim();
    const address2 = $("#address2").val().trim();
    const city = $("#city").val().trim();
    const state = $("#state").val().trim();
    const zipCode = $("#zipCode").val().trim();
    const phoneNumber = normalize($("#phoneNumber").val().trim());
    const actorType = $("#userType input[name='actorType']:checked").val() === "true" ? true : false;
    const phoneType = $("#phoneType input[name='phoneType']:checked").val();
    const newUser = {
      email: email,
      password: password,
      actorType: actorType,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      st: state,
      phone: phoneNumber,
      phoneType: phoneType,
      zip5:zipCode,
      lat: 0,
      lng: 0
    }
    console.log(newUser);
    
    
    $.ajax({
      url: "api/signup",
      type: "POST",
      data: newUser
     }).then(
      function(){
      
      
     })
  })

  $("#loginBtn").on("click", event => {
    event.preventDefault();
    

    const emailInput = $("#email-input");
    const passwordInput = $("#password-input");

    const userInfo ={
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
    };

    if (!userInfo.email || !userInfo.password) {
      return;
    }

    userLogin(userInfo.email, userInfo.password);
    emailInput.val("");
    passwordInput.val("");
    });

    function userLogin(email, password){
    $.ajax({
      url: "api/login",
      type: "POST",
      data: {
        email: email,
        password:password
      }
    }) .then(function() {
      window.location.replace("/members");
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  

  })
