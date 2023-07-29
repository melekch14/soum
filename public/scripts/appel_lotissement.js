$(document).ready(function () {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = '/login.html';
    }
  
    var table = $('#appel_lotissement_table').DataTable({
      "ajax": {
        "url": "/api/appelLotissement/getAll"
      },
      "columns": [
        { "data": "offre" },
        { "data": "lotissement" },
        {
          "data": null,
          "render": function (data, type, row) {
            return '<button type="button" class="btn btn-primary btn-sm modify-button">Modifier</button>';
          }
        },
        {
          "data": null,
          "render": function (data, type, row) {
            return '<button type="button" class="btn btn-danger btn-sm delete-button">Supprimer</button>';
          }
        }
      ],
      'paging': true,
      'lengthChange': true,
      'searching': true,
      'ordering': false,
      'info': true,
      'autoWidth': false,
      'responsive': true
    });

    $.ajax({
      url: "/api/lotissemnts/getAll",
      method: "GET",
      success: function (response) {
          response = response.data
          if (response && response.length > 0) {
              var options = '';
              response.forEach(function (lotissement) {
                  options += '<option value="' + lotissement.code_lotissement + '">' + lotissement.nom + '</option>';
              });
              $('#lotissement_select').html(options);
          }
      },
      error: function (error) {
          console.log(error);
          // Handle error
      }
  });

  $.ajax({
    url: "/api/appel-offre/getAll",
    method: "GET",
    success: function (response) {
        response = response.data
        if (response && response.length > 0) {
            var options = '';
            response.forEach(function (appel) {
                options += '<option value="' + appel.id_appel + '">' + appel.nom + '</option>';
            });
            $('#appel_offre_lotissment_select').html(options);
        }
    },
    error: function (error) {
        console.log(error);
        // Handle error
    }
});
  
    $('#appel_lotissement_table tbody').on('click', '.modify-button', function () {
      var data = table.row($(this).parents('tr')).data();
      // Fill the input fields with the data from the clicked row
      $("#appel_offre_lotissment_select").val(data.id_appel);
      $("#lotissement_select").val(data.lotissement);
      $("#id_appel_lotissement").val(data.id_appel_lotissement);
    });
  
    $('#appel_lotissement_table tbody').on('click', '.delete-button', function () {
      var data = table.row($(this).parents('tr')).data();
      var id = data.id_appel_lotissement;
  
      $.ajax({
        url: "/api/appelLotissement/delete/" + id,
        method: "delete",
        success: function (response) {
          console.log(response);
          table.ajax.reload(null, false);
        },
        error: function (error) {
          console.log(error);
          // Handle error
        }
      });
    });
  
    $("#clear").click(function () {
      $("#appel_offre_lotissment_select").val("");
      $("#lotissement_select").val("");
      $("#id_appel_lotissement").val("0");
    });
  
    $("#save_appel_lotissement").click(function () {
      var id_appel = $("#appel_offre_lotissment_select").val();
      var id_lotissement = $("#lotissement_select").val();
      var id_appel_lotissement = $("#id_appel_lotissement").val();
      var url = "";
      var method = "";
  
      if (id_appel_lotissement == 0) {
        method = "POST";
        url = "/api/appelLotissement/create";
      } else {
        url = "/api/appelLotissement/update/" + id_appel_lotissement;
        method = "PUT";
      }
  
      $.ajax({
        url: url,
        method: method,
        data: { id_appel: id_appel, lotissement: id_lotissement },
        success: function (response) {
          console.log(response);
          $("#appel_offre_lotissment_select").val("");
          $("#lotissement_select").val("");
          $("#id_appel_lotissement").val("0");
          table.ajax.reload(null, false);
        },
        error: function (error) {
          console.log(error);
          // Handle error
        }
      });
    });
  });
  