$(document).ready(function () {


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
                        "url": "/api/offre-de-soumission/getAll"
                    },
                    "columns": [
                        { "data": "nom" },
                        { "data": "offre" },
                        {
                            "data": "date",
                            "render": function (data, type, row) {
                                // Format the date using a library like Moment.js
                                var formattedDate = moment(data).format("DD/MM/YYYY");
                                return formattedDate;
                            }
                        },
                        { "data": "description" },
                        {
                            "data": null,
                            "render": function (data, type, row) {
                                return '<button type="button" class="btn btn-info btn-sm modify-button">Modifier</button>';
                            }
                        },
                        {
                            "data": null,
                            "render": function (data, type, row) {
                                return '<button type="button" class="btn btn-danger btn-sm delete-button">Supprimer</button>';
                            }
                        },
                        {
                            "data": "id_retrait",
                            "render": function (data, type, row) {
                                return '<button type="button" id=' + data + ' class="btn btn-info btn-sm offre-button">Offre</button>';
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

    $.ajax({
        url: "/api/participant/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                response.forEach(function (participant) {
                    var displayedText = participant.code_participant + " - " + participant.nom;
                    options += '<option value="' + participant.code_participant + '">' + displayedText + '</option>';
                });
                $('#participant_select').html(options);
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
                $('#appel_select').html(options);
            }
        },
        error: function (error) {
            console.log(error);
            // Handle error
        }
    });

    $('#myTable tbody').on('click', '.modify-button', function () {
        var dataTable = $(this).closest('table').DataTable();
        var data = dataTable.row($(this).closest('tr')).data();
        
        $("#id_retrait").val(data.id_retrait);
        $("#appel_select").val(data.id_appof);
        $("#participant_select").val(data.participant);
        var date = moment(data.date).format("YYYY-MM-DD");
        $("#date_cr").val(date);
        $("#retrait_description").val(data.description);
    });

    $('#myTable tbody').on('click', '.delete-button', function () {
        var dataTable = $(this).closest('table').DataTable();
        var data = dataTable.row($(this).closest('tr')).data();
        var id = data.id_retrait;

        $.ajax({
            url: "/api/offre-de-soumission/delete/" + id,
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

    $('#myTable tbody').on('click', '.offre-button', function () {
        var id = $(this).attr('id');
        $.ajax({
            url: "/api/offre-de-soumission/getById/" + id,
            method: "GET",
            success: function (response) {
                var dataToSend = { retrait: id};
                localStorage.setItem("retraitData", JSON.stringify(dataToSend));
                window.location.href = "sous_offres.html";
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });

    $("#clear").click(function () {
        $("#id_retrait").val("0");
        $("#appel_select").val("");
        $("#participant_select").val("");
        $("#date_cr").val("");
        $("#retrait_description").val("");
    });


    $("#save_retrait").click(function () {
        var appel = $("#appel_select").val();
        var participant = $("#participant_select").val();
        var datecr = $("#date_cr").val();
        var description = $("#retrait_description").val();
        var id_retrait = $("#id_retrait").val();
        var url = "";
        var method = "";

        if (id_retrait == 0) {
            method = "POST";
            url = "/api/offre-de-soumission/create";
        } else {
            url = "/api/offre-de-soumission/update/" + id_retrait;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { description: description, date: datecr, participant: participant, id_appof: appel },
            success: function (response) {
                console.log(response);
                $("#id_retrait").val("0");
                $("#appel_select").val("");
                $("#participant_select").val("");
                $("#date_cr").val("");
                $("#retrait_description").val("");
                NioApp.DataTable.reload('.datatable-init-export');
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });

});