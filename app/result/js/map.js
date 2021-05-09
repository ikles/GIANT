// $(document).ready(function(){
//
//
// });

ymaps.ready(init);
function init(){

    var dataPoints = Array();
    var $storesList = $('.stores__list');
    var storesListBar = new SimpleBar($storesList[0], {
        autoHide: false,
    });
    var $contentBarEl = $(storesListBar.getContentElement());

    var storesMap = new ymaps.Map("stores-map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });

    var objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.

    var iconColor = 'blue';

    if ($('.theme-blue').length) {
        iconColor = 'blue';
    }
    if ($('.theme-green').length) {
        iconColor = 'green';
    }
    if ($('.theme-red').length) {
        iconColor = 'red';
    }
    if ($('.theme-orange').length) {
        iconColor = 'orange';
    }


    objectManager.objects.options.set('preset', 'islands#'+iconColor+'DotIcon');
    objectManager.clusters.options.set('preset', 'islands#'+iconColor+'ClusterIcons');
    storesMap.geoObjects.add(objectManager);

    $.ajax({
        url: "/js/stores.json"
    }).done(function(data) {
        objectManager.add(data);
        var dataObj = JSON.parse(data);
        //console.log(dataObj);
        var activeClass = '';
        for(var i = 0; i < dataObj.features.length; i++) {

            if ( i === 0 ) {
                activeClass = 'active';
            }
            else {
                activeClass = '';
            }
            //$storesList.append('<div class="store" data-location-id="' + i + '">' + data.features[i].properties.balloonContentHeader + data.features[i].properties.balloonContentBody + '</div>');
            $contentBarEl.append('<div class="store ' + activeClass + '" data-location-id="' + i + '">' + dataObj.features[i].properties.balloonContentHeader + dataObj.features[i].properties.balloonContentBody + '</div>');
            if ( i === (dataObj.features.length - 1) ) {
                storesListBar.recalculate();
            }
        }

        $storesList.on('click', '.store', function () {
            var locationID = $(this).data('location-id');
            $('.stores__list .store').removeClass('active');
            $(this).addClass('active');
            storesMap.setCenter(dataObj.features[locationID].geometry.coordinates, 16);
        });

    });


}

