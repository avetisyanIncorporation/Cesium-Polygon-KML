function init(viewer){
try{
	
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
	
	polygon.then(function(dataSource){
		
            var myPolygon = dataSource.entities.getById('myPolygonExample');
			
        });
	
	setTimeout(function() {
		viewer.zoomTo(polygon, new Cesium.HeadingPitchRange(0, -100, 1500)) }, 1500);

	
	
	/*var lon = 45.3662784465226;
	var lat = 40.81884427772081;
	var buffer = [
	[45.3662784465226,40.81884427772081],
	[45.365640222455,40.81986126286519],
	[45.3652480684771,40.81926777010555],
	[45.36666937925,40.81942987753481]
	];
	var heightBuffer = new Uint16Array(buffer,0);
	var terrainData = new Cesium.HeightmapTerrainData({
	  buffer : heightBuffer,
	  width : lon,
	  height : lat
	});
		
	//var rectangle = new Cesium.Rectangle(45.3652480684771,40.81884427772081,45.36666937925,40.81986126286519);
	var rectangle = new Cesium.Rectangle(0.79, 0.71, 0.79, 0.71);
	var terrainHeight = terrainData.interpolateHeight(rectangle, lon, lat);
	
	alert(terrainHeight);*/
	
	
	
	
}catch(e){
	alert(e);
}

};