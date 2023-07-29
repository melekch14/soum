$(document).ready(function () {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
    }

    var table = $('#offre_soumission_table').DataTable({
        "ajax": {
            "url": "/api/offre-de-soumission/getAll"
        },
        "columns": [
            { "data": "participant" },
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

    // Load the lotissements for the dropdown list
    $.ajax({
        url: "/api/participant/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                response.forEach(function (participant) {
                    options += '<option value="' + participant.code_participant + '">' + participant.nom + '</option>';
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

    $('#offre_soumission_table tbody').on('click', '.modify-button', function () {
        var data = table.row($(this).parents('tr')).data();
        // Fill the input fields with the data from the clicked row

        $("#appel_select").val(data.id_appof);
        $("#participant_select").val(data.participant);
        $("#id_offre").val(data.id_retrait);
        var date = moment(data.date).format("YYYY-MM-DD");
        $("#date").val(date);
        $("#description").val(data.description);
    });

    $('#offre_soumission_table tbody').on('click', '.delete-button', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data.id_retrait;

        $.ajax({
            url: "/api/offre-de-soumission/delete/" + id,
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
        $("#appel_select").val("");
        $("#participant_select").val("");
        $("#id_offre").val("0");
        $("#date").val("");
        $("#description").val("");
    });

    $("#save_offre").click(function () {
        var appelId = $("#appel_select").val();
        var participantId = $("#participant_select").val();
        var id_retrait = $("#id_offre").val();
        var date = $("#date").val();
        var description = $("#description").val();


        var url = "";
        var method = "";

        if (id_retrait === "0") {
            method = "POST";
            url = "/api/offre-de-soumission/create";
        } else {
            url = "/api/offre-de-soumission/update/" + id_retrait;
            method = "PUT";
        }

        $.ajax({
            url: url,
            method: method,
            data: { description: description, date: date, participant: participantId, id_appof: appelId },
            success: function (response) {
                console.log(response);
                $("#appel_select").val("");
                $("#participant_select").val("");
                $("#id_offre").val("0");
                $("#date").val("");
                $("#description").val("");
                table.ajax.reload(null, false);
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    });
});
