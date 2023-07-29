$(document).ready(function () {
  // Retrieve the token from local storage
  var token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login.html';
  }


  function extend(obj, ext) {
    Object.keys(ext).forEach(function (key) {
      obj[key] = ext[key];
    });
    return obj;
  }

  NioApp.DataTable = function (elm, opt) {
    if ($(elm).exists()) {
      $(elm).each(function () {
        var auto_responsive = $(this).data('auto-responsive'),
          has_export = typeof opt.buttons !== 'undefined' && opt.buttons ? true : false;
        var export_title = $(this).data('export-title') ? $(this).data('export-title') : 'Export';
        var btn = has_export ? '<"dt-export-buttons d-flex align-center"<"dt-export-title d-none d-md-inline-block">B>' : '',
          btn_cls = has_export ? ' with-export' : '';
        var dom_normal = '<"row justify-between g-2' + btn_cls + '"<"col-7 col-sm-4 text-start"f><"col-5 col-sm-8 text-end"<"datatable-filter"<"d-flex justify-content-end g-2"' + btn + 'l>>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-start text-md-end"i>>';
        var dom_separate = '<"row justify-between g-2' + btn_cls + '"<"col-7 col-sm-4 text-start"f><"col-5 col-sm-8 text-end"<"datatable-filter"<"d-flex justify-content-end g-2"' + btn + 'l>>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-start text-md-end"i>>';
        var dom = $(this).hasClass('is-separate') ? dom_separate : dom_normal;
        var def = {
          responsive: true,
          autoWidth: false,
          "ajax": {
            "url": "/api/lotissemnts/getAll"
          },
          "columns": [
            { "data": "code_lotissement" },
            { "data": "nom" },
            { "data": "description" },
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
          dom: dom,
          language: {
            search: "",
            searchPlaceholder: "Type in to Search",
            lengthMenu: "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
            info: "_START_ -_END_ of _TOTAL_",
            infoEmpty: "0",
            infoFiltered: "( Total _MAX_  )",
            paginate: {
              "first": "First",
              "last": "Last",
              "next": "Next",
              "previous": "Prev"
            }
          }
        },
          attr = opt ? extend(def, opt) : def;
        attr = auto_responsive === false ? extend(attr, {
          responsive: false
        }) : attr;
        $(this).DataTable(attr);
        $('.dt-export-title').text(export_title);
      });
    }
  };

  NioApp.DataTable.init = function () {
    NioApp.DataTable('.datatable-init', {
      responsive: {
        details: true
      }
    });
    NioApp.DataTable('.datatable-init-export', {
      responsive: {
        details: true
      },
      buttons: [{
        extend: 'copy',
        exportOptions: {
          columns: [0, 1] // Include only the first and second columns in the export
        }
      },
      {
        extend: 'excel',
        exportOptions: {
          columns: [0, 1] // Include only the first and second columns in the export
        }
      },
      {
        extend: 'csv',
        exportOptions: {
          columns: [0, 1] // Include only the first and second columns in the export
        }
      },
      {
        extend: 'pdf',
        exportOptions: {
          columns: [0, 1] // Include only the first and second columns in the export
        }
      }]
    });
    NioApp.DataTable.reload = function (tableSelector) {
      var dataTable = $(tableSelector).DataTable();
      dataTable.ajax.reload();
    };
    $.fn.DataTable.ext.pager.numbers_length = 7;
  };



  NioApp.DataTable.init();


  $('#myTable tbody').on('click', '.modify-button', function () {
    var dataTable = $(this).closest('table').DataTable();
    var data = dataTable.row($(this).closest('tr')).data();
    // Fill the input fields with the data from the clicked row
    $("#lotissement_nom").val(data.nom);
    $("#lotissement_code").val(data.code_lotissement);
    $("#lotissement_description").val(data.description);
    $("#code_lotissement").val(data.code_lotissement);
  });


  $('#lotissement_table tbody').on('click', '.delete-button', function () {
    var dataTable = $(this).closest('table').DataTable();
    var data = dataTable.row($(this).closest('tr')).data();
    var id = data.code_lotissement;

    $.ajax({
      url: "/api/lotissemnts/delete/" + id,
      method: "delete",
      success: function (response) {
        console.log(response);
        NioApp.DataTable.reload('.datatable-init-export');
      },
      error: function (error) {
        console.log(error);
        // Handle login error
      }
    });
  });

  $("#clear").click(function () {
    $("#lotissement_nom").val("");
    $("#lotissement_code").val("");
    $("#lotissement_description").val("");
    $("#code_lotissement").val("0");
  });

  $("#save_lotissement").click(function () {

    var nom_lotissement = $("#lotissement_nom").val();
    var code_lotissement = $("#lotissement_code").val();
    var description_lotissement = $("#lotissement_description").val();

    var id_lots = $("#code_lotissement").val();
    var url = "";
    var method = "";
    if (id_lots == 0) {
      method = "POST";
      url = "/api/lotissemnts/create";
    } else {
      url = "/api/lotissemnts/update/" + id_lots;
      method = "PUT";
    }


    $.ajax({
      url: url,
      method: method,
      data: { code_lotissement: code_lotissement, nom: nom_lotissement, description: description_lotissement, location: "555sdqsd" },
      success: function (response) {
        console.log(response);
        $("#lotissement_nom").val("");
        $("#lotissement_code").val("");
        $("#lotissement_description").val("");
        $("#code_lotissement").val("0");
        NioApp.DataTable.reload('.datatable-init-export');
      },
      error: function (error) {
        console.log(error);
        // Handle login error
      }
    });

  });

});