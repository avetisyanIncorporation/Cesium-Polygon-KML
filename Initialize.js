function init(viewer){

	viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
		url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
		requestWaterMask : true,
		requestVertexNormals : true
	});
	
	var polygon = Cesium.KmlDataSource.load('z1.kml',
		{
			camera: viewer.scene.camera,
			canvas: viewer.scene.canvas,
			clampToGround : true
		});
	viewer.dataSources.add(polygon);
	
	var data = {
		coords: [],
		oldHeights: []
	};
	
	polygon
	.then(dataSource =>{
		var myPolygon = dataSource.entities.getById('myPolygonExample');
		var positions = myPolygon.polygon.hierarchy.getValue().positions;
		data.coords = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
		for(var i in data.coords){
			data.oldHeights.push(data.coords[i].height);
		}
		return polygon;
	})
	.then( () => {
		var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, data.coords);
		return promise;
	})
	.then( () => {
		return polygon;
	})
	.then(dataSource => {
		for(var i in data.coords){
			data.coords[i].height += data.oldHeights[i];
		}
		var myPolygon = dataSource.entities.getById('myPolygonExample');
		myPolygon.polygon.hierarchy.getValue().positions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(data.coords);
		return polygon;
	})
	.then( () => {
		viewer.zoomTo(polygon, new Cesium.HeadingPitchRange(0, -100, 1500));
	});
	
};