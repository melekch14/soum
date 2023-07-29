$(document).ready(function() {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login.html';
    }

    $('#disconnectBtn').click(function() {
      $.ajax({
        url: '/api/auth/disconnect',
        method: 'POST',
        success: function(response) {
          console.log(response);
          localStorage.removeItem('token'); // Remove the token from local storage
          window.location.href = '/login.html';
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  });