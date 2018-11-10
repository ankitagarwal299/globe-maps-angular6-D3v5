// import { Component, OnInit } from '@angular/core';
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

import * as d3 from "d3";
import * as topojson from "topojson";
import { default as world } from "./data.world";
import { default as capitals } from "./countries";
import { Router } from '@angular/router';

@Component({
  selector: "app-worldmap",
  templateUrl: "./worldmap.component.html",
  styleUrls: ["./worldmap.component.scss"]
  ,
  encapsulation: ViewEncapsulation.None
})
export class WorldmapComponent implements OnInit {
  // Reference chart variable inside Component
  @ViewChild("chart") chartElement: ElementRef;
  @ViewChild("info") infoTooltipElement: ElementRef;

  private svgElement: HTMLElement;
  name: string;
  countries;

  /**
   * We request angular for the element reference  and then we create a D3 Wrapper for our host element
   **/
  constructor(private router: Router) {
    this.name = `v${VERSION.full}`;
    console.log("Angular Version --->" + this.name);
  }

  ngOnInit() {
    console.log(this.chartElement.nativeElement);
    this.buildChart();
  }

  buildChart() {
    //this.chartProps = {};
    var margin = { top: 0, left: 0, right: 0, bottom: 0 },
      height = 790 - margin.top - margin.bottom,
      width = 1600 - margin.left - margin.right;

    var svg = d3
      .select(this.chartElement.nativeElement)
      //d3.select("#map")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
    //  .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // .attr("transform", `translate(${margin.left} , ${margin.top})`);

    /* Tooltip */
    // var tooltip = d3
    //   .select("body")
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .style("position", "absolute")
    //   .style("opacity", 0);

    /* Formattting tooltiop  marque */
    // var format = d3.format(",d");

    /* 
       Read in world.topojson https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
       Read in capital.csv 
    */



    /* 
       Create a new projection using Mercator(geoMercator)
       and center it (translate)
       and zoom in a certain amount (scale)
     */
    var projection = d3.geoMercator().center([-100, 68]).scale(200).rotate([-10, 0])


    /* Create a path (geoPath) using the projection */
    var path = d3.geoPath().projection(projection);

    ready(world, capitals);

    function ready(data, capitals) {

      /* topojson.features converts our RAW geo data into USEABLE  geo data always pass  it data , then data.objects.__something__ then get features out of it */
      var countriesData:any;
      countriesData= topojson.feature(data, data.objects.countries1);
      let countries:any = countriesData.features;

      function aa(d):any {
        var that = d3.select(this)
          .attr("fill", "#00bceb")
          .attr("stroke", "#ffffff").attr("stroke-width", "1").style("stroke-dasharray", ("10,3"));
        capitals.forEach(function (cap) {
          if (cap.name == d.properties.name) {
            //that.attr("fill", "#00bceb");
            that.attr("fill", "#005073");
          }
        });
      }


      /* Add a path for each country Shapes -> path */
      svg.selectAll("path")
        .data(countries)
        .enter().append("path")
        .attr("d", path)
        .attr("class", aa)
        .on("mouseover", function (data) {
          //Add the class on mouse over
          d3.select(this).attr("fill", "#0893a5");
        })
        .on("mousemove", function (d, i) {
          d3.select(this).attr("fill", "#0893a5");
        })
        .on("mouseout", function (d:any) {
          var that = d3.select(this);
          that.attr("fill", "#00bceb");

          capitals.forEach(function (cap) {
            if (cap.name == d.properties.name) {
              //that.attr("fill", "#00bceb");
              that.attr("fill", "#005073");
            }
          });
        });

     



      //     var zoom = d3.zoom()
      // .scaleExtent([1, 40])
      // .translateExtent([[-100, -100], [width + 90, height + 100]])
      // .on("zoom", zoomed);


      /* Add the cities Get the x/y from the lat/long + projection  */
      svg
        .selectAll(".city-circle")
        .data(capitals)
        .enter()
        .append("circle")
        .attr('class', 'city-circle')
        .attr('r', 3)
        .attr("cx", function (d:any) {
          var cord = projection([d.long, d.lat]);
          return cord[0];
        })
        .attr("cy", function (d:any) {
          var cord = projection([d.long, d.lat]);
          return cord[1];
        });


      svg.selectAll("image")
        .data(capitals)
        .enter()
        .append("image")
         //.attr("xlink:href",'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/24x24/DrawingPin1_Blue.png')
        //.attr("xlink:href", '../assets/img/location4.svg')//original color
         //.attr("xlink:href", '../assets/img/location6.png')//in blue color
        .attr("xlink:href", '../assets/img/pin.png')
        .attr('height', '100')
        .attr('width', '100')
        .attr("x", function (d:any) {
          var cord = projection([d.long, d.lat]);
          return cord[0] - 12;
        })
        .attr("y", function (d:any) {
          var cord = projection([d.long, d.lat]);
          return cord[1] - 25;
        })
        .on("mouseover", function (d:any) {
          console.log('this', this);
          d3.select(this).classed("city-label", true).text(d.name);
          //document.getElementById("infoTooltipElement").innerHTML = d.name;//infoTooltip
          document.getElementById("map").innerHTML = d.name;//infoTooltip
          var xPosition = parseFloat(d3.event.pageX) - 200;
          var yPosition = parseFloat(d3.event.pageY) - 15;

          d3.select("#map").classed("hidden", false);

          d3.select("#map")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).style('fill', 'none');
          d3.select("#map").classed("hidden", true);
        })
        .on("mousemove", function (d, i) {
          var xPosition = parseFloat(d3.event.pageX) - 200;
          var yPosition = parseFloat(d3.event.pageY) - 15;
          d3.select("#map")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            ;

          d3.select("#map").classed("hidden", false);
        })
      //.attr("transform", d => `translate(${projection([d.long, d.lat])})`);


      //.attr("transform", d => `translate(${projection([d.long,d.lat])})`);

    }//ready function end

  }

  clicked(event: any) {
    console.log(event);
    switch (event.target.__data__.id) {
      case 'USA':
        // this.router.navigate(['/usa']);
        this.router.navigate(['/emea']);

    }
  }

}
