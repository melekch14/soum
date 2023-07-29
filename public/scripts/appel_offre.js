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
                        "url": "/api/appel-offre/getAll"
                    },
                    "columns": [
                        { "data": "nom" },
                        { "data": "num_appel" },
                        {
                            "data": "date_creation",
                            "render": function (data, type, row) {
                                // Format the date using a library like Moment.js
                                var formattedDate = moment(data).format("DD/MM/YYYY");
                                return formattedDate;
                            }
                        },
                        {
                            "data": "date_limite",
                            "render": function (data, type, row) {
                                // Format the date using a library like Moment.js
                                var formattedDate = moment(data).format("DD/MM/YYYY");
                                return formattedDate;
                            }
                        },
                        { "data": "username" },
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
                        },
                        {
                            "data": "id_appel",
                            "render": function (data, type, row) {
                                return '<button type="button" id=' + data + ' class="btn btn-info btn-sm detail-button">Detail</button>';
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
                extend: 'print',
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

        $("#id_appel_offre").val(data.id_appel);
        $("#nom_af").val(data.nom);
        $("#num_af").val(data.num_appel);
        var date_creation = moment(data.date_creation).format("YYYY-MM-DD");
        var date_limite = moment(data.date_limite).format("YYYY-MM-DD");
        $("#date_af").val(date_creation);
        $("#date_lim_af").val(date_limite);
    });

    $.ajax({
        url: "/api/lotissemnts/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                response.forEach(function (lotissement) {
                    options += '<option value="' + lotissement.id_lots + '">' + lotissement.nom + '</option>';
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

    function reloadTable(id) {
        $.ajax({
            url: "/api/appelLotissement/getByAppel/" + id,
            method: "GET",
            success: function (response) {
                var tbody = $("#myTable2 tbody");
                tbody.empty();
                $.each(response.data, function (index, aol) {
                    var row = "<tr>" +
                        "<td>" + aol.offre + "</td>" +
                        "<td>" + aol.lotissement + "</td>" +
                        "</tr>";
                    tbody.append(row);
                });
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    }

    $('#myTable tbody').on('click', '.detail-button', function () {
        var id = $(this).attr('id');
        $.ajax({
            url: "/api/appel-offre/getById/" + id,
            method: "GET",
            success: function (response) {
                $("#appel_name").html(response.nom);
                $("#current_appel_id").val(response.id_appel);
                $('#card-al').removeClass('d-sm-none');
                reloadTable(id);
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });

    $("#add_appel_lotissement").click(function () {
        var lotissement = $('#lotissement_select').val();
        var id_appel = $('#current_appel_id').val();

        $.ajax({
            url: "/api/appelLotissement/create",
            method: "POST",
            data: { id_appel: id_appel, lotissement: lotissement },
            success: function (response) {
                reloadTable(id_appel);
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });

    $('#myTable tbody').on('click', '.delete-button', function () {
        var dataTable = $(this).closest('table').DataTable();
        var data = dataTable.row($(this).closest('tr')).data();
        var id = data.id_appel;

        $.ajax({
            url: "/api/appel-offre/delete/" + id,
            method: "DELETE",
            success: function (response) {
                console.log(response);
                NioApp.DataTable.reload('.datatable-init-export');
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });

    $("#clear").click(function () {
        $("#id_appel_offre").val("0");
        $("#nom_af").val("");
        $("#num_af").val("");
        $("#date_af").val("");
        $("#date_lim_af").val("");
    });

    $("#save_appel_offre").click(function () {
        var idAppelOffre = $("#id_appel_offre").val();
        var nom_af = $("#nom_af").val();
        var num_af = $("#num_af").val();
        var date_af = $("#date_af").val();
        var date_lim_af = $("#date_lim_af").val();


        var url = "";
        var method = "";

        if (idAppelOffre === "0") {
            method = "POST";
            url = "/api/appel-offre/create";
        } else {
            url = "/api/appel-offre/update/" + idAppelOffre;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { nom: nom_af, num_appel: num_af, date_creation: date_af, date_limite: date_lim_af, id_resp: 1 },
            success: function (response) {
                console.log(response);
                $("#id_appel_offre").val("0");
                $("#nom_af").val("");
                $("#num_af").val("");
                $("#date_af").val("");
                $("#date_lim_af").val("");
                NioApp.DataTable.reload('.datatable-init-export');
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });
});
