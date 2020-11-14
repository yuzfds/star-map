import * as Cesium from 'cesium/Cesium'
import MAP_LAYER_TYPES from "star-map/constants/mapLayerTypes";

class StarMap {
    constructor() {
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
        this.atlas3D = new Cesium.Viewer('mapContianer', {
            imageryProvider: new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
            }),
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
        });
        this.atlas3D._cesiumWidget._creditContainer.style.display = "none";
        this.atlas3D.imageryLayers.removeAll(true);
        this.layers = [];
    }

    /**
     * 添加图层
     * @param {Object} options
     * @param {String} options.url 图层请求地址
     * @param {String} [options.format] MIME类别
     * @param {String} options.layerName 图层名
     * @param {Number} [options.maximumLevel] 最大层级
     * @param {Number} [options.minimumLevel] 最小层级
     * @param {String} [options.credit] 版权
     * @param {String} options.type  类别
     */
    addLayer(options) {
        let imageryProvider;
        if (options.type === MAP_LAYER_TYPES.WMTS) {
            if(options.credit){
                options.credit = new Cesium.Credit(options.credit);
            }
            options.layer = options.layerName;
            options.tileMatrixSetID = options.layerName;
            imageryProvider = new Cesium.WebMapTileServiceImageryProvider(options);
        }
        if(imageryProvider){
            this.atlas3D.imageryLayers.addImageryProvider(imageryProvider);
            this.layers.push(imageryProvider);
        }
    }

    removeLayer(){

    }

}


export default StarMap;
