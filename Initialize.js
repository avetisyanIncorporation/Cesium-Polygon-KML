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
	
	var coords=[];
	
	polygon.then(dataSource =>{
		var myPolygon = dataSource.entities.getById('myPolygonExample');
		//var myPolygon = dataSource.entities.values[0];		
		var positions = myPolygon.polygon.hierarchy.getValue().positions;
		coords = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
		
		alert(coords);
	});
	
	setTimeout(function() {
	
	//var ourHeight = 100;
	var oldHeights=[];
	for(var i = 0; i < coords.length; i++){
		oldHeights.push(coords[i].height);
	}
	
	var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, coords);
	Cesium.when(promise, function(updatedPositions) {
		
		for(var i = 0; i < updatedPositions.length; i++){
			coords[i].height += oldHeights[i];
			//newHeight = updatedPositions[i].height + ourHeight;
		}
	});
	
	setTimeout(function() {
		
		alert(coords);
		//выставить наш полигон на высоту newHeight
		
	},100);
	
	},500);
	
	setTimeout(function() {
		viewer.zoomTo(polygon, new Cesium.HeadingPitchRange(0, -100, 1500)) 
		}, 1500);
	
}catch(e){
	alert(e);
}

};