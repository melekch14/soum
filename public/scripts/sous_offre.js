$(document).ready(function () {
  // Retrieve the data from localStorage
  var dataReceived = localStorage.getItem("retraitData");
  var retraitid = "";
  if (dataReceived) {
    var data = JSON.parse(dataReceived);
    retraitid = data.retrait;
  }

  $("#add_offre").click(function () {
    var title = $("#offre_title").val();

    $.ajax({
      url: "/api/sous-offre/create/",
      method: "POST",
      data: { retrait: retraitid, titre: title },
      success: function (response) {
        displayAllOffre(retraitid);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  });

  $.ajax({
    url: "/api/lotissemnts/getByRetrait/" + retraitid,
    method: "GET",
    success: function (response) {
      response = response.data
      var options = '';
      if (response && response.length > 0) {
        options += '<option value="0">selectionner lotissement</option>';
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

  $("#add_soum").click(function () {
    var principal = $("#Principale").val();
    var option1 = $("#option1").val();
    var option2 = $("#option2").val();
    var id_sousoff = $("#id_sousoff").val();
    var lot = $('#lot_select').val();

    $.ajax({
      url: "/api/soumission/create/",
      method: "POST",
      data: { option1: option1, option2: option2, principal: principal, id_s_offre: id_sousoff, lot: lot },
      success: function (response) {
        getAllSoumissionsByOffre(id_sousoff);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });

  });

  $('#lotissement_select').on('change', function () {
    var idLotissement = $(this).val();

    if (idLotissement != 0) {
      $.ajax({
        url: "/api/lot/getByLotissement/" + idLotissement,
        method: "GET",
        success: function (response) {
          $('#lot_select').html("");
          response = response.data
          if (response && response.length > 0) {
            var options = '';
            response.forEach(function (lot) {
              options += '<option value="' + lot.code_lot + '">' + lot.code_lot + '</option>';
            });
            $('#lot_select').html(options);
          }
        },
        error: function (error) {
          console.log(error);
          // Handle error
        }
      });
    }
  });

  displayAllOffre(retraitid);

  function displayAllOffre(id) {
    $.ajax({
      url: "/api/sous-offre/getAllByRetrait/" + id,
      method: "GET",
      success: function (response) {
        console.log(response);
        populateTableBody(response);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  }

  // Function to create table row for each data item
  function createTableRow(order) {
    return `<tr class="tb-odr-item">
            <td class="tb-odr-info">
              <span class="tb-odr-id"><a href="html/invoice-details.html" style="color: black;">${order.titre}</a></span>
              <span class="amount" style="color: black;">${order.participant}</span>
            </td>
            <td class="tb-odr-amount">
              <span class="tb-odr-total">
                <span class="amount" style="color: black;">${order.appel}</span>
              </span>
            </td>
            <td class="tb-odr-action">
              <div class="tb-odr-btns d-none d-sm-inline">
                <a href="#" id="${order.id_soff}" class="btn btn-dim btn-sm btn-warning soumission-button">Soumissions</a>
              </div>
            </td>
          </tr>`;
  }

  function populateTableBody(data) {
    var tableBody = $('.tb-odr-body');
    tableBody.html("");
    for (var i = 0; i < data.length; i++) {
      var row = createTableRow(data[i]);
      tableBody.append(row);
    }
  }

  $("#all_offre tbody").on('click', '.soumission-button', function () {
    var id = $(this).attr('id');
    $("#id_sousoff").val(id);
    $("#all_soumissions").removeClass("d-sm-none");
    getAllSoumissionsByOffre(id);
  });

  function getAllSoumissionsByOffre(offre){
    $.ajax({
      url: "/api/soumission/getAllByOffre/" + offre,
      method: "GET",
      success: function (response) {
        console.log(response);
        populateTableSoumission(response);
      },
      error: function (error) {
        console.log(error);
        // Handle error
      }
    });
  }

  // Function to create table row for each data item
  function createTableSoumission(data) {
    return `<tr class="tb-odr-item">
              <td class="tb-odr-info">
                <span class="tb-odr-id" style="color: black;">${data.code_lot}</span>
                <span class="tb-odr-id" style="color: black;">${data.principal !== null ? data.principal : '-'}</span>
              </td>
              <td class="tb-odr-info">
                <span class="tb-odr-id" style="color: black;">${data.option1 !== null ? data.option1 : '-'}</span>
                <span class="tb-odr-id" style="color: black;">${data.option2 !== null ? data.option2 : '-'}</span>
              </td>
            </tr>`;
  }

  function populateTableSoumission(data) {
    var tableBody = $('.tb-soum-body');
    tableBody.html("");
    for (var i = 0; i < data.length; i++) {
      var row = createTableSoumission(data[i]);
      tableBody.append(row);
    }
  }





});