$(window).on('load', function() {

var sc = new Calendula({
    id: 'calendula-promo',
    locale: window.currentLocale,
    autocloseable: false,
    closeAfterSelection: false,
    value: 'today'
}).open();

var App = {
    _sources: {
        js: {},
        css: {}
    },
    _dist: 'dist/',
    init: function() {
        // for debug
        if(window.location.protocol === 'file:') {
            this.showUI();
        }

        if(document.queryCommandSupported && document.execCommand) {
            this._copySupported = document.queryCommandSupported('copy');
        } else {
            $('.copy-js, .copy-css').hide();
        }

        $.getJSON('config.json').done(function(data) {
            this._config = data;

            this.getVersion();

            this.buildUI();
            this.setEvents();
            this.loadResources();
        }.bind(this));
    },
    showUI: function() {
        $('.loading').remove();
        $('.source').removeClass('source_hidden');
    },
    buildUI: function() {
        var loc = '',
            the = '',
            hol = '';

        this._config.locales.forEach(function(el) {
            var id = 'locale-' + el,
                checked = '';

            if(this._config.defaultLocales.indexOf(el) !== -1) {
                checked = 'checked="checked" ';
            }

            loc += '<input type="checkbox" ' + checked + 'id="' + id +
                '" /> <label for="' + id + '"><span class="icon icon_locale_' + el +
                '"></span>' + el + '</label><br />';
        }, this);

        this._config.themes.forEach(function(el) {
            var id = 'theme-' + el,
                checked = '';

            if(el === this._config.defaultTheme) {
                checked = 'checked="checked"';
            }

            the += '<input type="radio" ' + checked + ' id="' + id +
                '" value="' + el + '" name="theme" /> <label for="' + id + '">' + el + '</label><br />';
        }, this);

        this._config.holidays.sort().forEach(function(el) {
            var id = 'holiday-' + el,
                checked = '';

            if(el === this._config.defaultHolidays) {
                checked = 'checked="checked" ';
            }

            hol += '<input type="checkbox" ' + checked + 'id="' + id +
                '" /> <label for="' + id + '"><span class="icon icon_locale_' + el +
                '"></span>' + el + '</label><br />';
        }, this);

        $('.prefs-themes-content').html(the);
        $('.prefs-locales-content').html(loc);
        $('.prefs-holidays-content').html(hol);
    },
    getVersion: function() {
        $('.title__version').html(Calendula.version);
    },
    setEvents: function() {
        var that = this;

        $('.source input:checkbox, .source input:radio').on('click', this.rebuild.bind(this));
        $('#locales, #holidays').on('click', function() {
            that.toggleCheckboxes($(this).parent());
            that.rebuild();
        });

        $('textarea').on('click', function() {
            this.select();
        });

        $('.copy-js').on('click', function() {
            that.copyText('.source-js');
        });

        $('.copy-css').on('click', function() {
            that.copyText('.source-css');
        });
    },
    toggleCheckboxes: function(elem) {
        var ch = elem.find('input:checkbox'),
            checked;

        if(ch.length) {
            checked = ch[0].checked;
        }

        ch.each(function() {
            this.checked = !checked;
        });
    },
    copyText: function(selector) {
        try {
            $(selector).get(0).select();
            document.execCommand('copy');
        } catch(e) {
            window.alert(e);
        }
    },
    rebuild: function() {
        this.buildCss();
        this.buildJs();
        this.updateLink('js', 'text/javascript');
        this.updateLink('css', 'text/css');
    },
    updateLink: function(id, mimeType) {
        var code = $('.source-' + id).val();
        $('.download-' + id).attr('href', 'data:' + mimeType +
            ';charset=utf-8;base64,' + Base64.encode(code));
    },
    loadResources: function() {
        var requests = [],
            that = this;

        function addRequest(name, file, type) {
            requests.push($.get(file, null, null, 'text').done(function(data) {
                that._sources[type][name] = data;
            }));
        }

        addRequest('base', this._dist + 'calendula.base.css', 'css');
        addRequest('base', this._dist + 'calendula.base.js', 'js');

        this._config.themes.forEach(function(el) {
            addRequest(el, that._dist + 'calendula.theme.' + el + '.css', 'css');
        });

        this._config.holidays.forEach(function(el) {
            addRequest('holiday-' + el, that._dist + 'calendula.holiday.' + el + '.js', 'js');
        });

        this._config.locales.forEach(function(el) {
            addRequest('locale-' + el, that._dist + 'calendula.locale.' + el + '.js', 'js');
        });

        $.when.apply($, requests).done(function() {
            that.rebuild();
            that.showUI();
        });
    },
    buildJs: function() {
        var text = this._sources.js.base,
            selectedLocale = '';

        this._config.locales.forEach(function(el) {
            var id = 'locale-' + el;
            if($('#' + id)[0].checked) {
                text += this._sources.js[id];
                if(!selectedLocale) {
                    selectedLocale = el;
                }
            }
        }, this);

        selectedLocale = selectedLocale || 'en';

        this._config.holidays.forEach(function(el) {
            var id = 'holiday-' + el;
            if($('#' + id)[0].checked) {
                text += this._sources.js[id];
            }
        }, this);

        $('.source-js').html(text);
        $('.source-js__len').html(text.length);
        $('#code-locale').html(selectedLocale);
        sc.setting('locale', selectedLocale);
    },
    buildCss: function() {
        var text = '' + this._sources.css.base,
            selectedTheme = '';

        this._config.themes.forEach(function(el) {
            if($('#theme-' + el)[0].checked) {
                text += this._sources.css[el];

                if(!selectedTheme) {
                    selectedTheme = el;
                }
            }
        }, this);

        selectedTheme = selectedTheme || 'default';

        $('.source-css').html(text);
        $('.source-css__len').html(text.length);
        $('#code-theme').html(selectedTheme);
        sc.setting('theme', selectedTheme);
    }
};

App.init();

});
