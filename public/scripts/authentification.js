$(document).ready(function() {
  
  $('#submit').click(function() {

    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
      url: '/api/auth/login',
      method: 'POST',
      data: { username: username, password: password },
      success: function(response) {
        console.log(response);
        localStorage.setItem('token', response.token);
        // Handle successful login
        window.location.href = '/index.html'; // Redirect to the home page
      },
      error: function(error) {
        console.log(error);
        // Handle login error
      }
    });
  });
  
  });