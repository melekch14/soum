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

    $("#dataContainer").hide();

    $("#display_syn").on("click", function () {
        var appel = $('#appel_select').val();
        if (appel != 0) {
            DisplayResume(appel);
            $("#dataContainer").show();
        }
    });
    
    function DisplayResume(id){
        $.ajax({
            url: "/api/lot/getByAppel/" + id,
            method: "GET",
            success: function (response) {
              const data = response.data;
              const allData = {};
      
              const allLots = data.map(item => item.code_lot);
      
              function fetchAndStoreData(lotIndex) {
                if (lotIndex >= allLots.length) {
                  // All lots have been processed, display or use allData as needed
                  displayDataInTable(allData);
                  return;
                }
      
                const lot = allLots[lotIndex];
                fetchData(lot, function (data, error) {
                  if (error) {
                    // Handle error, if any
                    $("#dataContainer").html("Error: " + error);
                  } else {
                    allData[lot] = data || []; // If data is not available, set it to an empty array
                    fetchAndStoreData(lotIndex + 1);
                  }
                });
              }
      
              fetchAndStoreData(0);
            },
            error: function (error) {
              console.log(error);
              // Handle error
            }
          });
    }

    function fetchData(lotCode, callback) {
      $.ajax({
        url: "/api/lot/getByLot/" + lotCode,
        type: "GET",
        dataType: "json",
        success: function (data) {
          callback(data);
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          callback(null, error);
        }
      });
    }

    function displayDataInTable(allData) {
      const tableBody = $("#lotDataTable tbody");
      tableBody.html("");
      for (const lotCode in allData) {
        if (allData.hasOwnProperty(lotCode)) {
          const lotData = allData[lotCode];
          if (lotData.length === 0) {
            // No data available for this lot, add a row with 0 values
            const row = $("<tr>");
            row.append($("<td>").text(lotCode));
            for (let i = 0; i < 9; i++) {
              row.append($("<td>").text("-"));
            }
            tableBody.append(row);
          } else {
            // Data available for this lot, add rows with fetched data
            for (const rowData of lotData) {
              const row = $("<tr>");
              row.append($("<td>").text(rowData.code_lot));
              row.append($("<td>").text(rowData.vocation));
              row.append($("<td>").text(rowData.surface));
              row.append($("<td>").text(rowData.max_sum));
              row.append($("<td>").text(rowData.min_sum));
              row.append($("<td>").text(rowData.avg_sum));
              row.append($("<td>").text(rowData.nb));
              row.append($("<td>").text(rowData.nom));
              row.append($("<td>").text(rowData.max_sum));
              row.append($("<td>").text(rowData.chiffre_affaire));
              tableBody.append(row);
            }
          }
        }
      }
    }

  });