        $(document).ready(function () {
          var country_bloc_template = $("#country_bloc_template").html();

          var country_data = [
            { code: "cm", name: "Cameroun, Cameroon, Camarões" },
            { code: "ci", name: "Côte d'Ivoire, Côte d'Ivoire, Côte d'Ivoire" },
            { code: "fr", name: "France, França" },
            { code: "mg", name: "Madagascar, Madagáscar" },
            { code: "ma", name: "Maroc, Morocco, Marrocos" },
            { code: "mu", name: "Maurice, Mauritius, Maurícia" },
            { code: "pt", name: "Portugal" },
            { code: "sn", name: "Sénégal, Senegal" },
            { code: "jm", name: "Jamaïque, Jamaica" },
            { code: "eg", name: "Égypte, Egypt" },
            { code: "es", name: "Espagne, Spain" },
            { code: "us", name: "États-Unis, United States" },
            { code: "do", name: "République dominicaine, Dominican Republic" },
          ];
          //            {"code": "us", "name":"Etats Unis, United States, Estados Unidos"}

          var localeArrayLength = country_data.length;

          for (var i = 0; i < localeArrayLength; i++) {
            country_data[i]["current"] = "";
            country_data[i]["url"] = "/web/" + country_data[i]["code"];

            if (
              "https://in.intelcia.com/web/mg".endsWith(
                "/" + country_data[i]["code"]
              )
            ) {
              country_data[i]["url"] = "javascript:;";
              country_data[i]["current"] = " active";

              $("#current-country").val(country_data[i]["code"]);
            }

            $("#countries-switch").append(
              nano(country_bloc_template, country_data[i])
            );
          }
        });