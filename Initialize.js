function init(viewer){
viewer.dataSources.add(Cesium.KmlDataSource.load('z1.kml',
		 {
			  camera: viewer.scene.camera,
			  canvas: viewer.scene.canvas,
			  clampToGround: true,
		 })
	);

	var deg1 = 45.3662784465226;
	var deg2 = 40.81884427772081;

	setTimeout(function() {
			viewer.camera.flyTo({
			destination : Cesium.Cartesian3.fromDegrees(deg1, deg2, 1500.0)
		});
		}, 1100);
};