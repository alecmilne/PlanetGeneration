/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//really good tutorial on how to make planets from textures with three.js
//http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/

//http://blog.thematicmapping.org/2013/09/creating-webgl-earth-with-threejs.html



var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//canvas.width = window.innerWidth;
canvas.width = 1200;
//canvas.height = window.innerHeight;
canvas.height = 700;
document.body.appendChild(canvas);

var renderer;
var scene;
var camera;
var planetMesh;
var earthMesh;
var cloudMeshFar;
var cloudMeshNear;
var d_duration;

function color(number) {
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 255;
}

init();
function init() {
	
//function init() {
//set the scene size
var WIDTH = canvas.width,
	HEIGHT = canvas.height;

//set some camera attributes
var VIEW_ANGLE = 15,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.01,
	FAR = 1000;

var $container = $('#container');


renderer = new THREE.WebGLRenderer();
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

scene = new THREE.Scene();

//the camera starts at 0, 0, 0
camera.position.z = 10;

scene.add(camera);

//start the renderer
renderer.setSize(WIDTH, HEIGHT);

//attach the render-supplied DOM element
$container.append(renderer.domElement);


/*
//create the sphere's material
var sphereMaterial = new THREE.MeshBasicMaterial( { color:0xCC0000, wireframe: true });

//var sphereMaterial = new THREE.MeshLambertMaterial( { color:0xCC0000 });

//set up the sphere vars
var radius = 50, segments = 16, rings = 16;

//create a new mesh with sphere geometry
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(radius, segments, rings),
	sphereMaterial);

var matrix = new THREE.Matrix4();
matrix.makeRotationZ(-Math.PI/8);
sphere.applyMatrix(matrix);

matrix.makeRotationX(-Math.PI/8);
sphere.applyMatrix(matrix);*/

//matrix.makeRotationY(-Math.PI/8);
//sphere.applyMatrix(matrix);

//add the sphere to the scene
//scene.add(sphere);

/*
var mapImage = THREE.ImageUtils.loadTexture("images/earthmap1k.jpg");
var mapHeight = THREE.ImageUtils.loadTexture("images/earthbump1k.jpg");
var mapSpecular = THREE.ImageUtils.loadTexture("images/earthspec1k.jpg");


var earthMaterial = new THREE.MeshPhongMaterial({
	map: mapImage,
	//map: texture2,
	side: THREE.FrontSide,
	transparent: false,
	opacity: 1,
	//map: texture
	//map: mapHeight,
	bumpMap: mapHeight,
	bumpScale: 0.05,
	specularMap: mapSpecular,
	specular: new THREE.Color('grey')
});*/
var earthMaterial = generateEarth();
earthMesh = new THREE.Mesh( new THREE.SphereGeometry(0.5, 32, 32), earthMaterial);

//var cldImage = THREE.ImageUtils.loadTexture("images/fair_clouds_8k.jpg");
//var canvas2 = generateMoire();

var d_start = new Date();

var planetMaterial = generatePlanet();

var d_end = new Date();

d_duration = d_end - d_start;
/*var canvas2 = generateMoire32();
var texture2 = new THREE.Texture(canvas2);
texture2.needsUpdate = true;
var planetMaterial = new THREE.MeshPhongMaterial({
	//map: mapImage,
	map: texture2,
	side: THREE.FrontSide,
	transparent: false,
	opacity: 1
	//map: texture
	//map: mapHeight,
	//bumpMap: mapHeight,
	//bumpScale: 0.5
	//specularMap: THREE.ImageUtils.loadTexture('images/Earth2/water_4k.png'),
	//specular: new THREE.Color('grey')
});*/


//var canvasClouds = ;
var textureCloud = new THREE.Texture(generateClouds32());
textureCloud.needsUpdate = true;

var cloudMaterialFar = new THREE.MeshPhongMaterial({
	//map:cldImage,
	map: textureCloud,
	transparent: true,
	side: THREE.BackSide
	
	//transparent: true,
	//opacity: 0.5
});

var cloudMaterialNear = new THREE.MeshPhongMaterial({
	//map:cldImage,
	map: textureCloud,
	transparent: true,
	side: THREE.FrontSide
	
	//transparent: true,
	//opacity: 0.5
});
//cloudMaterial.side = THREE.BackSide;

cloudMeshFar = new THREE.Mesh( new THREE.SphereGeometry(1.5, 32, 32), cloudMaterialFar);

cloudMeshNear = new THREE.Mesh(	new THREE.SphereGeometry(1.5, 32, 32), cloudMaterialNear);


planetMesh = new THREE.Mesh( new THREE.SphereGeometry(0.5, 32, 32), planetMaterial);
	


/*
var earthMesh = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 32),
	new THREE.MeshPhongMaterial({
		//map: THREE.ImageUtils.loadTexture('images/Earth2/no_clouds_4k.jpg'),
		//bumpMap: THREE.ImageUtils.loadTexture('images/Earth2/no_clouds_4k.jpg'),
		//bumpMap: THREE.ImageUtils.loadTexture('images/Earth2/elev_bump_4k.jpg'),
		bumpMap: mapHeight,
		//bumpScale: 0.5,
		specularMap: THREE.ImageUtils.loadTexture('images/Earth2/water_4k.png'),
		specular: new THREE.Color('grey')
	})
);*/
scene.add(planetMesh);
//scene.add(earthMesh);
//scene.add(cloudMeshFar);
//scene.add(cloudMeshNear);

//create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);

//set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

//add to the scene
scene.add(pointLight);

scene.add(new THREE.AmbientLight(0x333333));

/*var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);*/




//}
//draw!
//renderer.render(scene, camera);



//var controls = new THREE.TrackballControls(camera);
/*
var main = function () {
	//sphere.translateX(1);
	//camera.position.z += 1;
	renderer.render(scene, camera);
};

setInterval(main, 1); // Execute as fast as possible
*/

//var controls = new THREE.TrackballControls(camera);

render();
}

function render() {
	//controls.update();
	
	planetMesh.rotation.y += 0.0035;
	planetMesh.rotation.x -= 0.0005;
	planetMesh.rotation.z -= 0.0005;
	
	//earthMesh.rotation.y += 0.0035;
	//earthMesh.rotation.x -= 0.0005;
	//earthMesh.rotation.z -= 0.0005;
	
	cloudMeshFar.rotation.y = -2;
	cloudMeshNear.rotation.y = -2;
	
	//earthMesh.rotation.y = 1;
	//earthMesh.rotation.x = 1;
	//earthMesh.rotation.z = 0;
	
	ctx.font="30px Arial";
	ctx.fillText(d_duration, 10, 50);
	
	//clouds.rotation.y += 0.0005;  
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}



function generateMoire32() {
	
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);

	for (var y = 0; y < height2; y++) {
		for (var x = 0; x < width2; x++) {
			//var value = x * y & 0xff;
			
			/*var r = 128*((Math.sin(y/30))+1);
			//var r = 128;
			//var g = 128*((Math.cos(y/60))+1);
			//var g = 128*(Math.sin(y/30)+1);
			var g = 128;
			var b = 128;
			
			data[y*width2 + x] =
				(255	<< 24)	|	//alpha
				(b	<< 16)	|	//blue
				(g	<<	8)	|	//green
				r;*/
			
			var pixel = getPixel(x, y);
			
			data[y*width2 + x] =
				(pixel.a	<< 24)	|	//alpha
				(pixel.b	<< 16)	|	//blue
				(pixel.g	<<	8)	|	//green
				pixel.r;
		}
	}
	imageData.data.set(buf8);
	
	ctx2.putImageData(imageData, 0, 0);
	
	ctx2.fillStyle = "yellow";
	ctx2.fillRect(0, 0, 75, 75);

	return canvas2;
}

function generateClouds32() {
	
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);

	for (var y = 0; y < height2; y++) {
		for (var x = 0; x < width2; x++) {
			var pixel = getPixel(x, y);
			
			data[y*width2 + x] =
				(100	<< 24)	|	//alpha
				(pixel.b	<< 16)	|	//blue
				(pixel.g	<<	8)	|	//green
				pixel.r;
		}
	}
	imageData.data.set(buf8);
	
	ctx2.putImageData(imageData, 0, 0);
	
	ctx2.fillStyle = "yellow";
	ctx2.fillRect(0, 0, 75, 75);

	return canvas2;
}

function getPixel(x, y) {
	var pixel = new color();
	
	pixel.r = 127*((Math.sin((y/150)*2*Math.PI))+1);
	pixel.g = 127*((Math.cos((x/300)*2*Math.PI))+1);
	pixel.b = 128;
	
	return pixel;
}


function generateMoire() {
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 256;
	var height2 = 128;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	var data = imageData.data;
	
	for (var y = 0; y < height2; ++y) {
		for (var x = 0; x < width2; ++x) {
			var index = (y * width2 + x) * 4;

			var value = x * y & 0xff;

			data[index] = value;
			data[++index] = value;
			data[++index] = value;
			data[++index] = 255;
		}
	}
	
	ctx2.putImageData(imageData, 0, 0);
	
	ctx2.fillStyle = "yellow";
	ctx2.fillRect(0, 0, 64, 64);
	
	return canvas2;
}

function generateSpecularTexture(datatemp) {
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	for (var x = 0; x < width2; ++x) {
		for (var y = 0; y < height2; ++y) {
			var index = (y * width2 + x) * 4;
			//R
			var r = datatemp[index + 0];
			
			//G
			var g = datatemp[index + 1];
			
			//B
			var b = datatemp[index + 2];
			if (b < 128) {
				r = 255;
				g = 255;
				b = 255;
			} else {
				r = 0;
				g = 0;
				b = 0;
			}
			
			//A
			imageData.data[index + 0] = r;
			imageData.data[index + 1] = g;
			imageData.data[index + 2] = b;
			imageData.data[index + 3] = datatemp[index + 3];
		}
	}
	ctx2.putImageData(imageData, 0, 0);
	
	return canvas2;
}

function generateHeightTexture(datatemp) {
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	for (var x = 0; x < width2; ++x) {
		for (var y = 0; y < height2; ++y) {
			var index = (y * width2 + x) * 4;
			//R
			var r = datatemp[index + 0];
			
			//G
			var g = datatemp[index + 1];
			
			//B
			var b = datatemp[index + 2];
			if (b < 128) {
				r = 0;
				g = 0;
				b = 0;
			} else {
				r -= 128;
				r *= 2;
				g -= 128;
				g *= 2;
				b -= 128;
				b *= 2;
			}
			
			//A
			imageData.data[index + 0] = r;
			imageData.data[index + 1] = g;
			imageData.data[index + 2] = b;
			imageData.data[index + 3] = datatemp[index + 3];
		}
	}
	ctx2.putImageData(imageData, 0, 0);
	
	return canvas2;
}

function generateTexture(datatemp) {
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	for (var x = 0; x < width2; ++x) {
		for (var y = 0; y < height2; ++y) {
			var index = (y * width2 + x) * 4;
			
			imageData.data[index + 0] = datatemp[index + 0];
			imageData.data[index + 1] = datatemp[index + 1];
			imageData.data[index + 2] = datatemp[index + 2];
			imageData.data[index + 3] = datatemp[index + 3];
		}
	}
	ctx2.putImageData(imageData, 0, 0);
	
	return canvas2;
}

function generatePlanetTexture(datatemp) {
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	//var imageData2 = ctx2.createImageData(100, 100);
	var width2 = 300;
	var height2 = 150;
	
	var imageData = ctx2.getImageData(0, 0, width2, height2);
	
	//var datatemp = generateCutTextureData(300, 150, 10);
	
	//var data = imageData.data;
	
	for (var x = 0; x < width2; ++x) {
		for (var y = 0; y < height2; ++y) {
			var index = (y * width2 + x) * 4;
			//R
			var r = datatemp[index + 0];
			
			//G
			var g = datatemp[index + 1];
			
			//B
			var b = datatemp[index + 2];
			if (b < 128) {
				r = 0;
				g = 0;
				b = 255;
			} else {
				r = 0;
				
				b = 0;
			}
			
			
			//A
			imageData.data[index + 0] = r;
			imageData.data[index + 1] = g;
			imageData.data[index + 2] = b;
			imageData.data[index + 3] = datatemp[index + 3];
		}
	}
	
	//for (var i = 0; i < datatemp.length; i++) {
		//data[i] = datatemp[i];
	//	imageData.data[i] = datatemp[i];
	//}
	
	//ctx2.setImageData(0, 0, width2, height2) = generateCutTextureData(300, 150, 10);
	
	//imageData.data = generateCutTextureData(300, 150, 10);
	
	/*for (var x = 0; x < width2; ++x) {
		for (var y = 0; y < height2; ++y) {
			var index = (y * width2 + x) * 4;
			
			var r = 128;
			var g = 128;
			var b = 128;
			
			data[index] = r;
			data[++index] = g;
			data[++index] = b;
			data[++index] = 255;
		}
	}
	
	for (var iteration = 0; iteration < 10; ++iteration) {
		var r = Math.random();
		//r = 0.9;
		
		var plane_ele = Math.random()*180 - 90;
		//plane_ele = 0;
		var plane_ele_rad = plane_ele * Math.PI / 180;
		
		var plane_azi = Math.random()*360;
		//plane_azi = 90;
		var plane_azi_rad = plane_azi * Math.PI / 180;
		
		var side = Math.random() > 0.5 ? -1 : 1;
		//side = 1;
		
		var nx = r * Math.cos(plane_ele_rad)*Math.cos(plane_azi_rad);
		var ny = r * Math.cos(plane_ele_rad)*Math.sin(plane_azi_rad);
		var nz = r * Math.sin(plane_ele_rad);
		
		var plane_ele_rad_diff = Math.acos(r);
		var plane_ele_rad_min = plane_ele_rad - plane_ele_rad_diff;
		var plane_ele_min = plane_ele_rad_min * 180 / Math.PI;
		
		var plane_ele_rad_max = plane_ele_rad + plane_ele_rad_diff;
		var plane_ele_max = plane_ele_rad_max * 180 / Math.PI;
		
		var plane_ele_rad_point = Math.asin(Math.sin(plane_ele_rad)/r);
		var plane_rad_point = plane_ele_rad_point * 180 / Math.PI;
		
		var plane_azi_rad_diff = Math.asin(Math.sin(plane_ele_rad_diff)/Math.cos(plane_ele_rad));
		var plane_azi_rad_min = plane_azi_rad - plane_azi_rad_diff;
		var plane_azi_min = plane_azi_rad_min * 180 / Math.PI;
		
		var plane_azi_rad_max = plane_azi_rad + plane_azi_rad_diff;
		var plane_azi_max = plane_azi_rad_max * 180 / Math.PI;
		
		for (var x = 0; x < width2; ++x) {
			for (var y = 0; y < height2; ++y) {
				
				var index = (y * width2 + x) * 4;
				
				var ele = 90 - (y * 180 / height2);
				var ele_rad = ele * Math.PI / 180;
				
				var azi = x * 360 / width2;
				var azi_rad = azi * Math.PI / 180;
				
				var px = Math.cos(ele_rad)*Math.cos(azi_rad);
				var py = Math.cos(ele_rad)*Math.sin(azi_rad);
				var pz = Math.sin(ele_rad);
				
				var vx = px - nx;
				var vy = py - ny;
				var vz = pz - nz;
				
				var d = dotProduct(nx, ny, nz, vx, vy, vz);
				
				if (d > 0) {
					data[index] += side;
					//data[index] = 255;
					data[++index] += side;
					data[++index] += side;
					data[++index] = 255;
				} else {
					data[index] -= side;
					//data[index] = 0;
					data[++index] -= side;
					data[++index] -= side;
					data[++index] = 255;
				}
				
			}
		}
	}*/
	ctx2.putImageData(imageData, 0, 0);
	
	//ctx2.fillStyle = "yellow";
	//ctx2.fillRect(0, 0, 75, 75);
	
	
	
	return canvas2;
}

function generateCutTextureDataTESTING(width, height, iterations) {
	
	var data = new Array();
	
	for (var x = 0; x < width; ++x) {
		for (var y = 0; y < height; ++y) {
			var index = (y * width + x) * 4;
			
			var r = 128;
			var g = 128;
			var b = 128;
			
			data[index] = r;
			data[++index] = g;
			data[++index] = b;
			data[++index] = 255;
		}
	}
	
	for (var iteration = 0; iteration < iterations; ++iteration) {
		var r = Math.random();
		//r = 0.6;
		
		var plane_ele = Math.random()*180 - 90;
		//plane_ele = 20;
		var plane_ele_rad = plane_ele * Math.PI / 180;
		
		var plane_azi = Math.random()*360;
		//var plane_azi = 340;
		var plane_azi_rad = plane_azi * Math.PI / 180;
		
		var side = Math.random() > 0.5 ? -1 : 1;
		//side = 1;
		
		var nx = r * Math.cos(plane_ele_rad)*Math.cos(plane_azi_rad);
		var ny = r * Math.cos(plane_ele_rad)*Math.sin(plane_azi_rad);
		var nz = r * Math.sin(plane_ele_rad);
		
		var plane_ele_rad_diff = Math.acos(r);
		var plane_ele_rad_min = plane_ele_rad - plane_ele_rad_diff;
		//if (plane_ele_rad_min < -Math.PI/2) {
			//var stop_here;
		//	plane_ele_rad_min += Math.PI/2;
		//}
		var plane_ele_min = plane_ele_rad_min * 180 / Math.PI;
		
		var plane_ele_rad_max = plane_ele_rad + plane_ele_rad_diff;
		//if (plane_ele_rad_max > Math.PI/2) {
		//	plane_ele_rad_max -= Math.PI/2;
		//}
		var plane_ele_max = plane_ele_rad_max * 180 / Math.PI;
		
		
		var plane_ele_rad_point = Math.asin(Math.sin(plane_ele_rad)/r);
		var plane_rad_point = plane_ele_rad_point * 180 / Math.PI;
		
		
		var plane_azi_rad_diff = Math.asin(Math.sin(plane_ele_rad_diff)/Math.cos(plane_ele_rad));
		var plane_azi_rad_min = plane_azi_rad - plane_azi_rad_diff;
		if (plane_azi_rad_min < 0) {
			plane_azi_rad_min += Math.PI*2;
		}
		var plane_azi_min = plane_azi_rad_min * 180 / Math.PI;
		
		var plane_azi_rad_max = plane_azi_rad + plane_azi_rad_diff;
		if (plane_azi_rad_max > Math.PI*2) {
			plane_azi_rad_max -= Math.PI*2;
		}
		var plane_azi_max = plane_azi_rad_max * 180 / Math.PI;
		
		var cutType = "";
		if (plane_ele_max > 90) {
			cutType = "north";
		} else if (plane_ele_min < -90) {
			cutType = "south";
		} else if (plane_azi_max < plane_azi_min) {
		//} else if (plane_azi_min < 0 || plane_azi_max > 360) {
			cutType = "straddle";
		} else {
			cutType = "normal";
		}
		
		for (var x = 0; x < width; ++x) {
			
			var azi = x * 360 / width;
			var azi_rad = azi * Math.PI / 180;
			
			var outside = false;
			switch (cutType) {
				case "straddle":
					if (azi_rad > plane_azi_rad_min && azi_rad < plane_azi_rad_max) {
						outside = true;
					}
					break;
				case "normal":
					if (azi_rad < plane_azi_rad_min || azi_rad > plane_azi_rad_max) {
						outside = true;
					}
					break;
				case "north":
					break;
				case "south":
					break;
			}
			
			for (var y = 0; y < height; ++y) {
				
				var index = (y * width + x) * 4;
				
				if (outside) {
					//if (side > 0) {
						data[index] -= side;
						data[++index] -= side;
						data[++index] -= side;
						data[++index] = 255;
					//} else {
					//	data[index] = 200;
					//	data[++index] = 200;
					//	data[++index] = 200;
					//	data[++index] = 255;
					//}
				} else {
					
					
					var ele = 90 - (y * 180 / height);
					var ele_rad = ele * Math.PI / 180;

					
					var ignore = false;
					//var inside = false;
					switch (cutType) {
						case "straddle":

							break;
						case "normal":
							if (ele_rad < plane_ele_rad_min || ele_rad > plane_ele_rad_max) {
								ignore = true;
							}
							break;
						case "north":
							if (ele_rad < plane_ele_rad_min) {
								ignore = true;
							}// else if (ele_rad > plane_ele_rad_max) {
							//	inside = true;
							//}
							break;
						case "south":
							if (ele_rad > plane_ele_rad_max) {
								ignore = true;
							}// else if (ele_rad < plane_ele_rad_min) {
							//	inside = true;
							//}
							break;
					}
					
					if (ignore) {
						data[index] -= side;
						data[++index] -= side;
						data[++index] -= side;
						data[++index] = 255;
						//data[index] = 255;
						//data[++index] = 128;
						//data[++index] = 128;
						//data[++index] = 255;
					//} else if (inside) {
					//	data[index] = 255;
					//	data[++index] = 128;
					//	data[++index] = 128;
					//	data[++index] = 255;
					} else {
						
						var px = Math.cos(ele_rad)*Math.cos(azi_rad);
						var py = Math.cos(ele_rad)*Math.sin(azi_rad);
						var pz = Math.sin(ele_rad);

						var vx = px - nx;
						var vy = py - ny;
						var vz = pz - nz;

						var d = dotProduct(nx, ny, nz, vx, vy, vz);

						if (d > 0) {
							data[index] += side;
							data[++index] += side;
							data[++index] += side;
							data[++index] = 255;
							
							/*if (side > 0) {
								data[index] = 200;
								data[++index] = 200;
								data[++index] = 200;
								data[++index] = 255;
							} else {
								data[index] = 50;
								data[++index] = 50;
								data[++index] = 50;
								data[++index] = 255;
							}*/

						} else {
							data[index] -= side;
							data[++index] -= side;
							data[++index] -= side;
							data[++index] = 255;
							/*if (side > 0) {
								data[index] = 50;
								data[++index] = 50;
								data[++index] = 50;
								data[++index] = 255;
							} else {
								data[index] = 200;
								data[++index] = 200;
								data[++index] = 200;
								data[++index] = 255;
							}*/
						}
					}
				}
				
			}
		}
	}
	//ctx2.putImageData(imageData, 0, 0);
	
	//ctx2.fillStyle = "yellow";
	//ctx2.fillRect(0, 0, 75, 75);
	
	return data;
}

function generateCutTextureData(width, height, iterations) {
	
	var data = new Array();
	
	for (var x = 0; x < width; ++x) {
		for (var y = 0; y < height; ++y) {
			var index = (y * width + x) * 4;
			
			var r = 128;
			var g = 128;
			var b = 128;
			
			data[index] = r;
			data[++index] = g;
			data[++index] = b;
			data[++index] = 255;
		}
	}
	
	for (var iteration = 0; iteration < iterations; ++iteration) {
		var r = Math.random();
		//r = 0.9;
		
		var plane_ele = Math.random()*180 - 90;
		//plane_ele = 0;
		var plane_ele_rad = plane_ele * Math.PI / 180;
		
		var plane_azi = Math.random()*360;
		//var plane_azi = 10;
		var plane_azi_rad = plane_azi * Math.PI / 180;
		
		var side = Math.random() > 0.5 ? -1 : 1;
		//side = 1;
		
		var nx = r * Math.cos(plane_ele_rad)*Math.cos(plane_azi_rad);
		var ny = r * Math.cos(plane_ele_rad)*Math.sin(plane_azi_rad);
		var nz = r * Math.sin(plane_ele_rad);
		
		var plane_ele_rad_diff = Math.acos(r);
		var plane_ele_rad_min = plane_ele_rad - plane_ele_rad_diff;
		var plane_ele_min = plane_ele_rad_min * 180 / Math.PI;
		
		var plane_ele_rad_max = plane_ele_rad + plane_ele_rad_diff;
		var plane_ele_max = plane_ele_rad_max * 180 / Math.PI;
		
		
		var plane_ele_rad_point = Math.asin(Math.sin(plane_ele_rad)/r);
		var plane_rad_point = plane_ele_rad_point * 180 / Math.PI;
		
		
		var plane_azi_rad_diff = Math.asin(Math.sin(plane_ele_rad_diff)/Math.cos(plane_ele_rad));
		var plane_azi_rad_min = plane_azi_rad - plane_azi_rad_diff;
		var plane_azi_min = plane_azi_rad_min * 180 / Math.PI;
		
		var plane_azi_rad_max = plane_azi_rad + plane_azi_rad_diff;
		var plane_azi_max = plane_azi_rad_max * 180 / Math.PI;
		
		/*var cutType = "";
		if (plane_ele_max > 90) {
			cutType = "north";
		} else if (plane_ele_min < -90) {
			cutType = "south";
		} else if (plane_azi_max < plane_azi_min) {
			cutType = "straddle";
		} else {
			cutType = "normal";
		}*/
		
		for (var x = 0; x < width; ++x) {

			for (var y = 0; y < height; ++y) {
				
				var index = (y * width + x) * 4;
				
				
				
				var ele = 90 - (y * 180 / height);
				var ele_rad = ele * Math.PI / 180;
				
				var azi = x * 360 / width;
				var azi_rad = azi * Math.PI / 180;
				
				var px = Math.cos(ele_rad)*Math.cos(azi_rad);
				var py = Math.cos(ele_rad)*Math.sin(azi_rad);
				var pz = Math.sin(ele_rad);
				
				var vx = px - nx;
				var vy = py - ny;
				var vz = pz - nz;
				
				var d = dotProduct(nx, ny, nz, vx, vy, vz);
				
				if (d > 0) {
					data[index] += side;
					//data[index] = 255;
					data[++index] += side;
					data[++index] += side;
					data[++index] = 255;
				} else {
					data[index] -= side;
					//data[index] = 0;
					data[++index] -= side;
					data[++index] -= side;
					data[++index] = 255;
				}
				
			}
		}
	}
	//ctx2.putImageData(imageData, 0, 0);
	
	//ctx2.fillStyle = "yellow";
	//ctx2.fillRect(0, 0, 75, 75);
	
	return data;
}

function generateEarth() {
	var mapImage = THREE.ImageUtils.loadTexture("images/earthmap1k.jpg");
	var mapHeight = THREE.ImageUtils.loadTexture("images/earthbump1k.jpg");
	var mapSpecular = THREE.ImageUtils.loadTexture("images/earthspec1k.jpg");
	
	
	return earthMaterial = new THREE.MeshPhongMaterial({
		map: mapImage,
		//map: texture2,
		side: THREE.FrontSide,
		transparent: false,
		opacity: 1,
		//map: texture
		//map: mapHeight,
		bumpMap: mapHeight,
		bumpScale: 0.05,
		specularMap: mapSpecular,
		specular: new THREE.Color('grey')
	});
}

function generatePlanet() {
	//var canvas2 = ;
	//var datatemp = generateCutTextureData(300, 150, 1000);
	var datatemp = generateCutTextureDataTESTING(300, 150, 1000);
	
	var texture = new THREE.Texture(generateTexture(datatemp));
	texture.needsUpdate = true;
	
	var textureColour = new THREE.Texture(generatePlanetTexture(datatemp));
	textureColour.needsUpdate = true;
	
	var textureHeight = new THREE.Texture(generateHeightTexture(datatemp));
	textureHeight.needsUpdate = true;
	
	var textureSpecular = new THREE.Texture(generateSpecularTexture(datatemp));
	textureSpecular.needsUpdate = true;
	
	return planetMaterial = new THREE.MeshPhongMaterial({
		map: textureColour,
		//map: texture,
		side: THREE.FrontSide,
		transparent: false,
		opacity: 1,
		
		bumpMap: textureHeight,
		bumpScale: 0.05,
		
		specularMap: textureSpecular,
		specular: new THREE.Color('grey')
	});
}

function dotProduct(x1, y1, z1, x2, y2, z2) {
	return x1*x2 + y1*y2 + z1*z2;
}

/*
 * normal-plane - x: xsin
 */