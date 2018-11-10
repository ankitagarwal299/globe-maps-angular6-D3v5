export default {
  type: "FeatureCollection",

  features: [
   
    {
      type: "Feature",
      id: 1,
      properties: {
        OBJECTID_1: 2,
        OBJECTID: 6,
        NAME: "United States of America",
        PLACE_KEY: "0607567000",
        CAPITAL: "N",
        POPULATION: 735315,
        PCLASS: "7",
        STATE: "CA",
        STATE_KEY: "06",
        FACTORIES:24
      },
      geometry: {
        type: "Point",
        coordinates: [-98.783322, 39.7793626]
      }
    },{
    type: "Feature",
    id: 0,
    properties: {
      OBJECTID_1: 1,
      OBJECTID: 10,
      NAME: "Mexico",
      PLACE_KEY: "0401355000",
      CAPITAL: "Y",
      POPULATION: 1159014,
      PCLASS: "8",
      STATE: "AZ",
      STATE_KEY: "04",
      FACTORIES:4
    },
    geometry: {
      type: "Point",
      coordinates: [-105.355080,15.684084]
    }
  },
    {
      type: "Feature",
      id: 0,
      properties: {
        OBJECTID_1: 1,
        OBJECTID: 10,
        NAME: "Canada",
        PLACE_KEY: "0401355000",
        CAPITAL: "Y",
        POPULATION: 1159014,
        PCLASS: "8",
        STATE: "AZ",
        STATE_KEY: "04",
        FACTORIES:7
      },
      geometry: {
        type: "Point",
        //coordinates: [ -96.025314, 64.320274]
        coordinates: [-110.138451, 60.895077]
      }
    },
    {
      type: "Feature",
      id: 0,
      properties: {
        OBJECTID_1: 1,
        OBJECTID: 10,
        NAME: "Brazil",
        PLACE_KEY: "0401355000",
        CAPITAL: "Y",
        POPULATION: 1159014,
        PCLASS: "8",
        STATE: "AZ",
        STATE_KEY: "04",
        FACTORIES:3
      },
      geometry: {
        type: "Point",
        coordinates: [-51.280857,-11.409874]
      }
    }
  ]
};
