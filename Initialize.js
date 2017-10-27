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
	
	polygon.then(dataSource =>{
			
		var myPolygon = dataSource.entities.getById('myPolygonExample');
		//var myPolygon = dataSource.entities.values[0];		
		var position = myPolygon.polygon.hierarchy.getValue().positions[0];
		//alert(Cesium.Cartographic.fromDegrees(position.x,position.y));
	});
	
	setTimeout(function() {
		viewer.zoomTo(polygon, new Cesium.HeadingPitchRange(0, -100, 1500)) 
		}, 1500);
		
	var positions = [
		Cesium.Cartographic.fromDegrees(45, 40)
	];		
	
	var ourHeight = 10;
	var newHeight;
	
	var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, positions);
	Cesium.when(promise, function(updatedPositions) {
		newHeight = updatedPositions[0].height + ourHeight;
		alert(newHeight);
	});
	
	//выставить наш полигон на высоту newHeight
	
}catch(e){
	alert(e);
}

};