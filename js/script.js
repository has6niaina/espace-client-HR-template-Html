// <![CDATA[
    var Liferay = Liferay || {};

Liferay.Browser = {
  acceptsGzip: function () {
    return true;
  },

  getMajorVersion: function () {
    return 111.0;
  },

  getRevision: function () {
    return "109.0";
  },
  getVersion: function () {
    return "111.0";
  },

  isAir: function () {
    return false;
  },
  isChrome: function () {
    return false;
  },
  isEdge: function () {
    return false;
  },
  isFirefox: function () {
    return true;
  },
  isGecko: function () {
    return true;
  },
  isIe: function () {
    return false;
  },
  isIphone: function () {
    return false;
  },
  isLinux: function () {
    return false;
  },
  isMac: function () {
    return false;
  },
  isMobile: function () {
    return false;
  },
  isMozilla: function () {
    return true;
  },
  isOpera: function () {
    return false;
  },
  isRtf: function () {
    return true;
  },
  isSafari: function () {
    return false;
  },
  isSun: function () {
    return false;
  },
  isWebKit: function () {
    return false;
  },
  isWindows: function () {
    return true;
  },
};

Liferay.Data = Liferay.Data || {};

Liferay.Data.ICONS_INLINE_SVG = true;

Liferay.Data.NAV_SELECTOR = "#navigation";

Liferay.Data.NAV_SELECTOR_MOBILE = "#navigationCollapse";

Liferay.Data.isCustomizationView = function () {
  return false;
};

Liferay.Data.notices = [null];

Liferay.PortletKeys = {
  DOCUMENT_LIBRARY: "com_liferay_document_library_web_portlet_DLPortlet",
  DYNAMIC_DATA_MAPPING:
    "com_liferay_dynamic_data_mapping_web_portlet_DDMPortlet",
  ITEM_SELECTOR:
    "com_liferay_item_selector_web_portlet_ItemSelectorPortlet",
};

Liferay.PropsValues = {
  JAVASCRIPT_SINGLE_PAGE_APPLICATION_TIMEOUT: 0,
  NTLM_AUTH_ENABLED: false,
  UPLOAD_SERVLET_REQUEST_IMPL_MAX_SIZE: 104857600,
};

Liferay.ThemeDisplay = {
  getLayoutId: function () {
    return "1";
  },

  getLayoutRelativeControlPanelURL: function () {
    return "/group/mg/~/control_panel/manage";
  },

  getLayoutRelativeURL: function () {
    return "/web/mg/accueil";
  },
  getLayoutURL: function () {
    return "https://in.intelcia.com/web/mg/accueil";
  },
  getParentLayoutId: function () {
    return "0";
  },
  isControlPanel: function () {
    return false;
  },
  isPrivateLayout: function () {
    return "false";
  },
  isVirtualLayout: function () {
    return false;
  },

  getBCP47LanguageId: function () {
    return "fr-FR";
  },
  getCanonicalURL: function () {
    return "https://in.intelcia.com/web/mg";
  },
  getCDNBaseURL: function () {
    return "https://in.intelcia.com";
  },
  getCDNDynamicResourcesHost: function () {
    return "";
  },
  getCDNHost: function () {
    return "";
  },
  getCompanyGroupId: function () {
    return "20127";
  },
  getCompanyId: function () {
    return "20101";
  },
  getDefaultLanguageId: function () {
    return "fr_FR";
  },
  getDoAsUserIdEncoded: function () {
    return "";
  },
  getLanguageId: function () {
    return "fr_FR";
  },
  getParentGroupId: function () {
    return "39456";
  },
  getPathContext: function () {
    return "";
  },
  getPathImage: function () {
    return "/image";
  },
  getPathJavaScript: function () {
    return "/o/frontend-js-web";
  },
  getPathMain: function () {
    return "/c";
  },
  getPathThemeImages: function () {
    return "https://in.intelcia.com/o/intelcia-intranet-themev2-theme/images";
  },
  getPathThemeRoot: function () {
    return "/o/intelcia-intranet-themev2-theme";
  },
  getPlid: function () {
    return "292";
  },
  getPortalURL: function () {
    return "https://in.intelcia.com";
  },
  getScopeGroupId: function () {
    return "39456";
  },
  getScopeGroupIdOrLiveGroupId: function () {
    return "39456";
  },
  getSessionId: function () {
    return "";
  },
  getSiteAdminURL: function () {
    return "https://in.intelcia.com/group/mg/~/control_panel/manage?p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view";
  },
  getSiteGroupId: function () {
    return "39456";
  },
  getURLControlPanel: function () {
    return "/group/control_panel?refererPlid=292";
  },
  getURLHome: function () {
    return "https\x3a\x2f\x2fin\x2eintelcia\x2ecom\x2fweb\x2fma\x2fredirection";
  },
  getUserEmailAddress: function () {
    return "18970738@no-emailaddress.com";
  },
  getUserId: function () {
    return "18970738";
  },
  getUserName: function () {
    return "\u0041\u006e\u0064\u0072\u00e9\u0061\u0073\u0020\u0046\u0069\u0074\u0061\u0068\u0069\u006e\u006a\u0061\u006e\u0061\u0068\u0061\u0072\u0079\u00a0";
  },
  isAddSessionIdToURL: function () {
    return false;
  },
  isImpersonated: function () {
    return false;
  },
  isSignedIn: function () {
    return true;
  },
  isStateExclusive: function () {
    return false;
  },
  isStateMaximized: function () {
    return false;
  },
  isStatePopUp: function () {
    return false;
  },
};

var themeDisplay = Liferay.ThemeDisplay;

Liferay.AUI = {
  getAvailableLangPath: function () {
    return "available_languages.jsp?browserId=firefox&themeId=intelciaintranetthemev2_WAR_intelciaintranetthemev2theme&colorSchemeId=01&minifierType=js&languageId=fr_FR&b=7200&t=1676050727681";
  },
  getCombine: function () {
    return true;
  },
  getComboPath: function () {
    return "/combo/?browserId=firefox&minifierType=&languageId=fr_FR&b=7200&t=1559343714516&";
  },
  getDateFormat: function () {
    return "%d/%m/%Y";
  },
  getEditorCKEditorPath: function () {
    return "/o/frontend-editor-ckeditor-web";
  },
  getFilter: function () {
    var filter = "raw";

    filter = "min";

    return filter;
  },
  getFilterConfig: function () {
    var instance = this;

    var filterConfig = null;

    if (!instance.getCombine()) {
      filterConfig = {
        replaceStr: ".js" + instance.getStaticResourceURLParams(),
        searchExp: "\\.js$",
      };
    }

    return filterConfig;
  },
  getJavaScriptRootPath: function () {
    return "/o/frontend-js-web";
  },
  getLangPath: function () {
    return "aui_lang.jsp?browserId=firefox&themeId=intelciaintranetthemev2_WAR_intelciaintranetthemev2theme&colorSchemeId=01&minifierType=js&languageId=fr_FR&b=7200&t=1559343714516";
  },
  getPortletRootPath: function () {
    return "/html/portlet";
  },
  getStaticResourceURLParams: function () {
    return "?browserId=firefox&minifierType=&languageId=fr_FR&b=7200&t=1559343714516";
  },
};

Liferay.authToken = "wdG2qs83";

Liferay.currentURL = "\x2fweb\x2fmg\x2faccueil";
Liferay.currentURLEncoded = "\x252Fweb\x252Fmg\x252Faccueil";
// ]]>

  var _paq = (window._paq = window._paq || []);
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function () {
    var u = "//web-stats.intelcia.com/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "6"]);
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  })();

  const ôbj_user =
    '{mvccVersion=230, uuid=f3884c83-af4f-1ff6-cdec-c931bd18eca1, externalReferenceCode=, userId=18970738, companyId=20101, createDate=Wed Jan 04 11:38:16 GMT 2023, modifiedDate=Sat Feb 25 12:15:54 GMT 2023, defaultUser=false, contactId=18970739, password=AAAAoAAB9ABIrwbFxNCeH2b8C8+jqO9OeKTqlJfXAVv2NcQX, passwordEncrypted=true, passwordReset=false, passwordModifiedDate=Wed Jan 04 11:38:16 GMT 2023, digest=, reminderQueryQuestion=, reminderQueryAnswer=, graceLoginCount=0, screenName=t07554, emailAddress=18970738@no-emailaddress.com, facebookId=0, googleUserId=, ldapServerId=36204, openId=, portraitId=0, languageId=fr_FR, timeZoneId=UTC, greeting=Bienvenue Andréas Fitahinjanahary  !, comments="myshift2";"leantelcia";"salary";"parrainage2";"wmail";"choix-cantine";"intranet-liferay";"avaya";"myalert2";"helpin";"happyfox-mg";"myprofile";"dashboard";"myswap";"trombinoscope";"myEval";"aci2";"mytime";"suggestion";"talkin";"planifTO";"records2";"conges";"mytodo";"supDMG";"portal-admin";"astreinte";"myshift2-client", firstName=Andréas, middleName=, lastName=Fitahinjanahary , jobTitle=, loginDate=Sat Feb 25 12:15:45 GMT 2023, loginIP=10.66.66.225, lastLoginDate=Sat Feb 25 10:00:44 GMT 2023, lastLoginIP=10.66.77.105, lastFailedLoginDate=null, failedLoginAttempts=0, lockout=false, lockoutDate=null, agreedToTermsOfUse=false, emailAddressVerified=false, status=0}';
  let înside_user = false;
  înside_user = true;
  function nano_merge(template, data) {
    return String(template).replace(/\{([\w\.]*)\}/g, function (str, key) {
      var keys = key.split("."),
        v = data[keys.shift()];
      for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
      return typeof v !== "undefined" && v !== null ? v : "";
    });
  }

  function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
      var keys = key.split("."),
        v = data[keys.shift()];
      for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
      return typeof v !== "undefined" && v !== null ? v : "";
    });
  }

  if ("t07554" != "20105") {
    $.getJSON(
      "https://in-ws.intelcia.com/notifications/visible/t07554",
      {},
      function (data) {
        $(".myicon-notifs.badge-notification").attr(
          "data-badge",
          data.length
        );
      }
    );
  } else {
    console.warn("catch 20105 ^^: ptnrml");
  }