var https = require('https'),
    fs = require('fs'),
    qs = require('querystring'),
    async = require('async');

var config = require('../config.json'),
    ruWords = require('./ru_words.json'),
    total = {ru: ruWords},
    template = fs.readFileSync('translate/template.html', 'utf-8');
    
var KEY = 'trnsl.1.1.20140928T165205Z.5c5f0200505be28c.0ff47287bb2e967a0751aa4b5cb16f63f123776c';

function getPageHref(locale) {
    return 'index' + (locale === 'en' ? '' : '.' + locale) + '.html';
}

function processTemplate(locale, words, template) {
    var buf = template;

    Object.keys(words).forEach(function(key) {
        var re = new RegExp('\{\{' + key + '\}\}', 'g');
        buf = buf.replace(re, words[key]);
    });

    buf = buf.replace(/\{\{_locale\}\}/g, locale);
    
    var menu = '';
    config.locales.forEach(function(lang) {
        var href = getPageHref(lang);
        menu += '<a href="' + href + '" title="' + lang + '">' +
            '<span class="icon icon_locale_' + lang + ' ' +
            (lang === locale ? 'icon_selected' : '') + '"></span></a>';
    });

    buf = buf.replace(/\{\{_countries-menu\}\}/g, menu);

    return buf;
}

function translateUsingAPI(text, key, locale, callback) {
    var options = {
        port: 443,
        method: 'GET',
        hostname: 'translate.yandex.net',
        path: '/api/v1.5/tr.json/translate?' + qs.stringify({
            key: KEY,
            format: 'json',
            lang: 'ru-' + locale,
            text: text
        })
    };

    var str = '';
    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            str += chunk;
        });

        res.on('end', function(e) {
            var data = JSON.parse(str);
            total[locale][key] = data.text[0];
            callback();
        });
    });

    req.on('error', function(e) {
        callback(true);
    });

    req.end();
}

module.exports = {
    translate: function(callback) {
        async.each(config.locales, function(locale, callbackLocale) {
            total[locale] = total[locale] || {};
            async.each(Object.keys(ruWords), function(key, callbackKey) {
                translateUsingAPI(ruWords[key], key, locale, callbackKey);
            }, callbackLocale);
        }, function(err) {
            if(err) {
                console.log(err);
                return;
            }
            
            fs.writeFileSync('words.json', JSON.stringify(total, null, '  '));
            config.locales.forEach(function(locale) {
                var bufTemplate = processTemplate(locale, total[locale], template);
                fs.writeFileSync( './' + getPageHref(locale), bufTemplate, 'utf-8');
            });
            
            callback();
        });
    }
};
