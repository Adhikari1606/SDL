/*
* simplemaps_worldmap.js by @version 4.5.2
* https://simplemaps.com/docs/world-map
*/
(function (win, doc) {
    if (win.simplemaps_worldmap) return;
    var simplemaps_worldmap = win.simplemaps_worldmap = {};
    var map_cfg = simplemaps_worldmap.map_cfg = {};
    var map_data = simplemaps_worldmap.map_data = {};
    var map_loaded = simplemaps_worldmap.map_loaded = false;
    var api_ready = simplemaps_worldmap.api_ready = false;
    simplemaps_worldmap.load = function () {
        if (map_loaded) {
            return
        }
        var Map = function (c) {
            var map = this;
            map_data = c.data;
            map.map_data = map_data;
            map_cfg = map.map_cfg = map_data.main_settings;
            map.id = c.id;
            map.div = doc.getElementById(map.id);
            map.div.style.position = 'relative';
            map.div.style.overflow = 'hidden';
            map.width = c.width ? c.width : parseInt(map_cfg.width);
            map.height = c.height ? c.height : parseInt(map_cfg.height);
            map.div.style.width = map.width + 'px';
            map.div.style.height = map.height + 'px';
            map.mouse_x = 0;
            map.mouse_y = 0;
            map.panning = false;
            map.zooming = false;
            map.hover_state = '';
            map.hover_location = '';
            map.defaults = {};
            map.defaults.state = {
                'name': '',
                'inactive': map_cfg.all_states_inactive,
                'color': map_cfg.state_color,
                'hover_color': map_cfg.state_hover_color,
                'url': map_cfg.state_url,
                'description': map_cfg.state_description
            };
            map.defaults.location = {
                'name': '',
                'color': map_cfg.location_color,
                'hover_color': 'default',
                'url': map_cfg.location_url,
                'description': map_cfg.location_description,
                'size': map_cfg.location_size,
                'type': map_cfg.location_type,
                'image_source': map_cfg.location_image_source,
                'opacity': map_cfg.location_opacity,
                'hover_opacity': map_cfg.location_hover_opacity,
                'border': map_cfg.location_border,
                'border_color': map_cfg.location_border_color,
                'hover_border': map_cfg.location_hover_border,
                'inactive': map_cfg.all_locations_inactive,
                'hidden': map_cfg.all_locations_hidden
            };
            map.defaults.label = {
                'color': map_cfg.label_color,
                'hover_color': map_cfg.label_hover_color,
                'font': map_cfg.label_font,
                'size': map_cfg.label_size,
                'inactive': 'no'
            };
            map.states = {};
            map.locations = {};
            map.labels = {};
            map.scale = 1;
            map.translateX = 0;
            map.translateY = 0;
            map.zoom_level = 1;
            if (map_cfg.zoom == 'yes') {
                map_cfg.initial_zoom = map_cfg.initial_zoom || -1;
                map.zoom_max = 20;
                map.zoom_min = 1;
                map.zoom_time = map_cfg.zoom_time;
                map.zoom_percentage = map_cfg.zoom_percentage;
                map.zoom_out_incrementally = map_cfg.zoom_out_incrementally
            }
            map.popups = map_cfg.popups;
            map.popup = {};
            map.popup.div = {};
            map.popup.text = {};
            map.popup.corners = map_cfg.popup_corners;
            map.popup.shadow = map_cfg.popup_shadow;
            map.popup.opacity = map_cfg.popup_opacity;
            map.popup.color = map_cfg.popup_color;
            map.popup.font = map_cfg.popup_font;
            map.popup.nocss = map_cfg.popup_nocss;
            map.url_new_tab = map_cfg.url_new_tab;
            map.link_text = map_cfg.link_text;
            map.images_directory = map_cfg.images_directory;
            map.fade_time = map_cfg.fade_time;
            map.auto_load = map_cfg.auto_load;
            var browser_agent = navigator.userAgent.toLowerCase();
            map.is_android = browser_agent.indexOf("android") > -1;
            map.is_ipad = navigator.platform.indexOf("iPad") != -1;
            map.is_iphone = navigator.platform.indexOf("iPhone") != -1;
            map.is_ios = map.is_ipad || map.is_iphone;
            map.is_mobile = map.is_android || map.is_ios;
            map.is_mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            map.is_firefox = typeof InstallTrigger !== 'undefined';
            map.is_ie = doc.documentMode;
            map.is_chrome = !!win.chrome && !map.is_ie;
            map.is_safari = Object.prototype.toString.call(win.HTMLElement).indexOf('Constructor') > 0 && !map.is_chrome;
            map.is_opera = !!win.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            map.svg_support = !!doc.createElementNS && !!doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
            if (!map.svg_support) return;
            map.paper = new Raphael(map.id, map.width, map.height);
            map.container = doc.getElementById(map.id).getElementsByTagName('svg')[0];
            map.container.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            map.container.setAttribute('viewBox', '0 0 ' + map.width + ' ' + map.height);
            map.container.style.width = '100%';
            map.container.style.height = '100%';
            if (map.is_ie && map.is_ie < 9) {
                map.paper.canvas.style.position = 'absolute'
            }
            map.container.style.display = 'block';
            map.container.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
            if (map_cfg.background_transparent == 'yes') {
                map.paper.canvas.style.background = 'transparent'
            } else {
                map.paper.canvas.style.backgroundColor = map_cfg.background_color
            }
            if (map_cfg.border_color != 'transparent' && map_cfg.border_color != 'none' && map_cfg.border_color != '') {
                map.div.style.border = '1px solid ' + map_cfg.border_color
            }
            map.load_map();
            if (map_cfg.auto_load == 'yes') {
                map.create_states();
                map.create_locations();
                map.create_labels();
                if (map.popups != 'off') {
                    map.create_popup()
                }
            }
            map.events();
            if (map_cfg.zoom == 'yes') {
                map.zi = doc.createElement('div');
                map.zi.style.position = 'absolute';
                map.zi.style.width = '20px';
                map.zi.style.height = '20px';
                map.zi.style.cursor = 'pointer';
                map.zi.style.backgroundColor = 'rgba(255,255,255,.5)';
                map.zi.style.borderRadius = '3px';
                map.zi.style.left = '10px';
                map.zi.style.top = '10px';
                map.zi.style.textAlign = 'center';
                map.zi.style.fontSize = '18px';
                map.zi.style.fontWeight = 'bold';
                map.zi.style.lineHeight = '20px';
                map.zi.innerHTML = '+';
                map.zi.onclick = function () {
                    map.zoom_in()
                };
                map.div.appendChild(map.zi);
                map.zo = doc.createElement('div');
                map.zo.style.position = 'absolute';
                map.zo.style.width = '20px';
                map.zo.style.height = '20px';
                map.zo.style.cursor = 'pointer';
                map.zo.style.backgroundColor = 'rgba(255,255,255,.5)';
                map.zo.style.borderRadius = '3px';
                map.zo.style.left = '10px';
                map.zo.style.top = '35px';
                map.zo.style.textAlign = 'center';
                map.zo.style.fontSize = '22px';
                map.zo.style.fontWeight = 'bold';
                map.zo.style.lineHeight = '20px';
                map.zo.innerHTML = '-';
                map.zo.onclick = function () {
                    map.zoom_out()
                };
                map.div.appendChild(map.zo)
            }
            if (map_cfg.initial_zoom != -1) {
                var zoom_to = map_cfg.initial_zoom;
                if (map_cfg.initial_zoom_solo == 'yes' && map.states[zoom_to] && !map.states[zoom_to].inactive) {
                    map.zoom_solo(zoom_to)
                } else if (map_data.regions[zoom_to]) {
                    map.zoom_to_region(zoom_to)
                }
            }
            api_ready = true
        };
        Map.prototype.load_map = function () {
            var map = this;
            var state_data_path = map_data.paths;
            for (var state_id in state_data_path) {
                var state_paths = state_data_path[state_id];
                var paths = [];
                for (var i = 0; i < state_paths.length; i++) {
                    var path = map.paper.path(state_paths[i]);
                    paths.push(path)
                }
                var state = map.paper.set(paths);
                state.id = state_id;
                state.attrs.id = state_id;
                map.states[state_id] = state
            }
        };
        Map.prototype.create_states = function () {
            var map = this;
            for (var state_id in map.states) {
                var state = map.states[state_id];
                var state_cfg = map_data.state_specific[state_id] || {};
                var state_name = state_cfg.name || '';
                var state_inactive = state_cfg.inactive || map.defaults.state.inactive;
                var state_color = state_cfg.color || map.defaults.state.color;
                var state_hover_color = state_cfg.hover_color || map.defaults.state.hover_color;
                var state_url = state_cfg.url || map.defaults.state.url;
                var state_description = state_cfg.description || map.defaults.state.description;
                state.name = state_name;
                state.inactive = state_inactive;
                state.color = state_color;
                state.hover_color = state_hover_color;
                state.url = state_url;
                state.description = state_description;
                state.attrs.fill = state_color;
                state.attrs.stroke = map_cfg.border_color;
                state.attrs['stroke-width'] = map_cfg.border_size;
                state.attrs['stroke-linejoin'] = 'round';
                state.attrs.cursor = state_inactive == 'yes' ? 'default' : 'pointer';
                if (map.is_ie && map.is_ie < 9) {
                    state.attrs.fill = state_color
                }
                state.apply_styles = function () {
                    var state = this;
                    if (state.inactive == 'yes') {
                        state.attrs.fill = state.color;
                        state.attrs.cursor = 'default';
                        state.forEach(function (path) {
                            path.node.style.pointerEvents = 'none'
                        })
                    } else {
                        state.attrs.fill = state.color;
                        state.attrs.cursor = 'pointer';
                        state.forEach(function (path) {
                            path.node.style.pointerEvents = 'auto'
                        })
                    }
                    if (state.name == 'Antarctica') {
                        state.attrs.display = 'none'
                    }
                };
                state.apply_styles();
                state.style.stroke = map_cfg.border_color;
                state.style['stroke-width'] = map_cfg.border_size;
                state.style['stroke-linejoin'] = 'round';
                state.style.cursor = 'pointer';
                state.attr(state.attrs);
                if (state.inactive != 'yes') {
                    state.mouseover(function (e) {
                        if (map.zooming || map.panning) {
                            return
                        }
                        if (this.inactive != 'yes') {
                            var state = this;
                            state.toFront();
                            if (map.hover_state && map.hover_state != state.id) {
                                map.states[map.hover_state].mouseout()
                            }
                            map.hover_state = state.id;
                            if (state.hover_color != 'default') {
                                state.animate({
                                    'fill': state.hover_color
                                }, map.fade_time)
                            }
                            if (map.popups == 'on_hover' || map.popups == 'detect' && !map.is_mobile) {
                                map.show_popup(e, state)
                            }
                        }
                    });
                    state.mouseout(function () {
                        if (this.inactive != 'yes') {
                            var state = this;
                            state.animate({
                                'fill': state.color
                            }, map.fade_time);
                            map.hover_state = '';
                            if (map.popups != 'off') {
                                map.hide_popup()
                            }
                        }
                    });
                    state.mouseup(function (e) {
                        if (this.inactive != 'yes') {
                            var state = this;
                            if (map.panning) {
                                return
                            }
                            if (map.popups == 'on_click' || map.popups == 'detect' && map.is_mobile) {
                                map.show_popup(e, state)
                            }
                            if (state.url != 'default' && state.url != '') {
                                if (map.url_new_tab == 'yes') {
                                    win.open(state.url, '_blank')
                                } else {
                                    win.location.href = state.url
                                }
                            } else if (map_cfg.zoom == 'yes' && !map.zooming && map_data.regions) {
                                for (var region_id in map_data.regions) {
                                    if (map_data.regions[region_id].states.indexOf(state.id) != -1) {
                                        if (map.zoom_level == region_id) {
                                            map.zoom_out();
                                            break
                                        } else {
                                            map.zoom_to_region(region_id);
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
            }
        };
        Map.prototype.create_locations = function () {
            var map = this;
            if (!map_data.locations) {
                return
            }
            for (var location_id in map_data.locations) {
                var location_cfg = map_data.locations[location_id] || {};
                var location_name = location_cfg.name || '';
                var location_color = location_cfg.color || map.defaults.location.color;
                var location_hover_color = location_cfg.hover_color || location_color;
                var location_url = location_cfg.url || map.defaults.location.url;
                var location_description = location_cfg.description || map.defaults.location.description;
                var location_size = location_cfg.size || map.defaults.location.size;
                var location_type = location_cfg.type || map.defaults.location.type;
                var location_image_source = location_cfg.image_source || map.defaults.location.image_source;
                var location_opacity = location_cfg.opacity || map.defaults.location.opacity;
                var location_hover_opacity = location_cfg.hover_opacity || map.defaults.location.hover_opacity;
                var location_border = location_cfg.border || map.defaults.location.border;
                var location_border_color = location_cfg.border_color || map.defaults.location.border_color;
                var location_hover_border = location_cfg.hover_border || map.defaults.location.hover_border;
                var location_inactive = location_cfg.inactive || map.defaults.location.inactive;
                var location_hidden = location_cfg.hidden || map.defaults.location.hidden;
                var lat = location_cfg.lat;
                var lng = location_cfg.lng;
                var point = map.latlng_to_point(lat, lng);
                var x = point.x;
                var y = point.y;
                var location;
                if (location_type == 'circle') {
                    location = map.paper.circle(x, y, location_size)
                } else if (location_type == 'square') {
                    location = map.paper.rect(x - location_size / 2, y - location_size / 2, location_size, location_size)
                } else if (location_type == 'image') {
                    var image_url = map.images_directory && map.images_directory != 'default' ? map.images_directory + location_image_source : location_image_source;
                    location = map.paper.image(image_url, x - location_size / 2, y - location_size / 2, location_size, location_size)
                } else {
                    return
                }
                location.id = location_id;
                location.name = location_name;
                location.color = location_color;
                location.hover_color = location_hover_color;
                location.url = location_url;
                location.description = location_description;
                location.size = location_size;
                location.type = location_type;
                location.image_source = location_image_source;
                location.opacity = location_opacity;
                location.hover_opacity = location_hover_opacity;
                location.border = location_border;
                location.border_color = location_border_color;
                location.hover_border = location_hover_border;
                location.inactive = location_inactive;
                location.hidden = location_hidden;
                location.attrs.fill = location_color;
                location.attrs.stroke = location_border_color;
                location.attrs['stroke-width'] = location_border;
                location.attrs.opacity = location_opacity;
                location.attrs['cursor'] = 'pointer';
                if (location.hidden == 'yes') {
                    location.attrs.display = 'none'
                }
                location.attr(location.attrs);
                map.locations[location_id] = location;
                if (location.inactive != 'yes') {
                    location.mouseover(function (e) {
                        if (map.zooming || map.panning) {
                            return
                        }
                        var location = this;
                        if (location.hover_color != 'default') {
                            location.animate({
                                'fill': location.hover_color
                            }, map.fade_time)
                        }
                        location.animate({
                            'opacity': location.hover_opacity
                        }, map.fade_time);
                        location.animate({
                            'stroke-width': location.hover_border
                        }, map.fade_time);
                        if (map.popups == 'on_hover' || map.popups == 'detect' && !map.is_mobile) {
                            map.show_popup(e, location)
                        }
                    });
                    location.mouseout(function () {
                        var location = this;
                        location.animate({
                            'fill': location.color
                        }, map.fade_time);
                        location.animate({
                            'opacity': location.opacity
                        }, map.fade_time);
                        location.animate({
                            'stroke-width': location.border
                        }, map.fade_time);
                        if (map.popups != 'off') {
                            map.hide_popup()
                        }
                    });
                    location.mouseup(function (e) {
                        if (this.inactive != 'yes') {
                            var location = this;
                            if (map.panning) {
                                return
                            }
                            if (map.popups == 'on_click' || map.popups == 'detect' && map.is_mobile) {
                                map.show_popup(e, location)
                            }
                            if (location.url != 'default' && location.url != '') {
                                if (map.url_new_tab == 'yes') {
                                    win.open(location.url, '_blank')
                                } else {
                                    win.location.href = location.url
                                }
                            }
                        }
                    })
                }
            }
        };
        Map.prototype.create_labels = function () {
            var map = this;
            if (!map_data.labels) {
                return
            }
            for (var label_id in map_data.labels) {
                var label_cfg = map_data.labels[label_id] || {};
                var label_name = label_cfg.name || '';
                var label_color = label_cfg.color || map.defaults.label.color;
                var label_hover_color = label_cfg.hover_color || map.defaults.label.hover_color;
                var label_font = label_cfg.font || map.defaults.label.font;
                var label_size = label_cfg.size || map.defaults.label.size;
                var label_inactive = label_cfg.inactive || map.defaults.label.inactive;
                var lat = label_cfg.lat;
                var lng = label_cfg.lng;
                var point = map.latlng_to_point(lat, lng);
                var x = point.x;
                var y = point.y;
                var label = map.paper.text(x, y, label_name);
                label.id = label_id;
                label.name = label_name;
                label.color = label_color;
                label.hover_color = label_hover_color;
                label.font = label_font;
                label.size = label_size;
                label.inactive = label_inactive;
                label.attrs.fill = label_color;
                label.attrs['font-family'] = label_font;
                label.attrs['font-size'] = label_size;
                label.attrs['cursor'] = 'default';
                label.attr(label.attrs);
                map.labels[label_id] = label
            }
        };
        Map.prototype.create_popup = function () {
            var map = this;
            var popup_div = doc.createElement('div');
            map.popup.div = popup_div;
            map.popup.div.id = 'sm_popup_' + map.id;
            var popup_style = 'position:absolute; display:none;';
            if (!map.popup.nocss) {
                popup_style += ' background-color:' + map.popup.color + '; border-radius:' + map.popup.corners + 'px; box-shadow: 2px 2px ' + map.popup.shadow + 'px ' + map.popup.shadow + 'px rgba(0,0,0,0.5); font:' + map.popup.font + '; color: #000; padding:10px; white-space:nowrap; z-index:9999;';
            }
            map.popup.div.setAttribute('style', popup_style);
            map.div.appendChild(map.popup.div);
            var popup_text_div = doc.createElement('div');
            map.popup.text = popup_text_div;
            map.popup.div.appendChild(map.popup.text)
        };
        Map.prototype.show_popup = function (e, object) {
            var map = this;
            if (map.panning || map.zooming) {
                return
            }
            var description = object.description;
            if (description && description != 'default' && description != '') {
                var description_html = '<b>' + object.name + '</b>';
                if (description != 'default') {
                    description_html += '<br>' + description
                }
                if (object.url && object.url != 'default') {
                    description_html += '<br><a href=\'' + object.url + '\'>' + map.link_text + '</a>'
                }
                map.popup.text.innerHTML = description_html
            } else {
                map.popup.text.innerHTML = '<b>' + object.name + '</b>'
            }
            map.popup.div.style.display = 'block';
            map.popup.div.style.opacity = map.popup.opacity;
            var popup_width = map.popup.div.offsetWidth;
            var popup_height = map.popup.div.offsetHeight;
            var left = map.mouse_x - popup_width / 2;
            var top = map.mouse_y - popup_height - 15;
            if (left < 5) {
                left = 5
            }
            if (left + popup_width > map.width - 5) {
                left = map.width - popup_width - 5
            }
            if (top < 5) {
                top = map.mouse_y + 15
            }
            map.popup.div.style.left = left + 'px';
            map.popup.div.style.top = top + 'px'
        };
        Map.prototype.hide_popup = function () {
            var map = this;
            if (map.popup.div.style.display == 'block') {
                map.popup.div.style.display = 'none'
            }
        };
        Map.prototype.events = function () {
            var map = this;
            var on_mouse_move = function (e) {
                var e = e || win.event;
                var target = e.target || e.srcElement;
                if (target.parentNode.id && target.parentNode.id.substring(0, 7) == 'sm_hot') {
                    target = target.parentNode
                }
                var x, y;
                if (e.pageX) {
                    x = e.pageX;
                    y = e.pageY
                } else {
                    x = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft);
                    y = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop)
                }
                map.mouse_x = x - map.div.offsetLeft;
                map.mouse_y = y - map.div.offsetTop;
                if (map.panning) {
                    var dx = (map.mouse_x - map.pan_start_x) / map.scale;
                    var dy = (map.mouse_y - map.pan_start_y) / map.scale;
                    map.pan_start_x = map.mouse_x;
                    map.pan_start_y = map.mouse_y;
                    map.set_viewbox(map.viewbox_x - dx, map.viewbox_y - dy, map.viewbox_width, map.viewbox_height)
                }
            };
            if (win.addEventListener) {
                map.div.addEventListener('mousemove', on_mouse_move, false);
                map.div.addEventListener('mousedown', function (e) {
                    if (e.which == 1 && map_cfg.zoom == 'yes' && !map.is_mobile) {
                        var e = e || win.event;
                        var target = e.target || e.srcElement;
                        if (target.id && target.id.substring(0, 10) == 'sm_location') {} else if (target.parentNode.id && target.parentNode.id.substring(0, 10) == 'sm_location') {} else {
                            map.panning = true;
                            map.pan_start_x = map.mouse_x;
                            map.pan_start_y = map.mouse_y
                        }
                    }
                });
                map.div.addEventListener('mouseup', function (e) {
                    map.panning = false
                });
                var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
                if (map.div.attachEvent) {
                    map.div.attachEvent("on" + mousewheelevt, function (e) {
                        if (map_cfg.zoom == 'yes') {
                            var e = win.event || e;
                            var delta = e.detail ? e.detail * (-120) : e.wheelDelta;
                            if (delta > 0) {
                                map.zoom_in()
                            } else {
                                map.zoom_out()
                            }
                        }
                    })
                } else if (map.div.addEventListener) {
                    map.div.addEventListener(mousewheelevt, function (e) {
                        if (map_cfg.zoom == 'yes') {
                            var e = win.event || e;
                            var delta = e.detail ? e.detail * (-120) : e.wheelDelta;
                            if (delta > 0) {
                                map.zoom_in()
                            } else {
                                map.zoom_out()
                            }
                        }
                    }, false)
                }
            } else if (doc.attachEvent) {
                map.div.attachEvent('onmousemove', function () {
                    on_mouse_move()
                });
                map.div.attachEvent('onmousedown', function (e) {
                    var e = e || win.event;
                    var target = e.target || e.srcElement;
                    if (target.id && target.id.substring(0, 10) == 'sm_location') {} else if (target.parentNode.id && target.parentNode.id.substring(0, 10) == 'sm_location') {} else {
                        map.panning = true;
                        map.pan_start_x = map.mouse_x;
                        map.pan_start_y = map.mouse_y
                    }
                });
                map.div.attachEvent('onmouseup', function (e) {
                    map.panning = false
                })
            }
            if (map.is_mobile && map_cfg.zoom == 'yes') {
                map.div.addEventListener('touchstart', function (e) {
                    if (e.touches.length == 1) {
                        var touch = e.touches[0];
                        map.panning = true;
                        map.pan_start_x = touch.pageX - map.div.offsetLeft;
                        map.pan_start_y = touch.pageY - map.div.offsetTop
                    }
                }, false);
                map.div.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    if (e.touches.length == 1) {
                        var touch = e.touches[0];
                        var x = touch.pageX - map.div.offsetLeft;
                        var y = touch.pageY - map.div.offsetTop;
                        var dx = (x - map.pan_start_x) / map.scale;
                        var dy = (y - map.pan_start_y) / map.scale;
                        map.pan_start_x = x;
                        map.pan_start_y = y;
                        map.set_viewbox(map.viewbox_x - dx, map.viewbox_y - dy, map.viewbox_width, map.viewbox_height)
                    } else if (e.touches.length == 2) {
                        map.panning = false;
                        var touch1 = e.touches[0];
                        var touch2 = e.touches[1];
                        var x1 = touch1.pageX - map.div.offsetLeft;
                        var y1 = touch1.pageY - map.div.offsetTop;
                        var x2 = touch2.pageX - map.div.offsetLeft;
                        var y2 = touch2.pageY - map.div.offsetTop;
                        var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                        if (!map.pinch_dist_start) {
                            map.pinch_dist_start = dist
                        }
                        var pinch_ratio = dist / map.pinch_dist_start;
                        map.zoom_at_point(map.scale * pinch_ratio, (x1 + x2) / 2, (y1 + y2) / 2);
                        map.pinch_dist_start = dist
                    }
                }, false);
                map.div.addEventListener('touchend', function (e) {
                    if (e.touches.length == 0) {
                        map.panning = false;
                        map.pinch_dist_start = false
                    }
                }, false)
            }
        };
        Map.prototype.set_viewbox = function (x, y, width, height) {
            var map = this;
            map.viewbox_x = x;
            map.viewbox_y = y;
            map.viewbox_width = width;
            map.viewbox_height = height;
            map.paper.setViewBox(x, y, width, height)
        };
        Map.prototype.zoom_in = function () {
            var map = this;
            if (map.zooming) {
                return
            }
            if (map.scale >= map.zoom_max) {
                return
            }
            var new_scale = map.scale * map.zoom_percentage;
            map.zoom_to(new_scale)
        };
        Map.prototype.zoom_out = function () {
            var map = this;
            if (map.zooming) {
                return
            }
            if (map.scale <= map.zoom_min) {
                return
            }
            var new_scale = map.scale / map.zoom_percentage;
            if (map.zoom_out_incrementally == 'yes') {
                var current_level_id = map.zoom_level;
                if (current_level_id && current_level_id != 1) {
                    var current_level_scale = map_data.regions[current_level_id].scale;
                    var parent_level_id = map_data.regions[current_level_id].parent;
                    if (parent_level_id) {
                        var parent_level_scale = map_data.regions[parent_level_id].scale;
                        if (map.scale / map.zoom_percentage < parent_level_scale * .9) {
                            map.zoom_to_region(parent_level_id);
                            return
                        }
                    }
                }
            }
            map.zoom_to(new_scale)
        };
        Map.prototype.zoom_to = function (new_scale) {
            var map = this;
            map.zoom_at_point(new_scale, map.width / 2, map.height / 2)
        };
        Map.prototype.zoom_at_point = function (new_scale, x, y) {
            var map = this;
            if (map.zooming) {
                return
            }
            map.zooming = true;
            if (new_scale > map.zoom_max) {
                new_scale = map.zoom_max
            }
            if (new_scale < map.zoom_min) {
                new_scale = map.zoom_min
            }
            if (new_scale == map.zoom_min) {
                map.zoom_level = 1
            }
            var current_viewbox = map.paper.canvas.viewBox.baseVal;
            var current_x = current_viewbox.x;
            var current_y = current_viewbox.y;
            var current_width = current_viewbox.width;
            var current_height = current_viewbox.height;
            var new_width = map.width / new_scale;
            var new_height = map.height / new_scale;
            var new_x = current_x + current_width / 2 - (x / map.scale) - (new_width / 2 - (x / map.scale));
            var new_y = current_y + current_height / 2 - (y / map.scale) - (new_height / 2 - (y / map.scale));
            map.set_viewbox(new_x, new_y, new_width, new_height);
            map.scale = new_scale;
            setTimeout(function () {
                map.zooming = false
            }, map.zoom_time * 1000)
        };
        Map.prototype.zoom_to_region = function (region_id) {
            var map = this;
            var bbox = map_data.regions[region_id].bbox;
            var x = bbox[0],
                y = bbox[1],
                width = bbox[2],
                height = bbox[3];
            var new_scale = Math.min(map.width / width, map.height / height);
            map.zoom_level = region_id;
            map_data.regions[region_id].scale = new_scale;
            var new_width = map.width / new_scale;
            var new_height = map.height / new_scale;
            var new_x = x + width / 2 - new_width / 2;
            var new_y = y + height / 2 - new_height / 2;
            map.set_viewbox(new_x, new_y, new_width, new_height);
            map.scale = new_scale;
            map.zooming = true;
            setTimeout(function () {
                map.zooming = false
            }, map.zoom_time * 1000)
        };
        Map.prototype.zoom_solo = function (state_id) {
            var map = this;
            var bbox = map.states[state_id].getBBox();
            var x = bbox.x,
                y = bbox.y,
                width = bbox.width,
                height = bbox.height;
            var new_scale = Math.min(map.width / width, map.height / height);
            map.zoom_level = state_id;
            var new_width = map.width / new_scale;
            var new_height = map.height / new_scale;
            var new_x = x + width / 2 - new_width / 2;
            var new_y = y + height / 2 - new_height / 2;
            map.set_viewbox(new_x, new_y, new_width, new_height);
            map.scale = new_scale;
            map.zooming = true;
            setTimeout(function () {
                map.zooming = false
            }, map.zoom_time * 1000)
        };
        Map.prototype.latlng_to_point = function (lat, lng) {
            var map = this;
            lat = parseFloat(lat);
            lng = parseFloat(lng);
            var x = (lng + 180) * (map.width / 360);
            var latRad = lat * Math.PI / 180;
            var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
            var y = (map.height / 2) - (map.width * mercN / (2 * Math.PI));
            return {
                x: x,
                y: y
            }
        };
        Map.prototype.point_to_latlng = function (x, y) {
            var map = this;
            var lng = (x / map.width) * 360 - 180;
            var mercN = (y - map.height / 2) / -(map.width / (2 * Math.PI));
            var latRad = (Math.atan(Math.exp(mercN)) - Math.PI / 4) * 2;
            var lat = latRad * 180 / Math.PI;
            return {
                lat: lat,
                lng: lng
            }
        };
        var map_div = doc.getElementById(map_data.main_settings.div);
        if (map_div) {
            if (map_data.main_settings.width == 'responsive') {
                var width = map_div.offsetWidth;
                var height = width * .5;
                simplemaps_worldmap.map = new Map({
                    'id': map_data.main_settings.div,
                    'width': width,
                    'height': height,
                    'data': simplemaps_worldmap_mapdata
                })
            } else {
                simplemaps_worldmap.map = new Map({
                    'id': map_data.main_settings.div,
                    'data': simplemaps_worldmap_mapdata
                })
            }
        }
        map_loaded = true
    };
    var sm_load_interval = setInterval(function () {
        if (doc.readyState === "complete") {
            clearInterval(sm_load_interval);
            if (simplemaps_worldmap_mapdata.main_settings.auto_load == 'yes') {
                simplemaps_worldmap.load()
            }
        }
    }, 100)
})(window, document);

(function (win, doc) {
    if (win.Raphael) {
        return
    }
    var Raphael = win.Raphael = function (container, width, height) {
        return new Raphael._Paper(container, width, height)
    };
    Raphael.version = "1.5.2";
    Raphael._Paper = function (container, width, height) {
        container = Raphael._g.win.document.getElementById(container);
        var SVG = "http://www.w3.org/2000/svg",
            HAS = "hasOwnProperty",
            S = " ";
        var R = {
            create: function (tagName, parent, attributes) {
                var el = doc.createElementNS(SVG, tagName);
                for (var key in attributes) {
                    if (attributes[HAS](key)) {
                        el.setAttribute(key, attributes[key])
                    }
                }
                parent.appendChild(el);
                return el
            }
        };
        var paper = R.create("svg", container, {
            "xmlns": SVG,
            "version": "1.1",
            "width": width,
            "height": height
        });
        paper.style.overflow = "hidden";
        paper.style.position = "relative";
        paper.canvas = paper;
        paper.width = width;
        paper.height = height;
        paper.set = function (elements) {
            var set = new Raphael._Set(elements);
            return set
        };
        paper.setViewBox = function (x, y, w, h, fit) {
            paper.setAttribute("viewBox", [x, y, w, h].join(S));
            var paperw = this.width,
                paperh = this.height,
                pRatio = paperw / paperh,
                vRatio = w / h;
            if (!fit) {
                if (pRatio < vRatio) {
                    h = paperh * w / paperw
                } else {
                    w = paperw * h / paperh
                }
                paper.setAttribute("viewBox", [x, y, w, h].join(S))
            }
        };
        paper.path = function (pathString) {
            var el = R.create("path", paper, {
                "d": pathString,
                "fill": "#000"
            });
            el.attrs = {};
            el.attrs.path = pathString;
            el.attrs.stroke = "none";
            el.attrs['stroke-width'] = 1;
            el.attrs['stroke-linejoin'] = "miter";
            el.attrs['stroke-linecap'] = "miter";
            el.attrs['stroke-dasharray'] = "";
            el.attrs.opacity = 1;
            el.attrs.fill = "#000";
            el.style = {};
            el.style.cursor = "default";
            el.attr = function (params) {
                var el = this;
                for (var key in params) {
                    if (params[HAS](key)) {
                        el.setAttribute(key, params[key]);
                        el.attrs[key] = params[key]
                    }
                }
                return el
            };
            el.animate = function (params, ms, easing, callback) {
                var el = this;
                var from = {},
                    to = {};
                for (var key in params) {
                    if (params[HAS](key)) {
                        from[key] = el.attrs[key];
                        to[key] = params[key]
                    }
                }
                var start = (new Date).getTime();
                var anim = function () {
                    var now = (new Date).getTime();
                    var anitime = now - start;
                    var speed = anitime / ms;
                    if (speed >= 1) {
                        for (var key in to) {
                            if (to[HAS](key)) {
                                el.attr(key, to[key])
                            }
                        }
                        return
                    }
                    var eased = speed;
                    for (var key in to) {
                        if (to[HAS](key)) {
                            var new_val;
                            if (Raphael._g.is(from[key], "colour") && Raphael._g.is(to[key], "colour")) {
                                var from_rgb = Raphael.getRGB(from[key]);
                                var to_rgb = Raphael.getRGB(to[key]);
                                new_val = Raphael.rgb(from_rgb.r + (to_rgb.r - from_rgb.r) * eased, from_rgb.g + (to_rgb.g - from_rgb.g) * eased, from_rgb.b + (to_rgb.b - from_rgb.b) * eased)
                            } else {
                                new_val = from[key] + (to[key] - from[key]) * eased
                            }
                            el.attr(key, new_val)
                        }
                    }
                    setTimeout(anim, 10)
                };
                anim();
                return el
            };
            el.mouseover = function (f) {
                var el = this;
                el.node.addEventListener("mouseover", function (e) {
                    f.call(el, e)
                }, false);
                return el
            };
            el.mouseout = function (f) {
                var el = this;
                el.node.addEventListener("mouseout", function (e) {
                    f.call(el, e)
                }, false);
                return el
            };
            el.mouseup = function (f) {
                var el = this;
                el.node.addEventListener("mouseup", function (e) {
                    f.call(el, e)
                }, false);
                return el
            };
            el.getBBox = function () {
                return this.node.getBBox()
            };
            el.toFront = function () {
                this.node.parentNode.appendChild(this.node)
            };
            el.hide = function () {
                this.attr("display", "none")
            };
            el.show = function () {
                this.attr("display", "")
            };
            return el
        };
        paper.circle = function (x, y, r) {
            var el = R.create("circle", paper, {
                "cx": x,
                "cy": y,
                "r": r,
                "fill": "#000"
            });
            el.attrs = {};
            el.attrs.cx = x;
            el.attrs.cy = y;
            el.attrs.r = r;
            el.attrs.stroke = "none";
            el.attrs['stroke-width'] = 1;
            el.attrs.opacity = 1;
            el.attrs.fill = "#000";
            el.style = {};
            el.style.cursor = "default";
            el.attr = paper.path().attr;
            el.animate = paper.path().animate;
            el.mouseover = paper.path().mouseover;
            el.mouseout = paper.path().mouseout;
            el.mouseup = paper.path().mouseup;
            el.getBBox = paper.path().getBBox;
            el.toFront = paper.path().toFront;
            el.hide = paper.path().hide;
            el.show = paper.path().show;
            return el
        };
        paper.rect = function (x, y, w, h, r) {
            var el = R.create("rect", paper, {
                "x": x,
                "y": y,
                "width": w,
                "height": h,
                "r": r || 0,
                "rx": r || 0,
                "ry": r || 0,
                "fill": "#000"
            });
            el.attrs = {};
            el.attrs.x = x;
            el.attrs.y = y;
            el.attrs.width = w;
            el.attrs.height = h;
            el.attrs.r = r || 0;
            el.attrs.rx = r || 0;
            el.attrs.ry = r || 0;
            el.attrs.stroke = "none";
            el.attrs['stroke-width'] = 1;
            el.attrs.opacity = 1;
            el.attrs.fill = "#000";
            el.style = {};
            el.style.cursor = "default";
            el.attr = paper.path().attr;
            el.animate = paper.path().animate;
            el.mouseover = paper.path().mouseover;
            el.mouseout = paper.path().mouseout;
            el.mouseup = paper.path().mouseup;
            el.getBBox = paper.path().getBBox;
            el.toFront = paper.path().toFront;
            el.hide = paper.path().hide;
            el.show = paper.path().show;
            return el
        };
        paper.image = function (src, x, y, w, h) {
            var el = R.create("image", paper, {
                "x": x,
                "y": y,
                "width": w,
                "height": h,
                "preserveAspectRatio": "none"
            });
            el.setAttributeNS("http://www.w3.org/1999/xlink", "href", src);
            el.attrs = {};
            el.attrs.x = x;
            el.attrs.y = y;
            el.attrs.width = w;
            el.attrs.height = h;
            el.attrs.src = src;
            el.style = {};
            el.style.cursor = "default";
            el.attr = paper.path().attr;
            el.animate = paper.path().animate;
            el.mouseover = paper.path().mouseover;
            el.mouseout = paper.path().mouseout;
            el.mouseup = paper.path().mouseup;
            el.getBBox = paper.path().getBBox;
            el.toFront = paper.path().toFront;
            el.hide = paper.path().hide;
            el.show = paper.path().show;
            return el
        };
        paper.text = function (x, y, text) {
            var el = R.create("text", paper, {
                "x": x,
                "y": y,
                "text-anchor": "middle",
                "fill": "#000"
            });
            el.node.innerHTML = text;
            el.attrs = {};
            el.attrs.x = x;
            el.attrs.y = y;
            el.attrs.text = text;
            el.attrs.stroke = "none";
            el.attrs['font-size'] = 12;
            el.attrs['font-family'] = "Arial";
            el.attrs.fill = "#000";
            el.style = {};
            el.style.cursor = "default";
            el.attr = paper.path().attr;
            el.animate = paper.path().animate;
            el.mouseover = paper.path().mouseover;
            el.mouseout = paper.path().mouseout;
            el.mouseup = paper.path().mouseup;
            el.getBBox = paper.path().getBBox;
            el.toFront = paper.path().toFront;
            el.hide = paper.path().hide;
            el.show = paper.path().show;
            return el
        };
        return paper
    };
    Raphael._Set = function (elements) {
        var set = this;
        set.items = [];
        set.length = 0;
        set.push = function (el) {
            set.items.push(el);
            set.length++
        };
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                set.push(elements[i])
            }
        }
        set.attr = function (params) {
            for (var i = 0; i < set.length; i++) {
                set.items[i].attr(params)
            }
            return set
        };
        set.animate = function (params, ms, easing, callback) {
            for (var i = 0; i < set.length; i++) {
                set.items[i].animate(params, ms, easing, callback)
            }
            return set
        };
        set.mouseover = function (f) {
            for (var i = 0; i < set.length; i++) {
                set.items[i].mouseover(f)
            }
            return set
        };
        set.mouseout = function (f) {
            for (var i = 0; i < set.length; i++) {
                set.items[i].mouseout(f)
            }
            return set
        };
        set.mouseup = function (f) {
            for (var i = 0; i < set.length; i++) {
                set.items[i].mouseup(f)
            }
            return set
        };
        set.getBBox = function () {
            var x = [],
                y = [],
                x2 = [],
                y2 = [];
            for (var i = 0; i < set.length; i++) {
                var bbox = set.items[i].getBBox();
                x.push(bbox.x);
                y.push(bbox.y);
                x2.push(bbox.x + bbox.width);
                y2.push(bbox.y + bbox.height)
            }
            x = Math.min.apply(0, x);
            y = Math.min.apply(0, y);
            return {
                x: x,
                y: y,
                width: Math.max.apply(0, x2) - x,
                height: Math.max.apply(0, y2) - y
            }
        };
        set.toFront = function () {
            for (var i = 0; i < set.length; i++) {
                set.items[i].toFront()
            }
        };
        set.hide = function () {
            for (var i = 0; i < set.length; i++) {
                set.items[i].hide()
            }
        };
        set.show = function () {
            for (var i = 0; i < set.length; i++) {
                set.items[i].show()
            }
        };
        set.forEach = function (callback) {
            for (var i = 0; i < set.length; i++) {
                callback.call(set.items[i], i)
            }
        };
        return set
    };
    Raphael._g = {
        win: win,
        is: function (o, type) {
            type = String.prototype.toLowerCase.call(type);
            if (type == "finite") {
                return isFinite(o)
            }
            return (type == "null" && o === null) || (type == typeof o) || (type == "object" && o === Object(o)) || (type == "array" && Array.isArray && Array.isArray(o)) || Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type
        },
    };
    var C = function (a, b, c) {
            return (a - b) / (c - b)
        },
        c = function (a, b, c) {
            return a * (c - b) + b
        };
    Raphael.getRGB = function (colour) {
        var result;
        if (colour && colour.constructor == Array && colour.length == 3) {
            return {
                r: colour[0],
                g: colour[1],
                b: colour[2]
            }
        }
        if (result = /rgb\(\s*([\d]{1,3})\s*,\s*([\d]{1,3})\s*,\s*([\d]{1,3})\s*\)/.exec(colour)) {
            return {
                r: parseInt(result[1]),
                g: parseInt(result[2]),
                b: parseInt(result[3])
            }
        }
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(colour)) {
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
        }
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(colour)) {
            return {
                r: parseInt(result[1] + result[1], 16),
                g: parseInt(result[2] + result[2], 16),
                b: parseInt(result[3] + result[3], 16)
            }
        }
        var color = Raphael._g.win.document.getElementsByTagName("head")[0].appendChild(Raphael._g.win.document.createElement("div"));
        color.style.color = colour;
        var r, g, b;
        if (Raphael._g.win.getComputedStyle) {
            var style = Raphael._g.win.document.defaultView.getComputedStyle(color, null);
            r = style.getPropertyValue("color").match(/(\d+)/g)[0];
            g = style.getPropertyValue("color").match(/(\d+)/g)[1];
            b = style.getPropertyValue("color").match(/(\d+)/g)[2]
        } else {
            return {
                r: 255,
                g: 255,
                b: 255
            }
        }
        return {
            r: r,
            g: g,
            b: b
        }
    };
    Raphael.rgb = function (r, g, b) {
        return "rgb(" + [r, g, b].join(",") + ")"
    };
    Raphael.hsb = function (h, s, b) {
        return Raphael.hsbtorgb(h, s, b).hex
    };
    Raphael.hsl = function (h, s, l) {
        return Raphael.hsltorgb(h, s, l).hex
    };
    Raphael.hsbtorgb = function (h, s, v, R) {
        var r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break
        }
        var rgb = {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
        if (R) {
            return rgb
        } else {
            return {
                hex: "#" + (16777216 | rgb.b | (rgb.g << 8) | (rgb.r << 16)).toString(16).slice(1),
                r: rgb.r,
                g: rgb.g,
                b: rgb.b
            }
        }
    };
    Raphael.hsltorgb = function (h, s, l, R) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p
            }
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3)
        }
        var rgb = {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
        if (R) {
            return rgb
        } else {
            return {
                hex: "#" + (16777216 | rgb.b | (rgb.g << 8) | (rgb.r << 16)).toString(16).slice(1),
                r: rgb.r,
                g: rgb.g,
                b: rgb.b
            }
        }
    };
    Raphael.rgbtohsb = function (r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, v = max;
        var d = max - min;
        s = max == 0 ? 0 : d / max;
        if (max == min) {
            h = 0
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break
            }
            h /= 6
        }
        return {
            h: h,
            s: s,
            b: v
        }
    };
    Raphael.rgbtohsl = function (r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break
            }
            h /= 6
        }
        return {
            h: h,
            s: s,
            l: l
        }
    }
})(window, document);
