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
                        "url": "/api/lot/get-All"
                    },
                    "columns": [
                        { "data": "code_lot" },
                        { "data": "lotiss" },
                        { "data": "surface" },
                        { "data": "vocation" },
                        { "data": "cuf" },
                        { "data": "cos" },
                        { "data": "hauteur" },
                        { "data": "nb_niveau" },
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

    // Load the lotissements for the dropdown list
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
        url: "/api/vocation/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                response.forEach(function (vocation) {
                    options += '<option value="' + vocation.code_vocation + '">' + vocation.label + '</option>';
                });
                $('#vocation_select').html(options);
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
        
        $("#lotissement_select").val(data.lotissement);
        $("#cos").val(data.cos);
        $("#cuf").val(data.cuf);
        $("#hauteur").val(data.hauteur);
        $("#surface").val(data.surface);
        $("#nb_niveau").val(data.nb_niveau);
        $("#vocation_select").val(data.vocation);
        $("#lot_code").val(data.code_lot);
        $("#code_lot").val(data.code_lot);
    });

    $('#myTable tbody').on('click', '.delete-button', function () {
        var dataTable = $(this).closest('table').DataTable();
        var data = dataTable.row($(this).closest('tr')).data();
        var id = data.code_lot;

        $.ajax({
            url: "/api/lot/delete/" + id,
            method: "DELETE",
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
        $("#code_lot").val("");
        $("#lotissement_select").val("");
        $("#cuf").val("");
        $("#cos").val("");
        $("#surface").val("");
        $("#hauteur").val("");
        $("#vocation_select").val("");
        $("#nb_niveau").val("");
        $("#lot_code").val("0");
    });

    $("#save_lot").click(function () {
        var code_lot = $("#code_lot").val();
        var lotissementId = $("#lotissement_select").val();
        var cuf = $("#cuf").val();
        var cos = $("#cos").val();
        var idLot = $("#lot_code").val();
        var surface = $("#surface").val();
        var vocation = $("#vocation_select").val();
        var hauteur = $("#hauteur").val();
        var nb_niveau = $("#nb_niveau").val();
        var url = "";
        var method = "";

        if (idLot === "0") {
            method = "POST";
            url = "/api/lot/create";
        } else {
            url = "/api/lot/update/" + idLot;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { code_lot: code_lot, surface: surface, cuf: cuf, cos: cos, hauteur: hauteur, nb_niveau: nb_niveau, lotissement: lotissementId, vocation: vocation },
            success: function (response) {
                console.log(response);
                $("#code_lot").val("");
                $("#lotissement_select").val("");
                $("#cuf").val("");
                $("#cos").val("");
                $("#surface").val("");
                $("#hauteur").val("");
                $("#vocation_select").val("");
                $("#nb_niveau").val("");
                $("#lot_code").val("0");
                NioApp.DataTable.reload('.datatable-init-export');
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });
});
