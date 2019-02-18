// adBug - FPS v1.0
// Authored by adBug <a@adb.ug>
var _abfps = function() {
    var obj = this;
    var data = {
        'PID'          : '0',
        'adType'       : 'int',
        'allowDomains' : [],
        'skipDomains'  : [],
        'inElement'    : []
    };

    var merge = function(obj1, obj2) {
        for (var i = 0; i < obj2.length; i++) obj1.push(obj2[i]);
        return obj1;
    };

    var contains = function(obj){
        var i = this.length;
        while(i--){ if(this[i] === obj) return true; }
        return false;
    };

    var getHost = function(u) { return u.match(/:\/\/(.[^/]+)/)[1].replace('www.', ''); };

    var getElements = function(arr) {
        var elements = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length < 1) continue;
            var ind = 0, tag = arr[i].trim(), tid = false, tclass = false;
            if ((ind = arr[i].indexOf('#')) > -1) {
                tid = document.getElementById(arr[i].substr(ind+1).trim());
                if (tid) return tid.getElementsByTagName('a');
            } else if ((ind = arr[i].indexOf('.')) > -1) {
                tag = arr[i].substr(0, ind).trim();
                tclass = arr[i].substr(ind+1).replace('.', ' ').trim();
            }
            if (tag.length < 1) tag = '*';
            var elems = document.getElementsByTagName(tag);
            for (var j = 0; j < elems.length; j++) {
                if (tclass.length > 0) {
                    if((' ' + elems[j].className + ' ').indexOf(' ' + tclass + ' ') > -1) {
                        elements = merge(elements, elems[j].getElementsByTagName('a'));
                    }
                } else elements = merge(elements, elems[j].getElementsByTagName('a'));
            }
        }
        return elements;
    };

    var isValidURL = function(u) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(u);
    };

    obj.push = function(a) {
        if ((a[0] == 'inElement' || a[0] == 'allowDomains' || a[0] == 'skipDomains') && typeof(a[1]) == 'string')
            data[a[0]].push(a[1]);
        else
            data[a[0]] = a[1];
    };

    obj.makeBug = function(u) { return 'http://freeunity3d.space/' + data.PID + '/' + data.adType + '/' + u; }

    obj.run = function() {
        window.onload = function() {
            if (data.adType !== 'banner' && data.adType !== 'none') data.adType = 'int';
            var l = getElements(data.inElement), u = '', h = '';
            if (!l) return;
            if (data.allowDomains.length > 0) {
                for (var i = 0; i < l.length; i++) {
                    u = l[i]['href'];
                    if (!isValidURL(u)) continue;
                    h = getHost(u);
                    if (u.indexOf('http://freeunity3d.space/') == 0 || h == 'freeunity3d.space') continue;
                    if (contains(data.allowDomains, h)) l[i]['href'] = obj.makeBug(u);
                }
            } else {
                for (var i = 0; i < l.length; i++) {
                    u = l[i]['href'];
                    if (!isValidURL(u)) continue;
                    h = getHost(u);
                    if (u.indexOf('http://freeunity3d.space/') == 0 || h == 'freeunity3d.space') continue;
                    if (!contains(data.skipDomains, h)) l[i]['href'] = obj.makeBug(u);
                }
            }
        };
    };
};