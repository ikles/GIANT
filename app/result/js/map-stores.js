$(document).ready(function(){
    if ($('#stores-map').length) {ymaps.ready(initStoresMap);}
    if ($('#office-moscow').length) {ymaps.ready(initMoscowOfficeMap);}
    if ($('#office-saint-petersburg').length) {ymaps.ready(initSaintPetersburgOfficeMap);}
    if ($('#pickup-map').length) {ymaps.ready(initPickupMap);}
});

// Examples with ajax requests
function initStoresMap() {initMap('stores-map', [55.76, 37.64], 11, 'js/stores.json');}
function initPickupMap() {initMap('pickup-map', [55.831903, 37.411961], 11, 'js/stores2.json');}

// Examples without ajax requests
function initMoscowOfficeMap() {
    var objJson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "id": 0,
            "geometry": {
                "type": "Point",
                "coordinates": [55.654940, 37.631038]
            },
            "properties": {
                "balloonContentHeader": "<span class='store__title'>Офис Giant в Москве</span>",
                "balloonContentBody": "<span class='store__address'>Каширский проезд, д. 17, кор. 9</span><a href='tel:+74952762886' class='store__phone'>+7 (495) 276-28-86</a><span class='store__shedule'>Пн-пт: 9:00-19:00; сб-вс: с 11:00-19:00</span><a class='store__email' href='mailto:info@giant-rus.ru'>info@giant-rus.ru</a><a class='store__site' href='https://giant-rus.ru' target='_blank'>giant-rus.ru</a>",
                "balloonContentFooter": "",
                "clusterCaption": "Офис Giant в Москве",
                "hintContent": ""
            }
        }
        ]
    };
    initMap('office-moscow', [55.654940, 37.631038], 11, false, objJson);
}
function initSaintPetersburgOfficeMap() {
    var objJson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "id": 0,
            "geometry": {
                "type": "Point",
                "coordinates": [59.939095, 30.315868]
            },
            "properties": {
                "balloonContentHeader": "<span class='store__title'>Офис Giant в Санкт-Петербурге</span>",
                "balloonContentBody": "<span class='store__address'>Каширский проезд, д. 17, кор. 9</span><a href='tel:+74952762886' class='store__phone'>+7 (495) 276-28-86</a><span class='store__shedule'>Пн-пт: 9:00-19:00; сб-вс: с 11:00-19:00</span><a class='store__email' href='mailto:info@giant-rus.ru'>info@giant-rus.ru</a><a class='store__site' href='https://giant-rus.ru' target='_blank'>giant-rus.ru</a>",
                "balloonContentFooter": "",
                "clusterCaption": "Офис Giant в Санкт-Петербурге",
                "hintContent": ""
            }
        }
        ]
    };
    initMap('office-saint-petersburg', [59.939095, 30.315868], 11, false, objJson);
}

// Common init map function
function initMap(containerId, centerCoordinates, zoom, jsonUrl, jsonContent) {

    var storesMap = new ymaps.Map(containerId, {
        center: centerCoordinates,
        zoom: zoom,
        // controls: ['geolocationControl', 'zoomControl']
        controls: []
    });

    storesMap.behaviors.disable('scrollZoom');
    // storesMap.behaviors.disable('drag');

    // Создадим пользовательский макет ползунка масштаба.
    var ZoomLayout = ymaps.templateLayoutFactory.createClass('<div class="giant-map-zoom">' +
        '<div id="' + containerId + '--zoom-in" class="giant-map-zoom__btn giant-map-zoom__up"></div>' +
        '<div id="' + containerId + '--zoom-out" class="giant-map-zoom__btn giant-map-zoom__down"></div>' +
        '</div>', {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            $('#' + containerId + '--zoom-in').bind('click', this.zoomInCallback);
            $('#' + containerId + '--zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            $('#' + containerId + '--zoom-in').unbind('click', this.zoomInCallback);
            $('#' + containerId + '--zoom-out').unbind('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
        }
    });

    var GeolocationLayout = ymaps.templateLayoutFactory.createClass('<div class="giant-map-geolocation">'+
        '<div id="' + containerId + '--geolocation" class="giant-map-geolocation__btn">'+
        '<svg class="giant-map-geolocation__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M5.69,11.26c.31,1,.91,1,1.33.08L11.83,1.05c.42-.91,0-1.3-.88-.88L.66,5c-.91.43-.87,1,.07,1.34L4.45,7.55Z"/></svg>' +
        '</div>'+
        '</div>');

    var mapHeight = storesMap.container.getSize()[1];

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            layout: ZoomLayout,
            position: {
                right: '12px',
                top: mapHeight / 2 - 57 + 'px',
            }
        }
    });

    var geolocationControl = new ymaps.control.GeolocationControl({
        options: {
            layout: GeolocationLayout,
            position: {
                right: '12px',
                top: mapHeight / 2 + 25 + 'px',
            }
        }
    });

    storesMap.controls.add(zoomControl);
    storesMap.controls.add(geolocationControl);

    storesMap.events.add('sizechange', function (e) {
        // mapHeight = storesMap.container.getSize()[1];
        mapHeight = e.get('newSize')[1];
        zoomControl.options.set({position: {right: '12px', top: mapHeight / 2 - 57 + 'px'}});
        geolocationControl.options.set({position: {right: '12px', top: mapHeight / 2 + 25 + 'px'}});
    });

    var objectManager = new ymaps.ObjectManager({
        // clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    var giantPlacemarkLayout = ymaps.templateLayoutFactory.createClass('<svg class="giant-map-placemark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="28" height="40"><circle fill="#ffffff" class="cls-1" cx="14" cy="14" r="6"/><path fill="#06038d" d="M14,0A14,14,0,0,0,0,14C0,24.5,14,40,14,40S28,24.5,28,14A14,14,0,0,0,14,0Zm0,19a5,5,0,1,1,5-5A5,5,0,0,1,14,19Z"/></svg>');

    // Создание макета балуна на основе Twitter Bootstrap.
    var giantBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="giant-map-balloon">' +
        '<button class="giant-map-balloon__close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path fill-rule="evenodd" d="M14 .7l-.7-.7L7 6.3.7 0 0 .7 6.3 7 0 13.3l.7.7L7 7.7l6.3 6.3.7-.7L7.7 7z" clip-rule="evenodd"/></svg></button>' +
        '<div class="giant-map-balloon__arrow"></div>' +
        '<div class="giant-map-balloon__inner">' +
        '$[[options.contentLayout observeSize minWidth=240 maxWidth=280 maxHeight=350]]' +
        '</div>' +
        '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
             build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.giant-map-balloon', this.getParentElement());
                this.applyElementOffset();
                this._$element.find('.giant-map-balloon__close').on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
             clear: function () {
                this._$element.find('.giant-map-balloon__close').off('click');
                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
             onSublayoutSizeChange: function () {
                giantBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._$element)) {return;}
                this.applyElementOffset();
                this.events.fire('shapechange');
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
             applyElementOffset: function () {
                this._$element.css({
                    // left: -(this._$element[0].offsetWidth / 2),
                    // top: -(this._$element[0].offsetHeight + this._$element.find('.giant-map-balloon__arrow')[0].offsetHeight)
                    left: this._$element.find('.giant-map-balloon__arrow')[0].offsetWidth + 22,
                    top: -28
                });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
             onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire('userclose');
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
             getShape: function () {
                if(!this._isElement(this._$element)) {
                    return giantBalloonLayout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                    position.left + this._$element[0].offsetWidth,
                    position.top + this._$element[0].offsetHeight + this._$element.find('.giant-map-balloon__arrow')[0].offsetHeight
                    ]
                    ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
             _isElement: function (element) {
                return element && element[0] && element.find('.giant-map-balloon__arrow')[0];
            }
        });

    // Создание вложенного макета содержимого балуна.
    var giantBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="giant-map-balloon__header">$[properties.balloonHeader]</div>' +
        '<div class="giant-map-balloon__content">$[properties.balloonContent]</div>'
        );

    objectManager.objects.options.set({
        iconLayout: giantPlacemarkLayout,
        iconShape: {type: 'Rectangle', coordinates: [[-14, -40], [14, 0]]},
        hideIconOnBalloonOpen: false,
        balloonOffset: [0, -40],
        balloonLayout: giantBalloonLayout,
        // balloonContentLayout: giantBalloonContentLayout
        // panelMaxMapArea: 'Infinity'
    });

    storesMap.geoObjects.add(objectManager);

    if (typeof jsonContent !== 'undefined') {
        objectManager.add(jsonContent);
        storesMap.setBounds(storesMap.geoObjects.getBounds(), { checkZoomRange: true });
    }
    else {
        $.ajax({url: jsonUrl}).done(function(data) {
            objectManager.add(data);
            storesMap.setBounds(storesMap.geoObjects.getBounds(), { checkZoomRange: true });
        });
    }

}