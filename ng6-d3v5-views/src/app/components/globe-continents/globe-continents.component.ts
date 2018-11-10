import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  OnInit,
  VERSION,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";

import * as d3 from "d3";
import { default as world } from "./data.continents";//Globe with Continents
import { default as capitals } from "./countries";


@Component({
  selector: 'app-globe-continents',
  templateUrl: './globe-continents.component.html',
  styleUrls: ['./globe-continents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobeContinentsComponent implements OnInit {
  @ViewChild("chart")
  chartElement: ElementRef;
  
  /* Configuration */  

  // ms to wait after dragging before auto-rotating
  rotationDelay = 3000;

  // scale of the globe (not the canvas element)
  scaleFactor = 0.8;

  // autorotation speed
  degPerSec = 6;

  // start angles
  angles = { x: -20, y: 40, z: 0 };

  // colorsjhv
  colorWater = "#fff";
  colorLandClipAngle180 = "#005073";
  colorLandClipAngle90 = "#00bceb";
  //colorLandClipAngle90ContinentsWithout = "#00bceb";
  colorGraticule = "#ccc";
  // colorLandClipAngle90 = "linear-gradient(to right,#40E0D0, #2a52be)";
  colorCountry = "#005073";
  // colorMarker = "#778899";
  colorMarker = "#000";
  colorText = "#778899";

  constructor(private router: Router) { console.log(world)}

  ngOnInit() {
    this.buildChart();
  }

  buildChart() {
    /*  Handler */
    var points = [
      // 
      {
        type: "Point",
        coordinates: [80.363625, 39.913818],
        location: "ASIA"
      },
      {
        type: "Point",
        coordinates: [5.291266, 46.132633],
        location: "EUROPE"
      },
      {
        type: "Point",
        coordinates: [-110.783322, 39.7793626],
        location: "AMERICA"
       }
    ];
    /*  Variables */

    var current = d3.select("#countryheading");
    var totalSites = d3.select("#totalSites").text("Total Sites: 107").attr("fill", "#00bceb");

    var canvas = d3.select(this.chartElement.nativeElement);

    var context = canvas.node().getContext("2d");
    var water = { type: "Sphere" };
    var projection = d3.geoOrthographic().precision(0.1);
    var graticule = d3.geoGraticule10();
    var path = d3.geoPath(projection).context(context);



    var v0; // Mouse position in Cartesian coordinates at start of drag gesture.
    var r0; // Projection rotation as Euler angles at start.
    var q0; // Projection rotation as versor at start.
    var lastTime = d3.now();
    var degPerMs = this.degPerSec / 1000;
    var width, height;
    var land, countries,countinentsWithNoFactories;
    var countryList;
    var autorotate, now, diff, rotation;
    var currentCountry;

    /*  Functions */

    let enter = (country) => {
      var country = countryList.find(function (c) {
        return c.id === country.id;
      });
      current.text((country && country.name) || "");
      //totalSites.text("Total Sites: 7");

    };

    let enter1 = (continentObj) => {
      switch (continentObj.properties.CONTINENT) {
        case "Europe":
          this.router.navigate(['/emea']);
          break;
        case "North America":
        case "South America":
          this.router.navigate(['/americaContinent']);
          break;
        case "Asia":
          this.router.navigate(['/apac']);
          break;
      };
    }

    function leave(country) {
      current.text("");
      totalSites.text("Total Sites: 107");
    };

    let setAngles = () => {
      var rotation = projection.rotate();
      // console.log("inside setAnglerotation", rotation);
      // console.log("Step 1", this.angles);

      rotation[0] = this.angles.y;
      rotation[1] = this.angles.x;
      rotation[2] = this.angles.z;

      projection.rotate(rotation);
    }

    let scale = () => {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;

      // width = 800;
      // height = 700;
      canvas.attr("width", width).attr("height", height);
      projection
        .scale((this.scaleFactor * Math.min(width, height)) / 2)
        .translate([width / 2, height / 2]);
      render();
    }

    /* Rotation */
    let startRotation = (delay) => {
      // console.log("Step 3 inside startrotation", rotate);
      // console.log("Step 3 inside startrotation", autorotate);

      autorotate.restart(rotate, delay || 0);

    }

    let stopRotation = () => {
      // console.log("Step 3 inside stopRotation", autorotate);
      autorotate.stop();
    }

    /* Drag Code */
    /*
    https://www.npmjs.com/package/versor
    https://bl.ocks.org/mbostock/raw/7ea1dde508cec6d2d95306f92642bc42/6aac691494f752142a67cc43c51a0fd09896dbd4/versor.js
     */
    function dragstarted() {


      //v0 = versor.default.cartesian(projection.invert(d3.mouse(this)));
      // console.log("v0", versor.default.cartesian(projection.invert(d3.mouse(this))));
      //r0 = projection.rotate();
      // console.log("Step 4 :inside dragstarted", projection.rotate()); 

      //q0 = versor.default(r0);
      // console.log("q0", q0);
      stopRotation();

      //mousemove(this);
      //mousemove(d3.mouse(this));

    }

    function dragged() {
      // var v1 = versor.default.cartesian(projection.rotate(r0).invert(d3.mouse(this)));

      // var q1 = versor.default.multiply(q0, versor.default.delta(v0, v1));
      // var r1 = versor.default.rotation(q1);
      // projection.rotate(r1);
      render();
    }

    let dragended = () => {
      startRotation(this.rotationDelay);
    }

    /* Render */

    let render = () => {
      context.clearRect(0, 0, width, height);
      fill(water, this.colorWater);
      stroke(water, this.colorGraticule);//outer boundary of circle


      projection.clipAngle(180);
      // fill(land, this.colorLandClipAngle180);
      fill(countries, this.colorLandClipAngle180);

      //stroke(graticule, this.colorGraticule);// Hiding graticule

      projection.clipAngle(90);
      fill(countries, this.colorLandClipAngle90);
      fill(countinentsWithNoFactories, "#eee9e9");

      //countries
      // stroke(countries, "#fff");
      stroke(countries, "#005073");

      //fill(countries,"#005073");

      //Add Population  markers
      for (var j = 0; j < points.length; j++) {
        //fill(points[j], this.colorMarker);//dots on map
        fillText(points[j], this.colorMarker);//Hiding Country Lables
      }
     

      //Mouse over color
      if (currentCountry) {
        fill(currentCountry, this.colorCountry);
      }
    }

    // function fillText(points: any, color: string) {
    //   context.beginPath();
    //   //path(points);
    //   context.font = "15px Verdana";

    //   let x = projection(points.coordinates)[0];
    //   var offset1 = (x < width / 2 - 20) ? "end" : ((x < width / 2 + 20) ? "middle" : "start");
    //   context.textAlign = offset1;

    //   context.fillStyle = color;
    //   const a = d3.geoDistance(points.coordinates, projection.invert([width / 2, height / 2]));
    //   if (a < 1.57) {
    //     let x = projection(points.coordinates)[0];
    //     var offset = x < width / 2 ? -10 : 10;
    //     context.fillText(points.location, x + offset, projection(points.coordinates)[1]);
    //   }
    //   context.fill();
    // }

    function fillText(points: any, color: string) {
      context.beginPath();
      //path(points);
      context.font = "24px Verdana";
      context.fillStyle = color;
     // context.fillText(points.location, projection(points.coordinates)[0], projection(points.coordinates)[1]);      

     const a = d3.geoDistance(points.coordinates, projection.invert([width / 2, height / 2]));
       if (a < 1.57) {
         let x = projection(points.coordinates)[0];
         var offset = x < width / 2 ? -10 : 10;
         context.fillText(points.location, x + offset, projection(points.coordinates)[1]);
       }
      context.fill();
    }


    function fill(obj, color) {
      context.beginPath();
      path(obj);
      context.fillStyle = color;
      context.font = "5px ";
      //context.fillText(obj.location , projection(obj.coordinates)[0],projection(obj.coordinates)[1] );
      context.fill();
    }

    function stroke(obj, color) {
      context.beginPath();
      path(obj);
      context.strokeStyle = color;
      context.stroke();
    }

    let rotate = (elapsed) => {
      now = d3.now();
      diff = now - lastTime;
      if (diff < elapsed) {
        rotation = projection.rotate();
        //console.log("inside rotate function :rotation",rotation);
        rotation[0] += diff * degPerMs;
        projection.rotate(rotation);
        render();
      }
      lastTime = now;
    }



    // https://github.com/d3/d3-polygon
    function polygonContains(polygon, point) {
      var n = polygon.length;
      var p = polygon[n - 1];
      var x = point[0],
        y = point[1];
      var x0 = p[0],
        y0 = p[1];
      var x1, y1;
      var inside = false;
      for (var i = 0; i < n; ++i) {
        (p = polygon[i]), (x1 = p[0]), (y1 = p[1]);
        if (y1 > y !== y0 > y && x < ((x0 - x1) * (y - y1)) / (y0 - y1) + x1)
          inside = !inside;
        (x0 = x1), (y0 = y1);
      }
      return inside;
    }

    function mousemove(event) {
      var c = getCountry(event || this);
      if (!c) {
        if (currentCountry) {
          leave(currentCountry);
          currentCountry = undefined;
          render();
        }
        return;
      }
      if (c === currentCountry) {
        return;
      }
      currentCountry = c;
      //render();
      enter(c); //commented this, as i want this functionlity on click
    }

    function doubleClick(event) {
      var c = getCountry(event || this);
      if (!c) {
        if (currentCountry) {
          leave(currentCountry);
          currentCountry = undefined;
          //render();
        }
        return;
      }
      currentCountry = c;
      render();
      enter1(c); //commented this, as i want this functionlity on click
    }

    function getCountry(event) {
      var pos = projection.invert(d3.mouse(event));
      return countries.features.find(function (f) {
        return f.geometry.coordinates.find(function (c1) {
          return (
            polygonContains(c1, pos) ||
            c1.find(function (c2) {
              return polygonContains(c2, pos);
            })
          );
        });
      });
    }

    /*   Initialization */
    setAngles();

    canvas.call(
      d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
    )
    //.on('mousemove', mousemove)
    canvas.on('mousemove', mousemove);
    canvas.on('dblclick', doubleClick);

    let loadData = (world) => {
      countries = {
        "type": "FeatureCollection",
        "features": []
      };

       countinentsWithNoFactories = Object.assign({}, countries);

      /* https://gist.githubusercontent.com/hrbrmstr/91ea5cc9474286c72838/raw/59421ff9b268ff0929b051ddafafbeb94a4c1910/continents.json */
      const features = world.features.filter(function (continent) {

        return continent.properties.CONTINENT == "Asia" || continent.properties.CONTINENT == "Europe" || continent.properties.CONTINENT == "North America" || continent.properties.CONTINENT == "South America";

      });
      countries.features = features;
      console.log(countries);

      countinentsWithNoFactories.features = world.features.filter(function (continent) {
        return continent.properties.CONTINENT == "Africa" || continent.properties.CONTINENT == "Oceania" || continent.properties.CONTINENT == "Australia" || continent.properties.CONTINENT == "Antarctica";
      });
      console.log(countinentsWithNoFactories);

      countryList = capitals;
      scale();
      autorotate = d3.timer(rotate);
    }
    loadData(world);
  }
}