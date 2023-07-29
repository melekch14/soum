//class names
var $win = $(window), $body = $('body'), $doc = $(document),
    _body_theme = 'nio-theme',
    _menu = 'nk-menu',
    _mobile_nav = 'mobile-menu',
    _header = 'nk-header',
    _header_menu = 'nk-header-menu',
    _sidebar = 'nk-sidebar',
    _sidebar_mob = 'nk-sidebar-mobile',
    _break = NioApp.Break;

function extend(obj, ext) {
    Object.keys(ext).forEach(function (key) { obj[key] = ext[key]; });
    return obj;
}

NioApp.CurrentLink = function () {
    var _link = '.nk-menu-link, .menu-link, .nav-link',
        _currentURL = window.location.href,
        fileName = _currentURL.substring(0, (_currentURL.indexOf("#") == -1) ? _currentURL.length : _currentURL.indexOf("#")),
        fileName = fileName.substring(0, (fileName.indexOf("?") == -1) ? fileName.length : fileName.indexOf("?"));

    $(_link).each(function () {
        var self = $(this), _self_link = self.attr('href');
        if (fileName.match(_self_link)) {
            self.closest("li").addClass('active current-page').parents().closest("li").addClass("active current-page");
            self.closest("li").children('.nk-menu-sub').css('display', 'block');
            self.parents().closest("li").children('.nk-menu-sub').css('display', 'block');
        } else {
            self.closest("li").removeClass('active current-page').parents().closest("li:not(.current-page)").removeClass("active");
        }
    });
};

NioApp.TGL.ddmenu = function (elm, opt) {
    var imenu = (elm) ? elm : '.nk-menu-toggle',
        def = { active: 'active', self: 'nk-menu-toggle', child: 'nk-menu-sub' },
        attr = (opt) ? extend(def, opt) : def;

    $(imenu).on('click', function (e) {
        if ((NioApp.Win.width < _break.lg) || ($(this).parents().hasClass(_sidebar))) {
            NioApp.Toggle.dropMenu($(this), attr);
        }
        e.preventDefault();
    });
};

// Show Menu @v1.0
NioApp.TGL.showmenu = function (elm, opt) {
    var toggle = (elm) ? elm : '.nk-nav-toggle', $toggle = $(toggle), $contentD = $('[data-content]'),
        toggleBreak = $contentD.hasClass(_header_menu) ? _break.lg : _break.xl,
        toggleOlay = _sidebar + '-overlay', toggleClose = { profile: true, menu: false },
        def = { active: 'toggle-active', content: _sidebar + '-active', body: 'nav-shown', overlay: toggleOlay, break: toggleBreak, close: toggleClose },
        attr = (opt) ? extend(def, opt) : def;

    $toggle.on('click', function (e) {
        NioApp.Toggle.trigger($(this).data('target'), attr);
        e.preventDefault();
    });

    $doc.on('mouseup', function (e) {
        if (!$toggle.is(e.target) && $toggle.has(e.target).length === 0 && !$contentD.is(e.target) && $contentD.has(e.target).length === 0 && NioApp.Win.width < toggleBreak) {
            NioApp.Toggle.removed($toggle.data('target'), attr);
        }
    });

    $win.on('resize', function () {
        if (NioApp.Win.width < _break.xl || NioApp.Win.width < toggleBreak) {
            NioApp.Toggle.removed($toggle.data('target'), attr);
        }
    });
};

NioApp.TGL.showmenu('.nk-nav-toggle');
NioApp.TGL.ddmenu('.' + _menu + '-toggle', { self: _menu + '-toggle', child: _menu + '-sub' });

NioApp.CurrentLink();