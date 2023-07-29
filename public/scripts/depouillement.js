$(document).ready(function () {

    $.ajax({
        url: "/api/appel-offre/getAll",
        method: "GET",
        success: function (response) {
            response = response.data
            if (response && response.length > 0) {
                var options = '';
                options += '<option value="0">Sélectionner appel d offre</option>';
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


    $("#display_dep").on("click", function () {
        var appel = $('#appel_select').val();
        if (appel != 0) {
            displayAllData(appel)
        }
    });

    function displayAllData(id){
        $.ajax({
            url: "/api/lot/getByAppel/" + id,
            method: "GET",
            success: function (response) {
                const lotNames = response.data.map(item => item.code_lot);
                const surfaces = response.data.map(item => item.surface);
                const vocations = response.data.map(item => item.vocation);
    
                $.ajax({
                    url: "/data/"+id,
                    method: "GET",
                    success: function (response1) {
    
                        // Extracting "data" and "lotNames" from the parsed JSON
                        const data = response1.data;
                        data.sort(function (a, b) {
                            return a.id_offre - b.id_offre;
                        });
    
    
    
                        generateTable(data, lotNames, surfaces, vocations)
                    },
                    error: function (error) {
                        console.log(error);
                        // Handle error
                    }
                });
            },
            error: function (error) {
                console.log(error);
                // Handle error
            }
        });
    }

    // Function to generate the table dynamically
    function generateTable(data, lotNames, surfaces, vocations) {
        var table = $('#dataTable');
        table.html("");
        table.html("<tr><th colspan='3' style='border: none; background-color: white;'></th></tr>"+
        "<tr><th colspan='3' style='border: none; background-color: white;'></th></tr>"+
        "<tr><th colspan='3' style='border: none; background-color: white;'></th></tr>");
        var headerRow = table.find('tr:first');
        var secondRow = table.find('tr').eq(1);
        var thirdRow = table.find('tr').eq(2);

        // Generate header cells for lot names
        $.each(lotNames, function (index, lotName) {
            headerRow.append('<th colspan="3">' + lotName + '</th>');
        });

        $.each(surfaces, function (index, surf) {
            secondRow.append('<th colspan="3">' + surf + '</th>');
        });

        $.each(vocations, function (index, voc) {
            thirdRow.append('<th colspan="3">' + voc + '</th>');
        });

        // Generate header cells for main table
        var mainHeaderRow = '<tr>' +
            '<th>N° Offre</th>' +
            '<th></th>' +
            '<th>Participant</th>';

        $.each(lotNames, function (index, lotName) {
            mainHeaderRow += '<th>Principale</th><th>Op 1</th><th>Op 2</th>';
        });

        mainHeaderRow += '</tr>';
        table.append(mainHeaderRow);

        // Generate table rows with data
        $.each(data, function (index, sousOffre) {
            var row = '<tr>' +
                '<td>' + sousOffre.id_offre + '</td>' +
                '<td>' + sousOffre.id_sous_offre + '</td>' +
                '<td>' + sousOffre.participant + '</td>';

            // Generate cells for each lot's data
            $.each(lotNames, function (index, lotName) {
                var lotData = sousOffre.lots[lotName];
                if (lotData) {
                    row += '<td>' + lotData.lot_principal + '</td>' +
                        '<td>' + lotData.lot_option1 + '</td>' +
                        '<td>' + lotData.lot_option2 + '</td>';
                } else {
                    row += '<td></td><td></td><td></td>';
                }
            });

            row += '</tr>';
            table.append(row);
        });
    }


});