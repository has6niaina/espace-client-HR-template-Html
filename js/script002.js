// <![CDATA[
Liferay.on("ddmFieldBlur", function (event) {
  if (window.Analytics) {
    Analytics.send("fieldBlurred", "Form", {
      fieldName: event.fieldName,
      focusDuration: event.focusDuration,
      formId: event.formId,
      page: event.page - 1,
    });
  }
});

Liferay.on("ddmFieldFocus", function (event) {
  if (window.Analytics) {
    Analytics.send("fieldFocused", "Form", {
      fieldName: event.fieldName,
      formId: event.formId,
      page: event.page - 1,
    });
  }
});

Liferay.on("ddmFormPageShow", function (event) {
  if (window.Analytics) {
    Analytics.send("pageViewed", "Form", {
      formId: event.formId,
      page: event.page,
      title: event.title,
    });
  }
});

Liferay.on("ddmFormSubmit", function (event) {
  if (window.Analytics) {
    Analytics.send("formSubmitted", "Form", {
      formId: event.formId,
    });
  }
});

Liferay.on("ddmFormView", function (event) {
  if (window.Analytics) {
    Analytics.send("formViewed", "Form", {
      formId: event.formId,
      title: event.title,
    });
  }
});
// ]]>4

function getCountry() {
  var c = location.href;
  c = c.split("?")[0];
  c = c.substr(0, c.length);
  c = c.split("/");
  var iw = c.indexOf("web");
  return c[iw + 1];
}

async function openSurvey() {
  var UserId = Liferay.ThemeDisplay.getUserId();
  const { screenName, firstName, lastName } = await new Promise(
    (resolve, reject) => {
      Liferay.Service(
        "/user/get-user-by-id",
        {
          userId: UserId,
        },
        function (user) {
          //set custom Info
          resolve(user);
        }
      );
    }
  );
  if (["047780", "047778", "030644"].includes(screenName)) {
    const chatId = btoa([firstName, lastName, screenName].join(" "));
    window.open(
      "https://enquete-satisfaction.intelcia.com/index.php/792931?newtest=Y&lang=fr&chatId=" +
        chatId
    );
  }
}

window.ezyReverse = {
  base_url: "",
  api: function (v) {
    v = String(v).replace(window.ezyReverse.base_url + "/get?src=", "");
    const u = window.ezyReverse.base_url + "/get?src=" + v;
    return v;
  },
  postMessage: function (frame, key, message) {
    // frame.contentWindow.postMessage(key + message, window.ezyReverse.base_url);
  },
};

$(document).ready(function () {
  $("#locales-switch")
    .prev()
    .on("click", function () {
      $("#locales-switch").fadeToggle();
    });
  /* Foreach For Redirect In*/
  /*$('a.menu__link').each(function(i, el) {
      console.log('INIT REDIRECTION')
      var domaine = 'https://in2.intelcia.com/web/';
      var old = 'https://in.intelcia.com/web/'
      var pays = ['ma', 'fr', 'sn', 'ci', 'cm', 'mu', 'mg', 'pt'];
      var ex = ['#', 'accueil', 'news', 'vie-cote-plateau', 'photos-et-videos', 'news-pays',
                'cafe-matin1', 'cafe-matin', 'share-in', 'nous-connaitre',
                'métiers-services', 'excellence-opérationnelle', 'références',
                'photos-et-vidéos', 'intelcia-mag', 'a-ne-pas-manquer', 'la-direction', 'activites',
                'resp.-sociale-de-l-entreprise', 'les-échos-des-cafés-matin', 'voc', 'métiers-services',
                'métiers-services', 'excellence-opérationnelle', 'références'];

      var liens = pays.map(p => ex.map( e => (e != '#'?  domaine + p + '/' + e: e)));
      liens = liens.reduce((a,b) => a.concat(b))
      if(liens.indexOf($(el).attr('href')) == -1) {
          $(el).attr('href',  $(el).attr('href').replace(domaine, old))
      }
  })*/
  /* Hide right event/quizz */
  var urls = [
    "",
    "/",
    "accueil",
    "home",
    "ma",
    "fr",
    "sn",
    "ci",
    "cm",
    "mu",
    "mg",
    "pt",
  ];
  var uri = location.href.split("/").reverse()[0];
  var main = $(".collapsible-container");
  $(document).ready(function () {
    /*setTimeout(function(){
          if(urls.indexOf(uri) == -1) {
              main.removeClass("push-container");
              $('#rihgt_quiz').removeClass('active');
              $('.btn.btn-quizz').addClass('show')
          } else {
              main.addClass("push-container");
              $('#rihgt_quiz').addClass('active');
              $(this).removeClass('show');
          }
      }, 1000)*/
    $(".btn.btn-quizz").on("click", function () {
      main.toggleClass("push-container");
      $("#rihgt_quiz").toggleClass("active");
      $(this).removeClass("show");

      if ($(".content-main-in").attr("class").indexOf("col-xl-9") > -1)
        $(".content-main-in")
          .removeClass("col-xl-9")
          .removeClass("col-lg-9")
          .addClass("col-xl-12")
          .addClass("col-lg-12");
      else
        $(".content-main-in")
          .removeClass("col-xl-12")
          .removeClass("col-lg-12")
          .addClass("col-xl-9")
          .addClass("col-lg-9");

      $(".content-right-in").toggleClass("hide");
    });
  });
  var theme = `<li class="menu__item pr-3 in-add" role="menuitem" style="animation-delay: 420ms;">
          <a class="menu__link" href="__URL__" target="_blank">
              <span class="side-menu-icon">
                  <img src="__IMG__">
              </span> __TITLE__
              <span class="icon-arrow-left pignose-calendar-top-icon"></span>
          </a>
      </li>`;
  var $location = location.href.split("/");
  var Indexweb = $location.indexOf("web") + 1;
  var source =
    "https://in2.intelcia.com/web/" + $location[Indexweb] + "/";
  var urls = [
    {
      icon: "/documents/34099/34469/rh/795751ec-6d36-40dc-4acd-266218f7ef7b?t=1582144525116",
      title: "My RH",
      url: "myrh",
      index: 3,
    },
    {
      icon: "/documents/34099/34469/config/d7906c6d-2d4f-dd59-4eed-ba7979129919?t=1582144526056",
      title: "Fiches de poste",
      url: "fiche-de-poste",
      index: 4,
    },
  ];
  function prepare(el) {
    var str = "";
    str = theme
      .replace("__TITLE__", el.title)
      .replace("__IMG__", el.icon)
      .replace("__URL__", el.url);
    return str;
  }
  var htmlMENU = [];
  /*urls.forEach((d, i) => {
          var menu = '';
          if(d.app) {
              menu = prepare(d);
          } else {
              d.url = source + d.url;
              menu = prepare(d);
          }
          if($location.indexOf('web') > -1 && $location.indexOf('web/fr') > -1 && d.url != 'myrh') {
              $(menu).insertAfter('[data-menu="main"] .menu__item:nth-child(' + d.index + ')');
          }
          //htmlMENU.push(menu)
      })*/

  // Tracking RadioIn PodCast

  $(".col-podcast .journalArticleId").each((i, d) => {
    const id = $(d).val();
    const key = `tracking_` + id;
    sendTracking(key);
  });
  var detectDevice = {
    desktops: () =>
      window.matchMedia("(min-width: 1281px)").matches ||
      window.matchMedia("(min-width: 1025px) and (max-width: 1280px)")
        .matches,
    tablets: () =>
      window.matchMedia("(min-width: 768px) and (max-width: 1024px)")
        .matches ||
      window.matchMedia(
        "(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)"
      ).matches,
    phones: () =>
      window.matchMedia("(min-width: 320px) and (max-width: 480px)")
        .matches ||
      window.matchMedia("(min-width: 481px) and (max-width: 767px)")
        .matches,
    get: () => {
      let name = "";
      switch (true) {
        case detectDevice.desktops():
          name = "ordianteur";
          break;
        case detectDevice.phones():
          name = "smartphone";
          break;
        case detectDevice.tablets():
          name = "tablette";
          break;
      }
      return name;
    },
  };

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getInfoAudio(parent, type) {
    var p = $(parent).parent();
    var id = $(p).find(".journalArticleId").val();
    var title = $(p).find(".journalArticleTitle").val();
    var cntry = $("#current-country").val();
    var key = `tracking_` + id;
    var cookie = getCookie(key);
    var b;
    if (cookie.length == 0) {
      b = {
        poadcastID: id,
        poadcastName: title,
        playDuration: 0,
        launchDay: moment().format("YYYY-MM-DD"),
        launchHour: moment().format("HH:mm:ss"),
        country: cntry,
        device: detectDevice.get(),
      };
      setCookie(key, JSON.stringify(b), 3600);
    } else {
      b = JSON.parse(cookie);
      b.playDuration = parent.currentTime;
      setCookie(key, JSON.stringify(b), 3600);
    }
    if (type && type == "break") {
      sendTracking(key);
      //console.log("break....")
    }
  }
  function sendTracking(key) {
    var cookie = getCookie(key);
    if (cookie.length) {
      $.ajax({
        url: "https://stats.vestaradio.com/intelcia/podcasts.php",
        method: "POST",
        type: "json",
        data: cookie,
        success: function (data) {
          setCookie(key, null, -1);
        },
        error: function (err) {
          console.error("Throw:", err);
        },
      });
    }
  }

  $(".col-podcast audio").on("playing", function (ev) {
    [...$("audio")].forEach((p) => {
      if (!p.paused) {
        // audio is played
        console.log(p, ev.target);
        if (p && p != ev.target) {
          p.pause();
        }
      }
    });

    ev.target.play();
    getInfoAudio(this, "play");
  });

  $(".col-podcast audio").on("ended, pause", function (ev) {
    setTimeout(() => {
      getInfoAudio(this, !this.paused ? "update" : "break");
    }, 500);
  });

  $(".col-podcast audio").on("timeupdate", function (ev) {
    getInfoAudio(this, "update");
  });

  /* get like & comment news */
  $(".news-entry").each(function (index, element) {
    var journalArticleId = $(element).find(".journalArticleId").val();

    $.getJSON(
      "https://in-ws.intelcia.com/social-stats/journal_article/" +
        journalArticleId +
        "/user_id/t07554",
      function (data) {
        $(element).find(".comments_count").html(data.commentsCount);
        $(element).find(".likes_count").html(data.likesCount);

        if (data.liking == true) {
          $(element).find(".like-bloc").addClass("active");
        }
      }
    );
  });

  $("body").on("click", ".news-entry .like-bloc", function (e) {
    e.preventDefault();

    if ($(this).hasClass("active") !== !1) {
      var journalId = $(this)
        .parent()
        .parent()
        .parent()
        .find(".journalArticleId")
        .val();

      $(this).addClass("active");

      var the_link = $(this);

      $.getJSON(
        "https://in-ws.intelcia.com/like/create",
        { userId: "t07554", journalArticleId: journalId },
        function (data) {
          console.log(data);
          the_link.find(".likes_count").html(data);
        }
      );
    }
  });

  /* init player */
  if ($(".player:not(#player-radio)").length) {
    $(".player:not(#player-radio)").each(function (e, i) {
      new ezyWave(e, {
        src: $(this).attr("data-src"),
        type: "audio",
      });
    });
  }
});