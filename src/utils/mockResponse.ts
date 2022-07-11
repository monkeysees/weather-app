const MOCK_RESPONSE = {
  latitude: 55.75,
  longitude: 37.625,
  elevation: 149.0,
  generationtime_ms: 0.5229711532592773,
  utc_offset_seconds: 0,
  hourly: {
    weathercode: [
      2.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 1.0, 2.0, 3.0, 3.0, 3.0, 3.0, 2.0, 3.0,
      3.0, 3.0, 3.0, 3.0, 2.0, 3.0, 3.0, 3.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0,
      3.0, 1.0, 2.0, 3.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0,
      80.0, 3.0, 3.0, 3.0, 61.0, 61.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0,
      3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 2.0, 3.0, 2.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0,
      2.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 2.0, 1.0, 2.0, 3.0, 2.0,
      3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0,
      3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 80.0, 80.0, 80.0, 2.0, 2.0, 2.0,
      2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0,
      61.0, 61.0, 61.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0,
      3.0, 3.0, 3.0, 3.0, 61.0, 61.0, 61.0, 61.0, 61.0, 61.0, 3.0, 3.0, 3.0,
      61.0, 61.0,
    ],
    winddirection_10m: [
      70.0, 68.0, 73.0, 80.0, 111.0, 102.0, 99.0, 118.0, 113.0, 122.0, 138.0,
      145.0, 134.0, 128.0, 134.0, 156.0, 174.0, 83.0, 139.0, 145.0, 141.0, 96.0,
      107.0, 78.0, 346.0, 86.0, 110.0, 102.0, 101.0, 102.0, 93.0, 105.0, 112.0,
      113.0, 108.0, 124.0, 130.0, 134.0, 135.0, 111.0, 106.0, 122.0, 95.0, 98.0,
      96.0, 130.0, 129.0, 100.0, 100.0, 116.0, 108.0, 116.0, 120.0, 141.0,
      163.0, 172.0, 174.0, 176.0, 175.0, 180.0, 194.0, 206.0, 207.0, 203.0,
      196.0, 194.0, 151.0, 175.0, 174.0, 180.0, 180.0, 180.0, 166.0, 135.0,
      129.0, 90.0, 106.0, 162.0, 246.0, 275.0, 225.0, 198.0, 193.0, 187.0,
      185.0, 191.0, 188.0, 189.0, 198.0, 203.0, 212.0, 180.0, 171.0, 197.0,
      225.0, 297.0, 108.0, 79.0, 76.0, 101.0, 106.0, 122.0, 141.0, 171.0, 186.0,
      161.0, 185.0, 221.0, 143.0, 121.0, 79.0, 48.0, 48.0, 60.0, 101.0, 135.0,
      150.0, 151.0, 142.0, 122.0, 107.0, 105.0, 106.0, 180.0, 284.0, 283.0,
      280.0, 276.0, 271.0, 269.0, 270.0, 272.0, 276.0, 277.0, 278.0, 277.0,
      271.0, 264.0, 256.0, 254.0, 253.0, 252.0, 249.0, 245.0, 241.0, 241.0,
      243.0, 244.0, 246.0, 248.0, 251.0, 259.0, 260.0, 260.0, 258.0, 257.0,
      255.0, 258.0, 262.0, 266.0, 264.0, 259.0, 251.0, 246.0, 242.0, 240.0,
      240.0, 243.0, 243.0, 242.0, 240.0, 240.0, 241.0, 244.0, 248.0, 249.0,
      251.0, 252.0, 255.0, 257.0, 259.0, 257.0, 255.0, 252.0, 252.0, 253.0,
      254.0, 254.0, 254.0, 251.0, 247.0, 242.0,
    ],
    windspeed_10m: [
      4.2, 5.8, 6.0, 6.2, 6.2, 7.0, 6.9, 8.5, 9.0, 11.5, 14.5, 15.0, 14.0, 14.1,
      14.0, 12.2, 6.9, 2.9, 3.3, 4.4, 5.1, 3.6, 4.9, 5.2, 1.5, 5.8, 7.3, 8.5,
      9.5, 12.1, 12.6, 15.3, 17.9, 20.0, 15.1, 20.5, 22.5, 20.6, 18.3, 18.5,
      18.0, 15.7, 8.3, 10.2, 14.8, 13.6, 9.7, 9.9, 9.9, 16.4, 19.4, 19.6, 17.9,
      20.5, 18.4, 18.5, 17.7, 15.9, 15.5, 16.2, 15.2, 12.4, 10.9, 9.4, 9.0, 5.9,
      3.7, 4.3, 3.6, 3.2, 3.2, 3.2, 3.0, 3.1, 2.3, 1.4, 2.6, 2.3, 6.3, 4.3, 3.1,
      8.0, 9.6, 8.7, 8.7, 7.7, 7.6, 7.3, 5.7, 5.5, 3.4, 2.9, 2.2, 3.8, 2.5, 1.6,
      1.1, 1.8, 3.0, 1.8, 2.6, 3.4, 4.6, 7.3, 6.5, 6.5, 7.6, 3.8, 5.4, 4.2, 3.7,
      4.8, 4.3, 2.9, 1.8, 2.0, 2.9, 3.7, 4.1, 4.7, 4.9, 4.1, 2.6, 0.0, 3.0, 6.6,
      10.6, 13.0, 14.8, 16.9, 17.6, 17.7, 17.4, 17.4, 17.1, 17.1, 16.9, 17.4,
      17.8, 18.3, 18.4, 18.6, 18.9, 19.5, 20.6, 21.4, 21.9, 22.9, 23.7, 24.4,
      25.2, 19.1, 19.4, 19.4, 19.8, 20.3, 20.9, 21.0, 21.1, 20.2, 18.1, 15.0,
      12.2, 11.4, 11.4, 12.1, 12.1, 12.6, 12.9, 13.0, 13.7, 14.2, 15.6, 17.6,
      19.4, 20.1, 20.6, 21.2, 21.7, 22.2, 22.4, 21.4, 19.4, 17.8, 17.1, 17.0,
      16.5, 16.5, 16.5, 16.4, 16.0, 15.5,
    ],
    cloudcover: [
      93.0, 100.0, 100.0, 95.0, 95.0, 59.0, 58.0, 29.0, 61.0, 100.0, 100.0,
      100.0, 90.0, 61.0, 100.0, 100.0, 100.0, 88.0, 57.0, 67.0, 100.0, 100.0,
      99.0, 83.0, 70.0, 88.0, 100.0, 100.0, 100.0, 99.0, 28.0, 18.0, 36.0, 92.0,
      72.0, 80.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
      100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 81.0, 73.0,
      70.0, 75.0, 64.0, 78.0, 66.0, 54.0, 39.0, 27.0, 24.0, 20.0, 32.0, 0.0,
      0.0, 0.0, 0.0, 0.0, 0.0, 11.0, 3.0, 2.0, 70.0, 81.0, 81.0, 13.0, 43.0,
      53.0, 57.0, 66.0, 53.0, 64.0, 60.0, 45.0, 40.0, 44.0, 8.0, 0.0, 0.0, 5.0,
      2.0, 6.0, 0.0, 29.0, 27.0, 51.0, 36.0, 85.0, 89.0, 53.0, 100.0, 100.0,
      100.0, 99.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
      100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
      100.0, 100.0, 100.0, 100.0, 90.0, 80.0, 70.0, 73.0, 76.0, 78.0, 72.0,
      66.0, 60.0, 73.0, 87.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
      100.0, 100.0, 100.0, 59.0, 62.0, 64.0, 68.0, 72.0, 76.0, 67.0, 59.0, 50.0,
      38.0, 27.0, 15.0, 10.0, 5.0, 0.0, 0.0, 0.0, 0.0, 10.0, 20.0, 31.0, 45.0,
      60.0, 75.0, 83.0, 91.0, 99.0, 98.0, 98.0, 97.0, 98.0, 99.0, 100.0, 100.0,
      100.0, 100.0, 98.0, 96.0, 94.0, 95.0, 96.0,
    ],
    relativehumidity_2m: [
      86.0, 87.0, 88.0, 88.0, 84.0, 78.0, 71.0, 63.0, 52.0, 50.0, 40.0, 37.0,
      39.0, 33.0, 31.0, 33.0, 38.0, 46.0, 60.0, 66.0, 69.0, 68.0, 70.0, 71.0,
      73.0, 74.0, 76.0, 75.0, 69.0, 63.0, 59.0, 50.0, 42.0, 37.0, 37.0, 31.0,
      28.0, 29.0, 29.0, 28.0, 28.0, 32.0, 40.0, 43.0, 44.0, 43.0, 48.0, 51.0,
      54.0, 60.0, 65.0, 70.0, 74.0, 74.0, 70.0, 58.0, 55.0, 50.0, 46.0, 43.0,
      44.0, 44.0, 42.0, 39.0, 38.0, 42.0, 51.0, 57.0, 61.0, 64.0, 66.0, 68.0,
      71.0, 77.0, 82.0, 78.0, 68.0, 60.0, 58.0, 54.0, 48.0, 43.0, 40.0, 37.0,
      38.0, 35.0, 33.0, 31.0, 29.0, 34.0, 44.0, 50.0, 53.0, 57.0, 60.0, 65.0,
      69.0, 71.0, 70.0, 72.0, 62.0, 53.0, 46.0, 40.0, 36.0, 36.0, 41.0, 38.0,
      37.0, 37.0, 37.0, 39.0, 42.0, 47.0, 54.0, 59.0, 65.0, 73.0, 78.0, 83.0,
      88.0, 90.0, 92.0, 90.0, 85.0, 77.0, 70.0, 72.0, 77.0, 80.0, 76.0, 68.0,
      60.0, 58.0, 58.0, 59.0, 61.0, 63.0, 66.0, 69.0, 72.0, 75.0, 76.0, 77.0,
      77.0, 77.0, 78.0, 78.0, 78.0, 78.0, 78.0, 62.0, 57.0, 50.0, 45.0, 41.0,
      37.0, 37.0, 40.0, 44.0, 47.0, 51.0, 55.0, 57.0, 59.0, 62.0, 65.0, 69.0,
      74.0, 77.0, 80.0, 81.0, 78.0, 73.0, 65.0, 60.0, 55.0, 50.0, 47.0, 45.0,
      47.0, 54.0, 65.0, 76.0, 78.0, 78.0, 76.0, 76.0, 76.0, 76.0, 78.0, 81.0,
    ],
    time: [
      1657411200, 1657414800, 1657418400, 1657422000, 1657425600, 1657429200,
      1657432800, 1657436400, 1657440000, 1657443600, 1657447200, 1657450800,
      1657454400, 1657458000, 1657461600, 1657465200, 1657468800, 1657472400,
      1657476000, 1657479600, 1657483200, 1657486800, 1657490400, 1657494000,
      1657497600, 1657501200, 1657504800, 1657508400, 1657512000, 1657515600,
      1657519200, 1657522800, 1657526400, 1657530000, 1657533600, 1657537200,
      1657540800, 1657544400, 1657548000, 1657551600, 1657555200, 1657558800,
      1657562400, 1657566000, 1657569600, 1657573200, 1657576800, 1657580400,
      1657584000, 1657587600, 1657591200, 1657594800, 1657598400, 1657602000,
      1657605600, 1657609200, 1657612800, 1657616400, 1657620000, 1657623600,
      1657627200, 1657630800, 1657634400, 1657638000, 1657641600, 1657645200,
      1657648800, 1657652400, 1657656000, 1657659600, 1657663200, 1657666800,
      1657670400, 1657674000, 1657677600, 1657681200, 1657684800, 1657688400,
      1657692000, 1657695600, 1657699200, 1657702800, 1657706400, 1657710000,
      1657713600, 1657717200, 1657720800, 1657724400, 1657728000, 1657731600,
      1657735200, 1657738800, 1657742400, 1657746000, 1657749600, 1657753200,
      1657756800, 1657760400, 1657764000, 1657767600, 1657771200, 1657774800,
      1657778400, 1657782000, 1657785600, 1657789200, 1657792800, 1657796400,
      1657800000, 1657803600, 1657807200, 1657810800, 1657814400, 1657818000,
      1657821600, 1657825200, 1657828800, 1657832400, 1657836000, 1657839600,
      1657843200, 1657846800, 1657850400, 1657854000, 1657857600, 1657861200,
      1657864800, 1657868400, 1657872000, 1657875600, 1657879200, 1657882800,
      1657886400, 1657890000, 1657893600, 1657897200, 1657900800, 1657904400,
      1657908000, 1657911600, 1657915200, 1657918800, 1657922400, 1657926000,
      1657929600, 1657933200, 1657936800, 1657940400, 1657944000, 1657947600,
      1657951200, 1657954800, 1657958400, 1657962000, 1657965600, 1657969200,
      1657972800, 1657976400, 1657980000, 1657983600, 1657987200, 1657990800,
      1657994400, 1657998000, 1658001600, 1658005200, 1658008800, 1658012400,
      1658016000, 1658019600, 1658023200, 1658026800, 1658030400, 1658034000,
      1658037600, 1658041200, 1658044800, 1658048400, 1658052000, 1658055600,
      1658059200, 1658062800, 1658066400, 1658070000, 1658073600, 1658077200,
      1658080800, 1658084400, 1658088000, 1658091600, 1658095200, 1658098800,
    ],
    temperature_2m: [
      17.8, 17.4, 17.3, 17.7, 19.0, 20.5, 21.5, 23.7, 25.3, 27.0, 28.8, 29.4,
      29.6, 30.0, 30.1, 29.3, 28.2, 27.1, 24.8, 23.6, 22.8, 22.2, 21.5, 21.3,
      21.0, 20.0, 19.6, 19.9, 20.9, 22.3, 24.6, 26.8, 28.7, 29.7, 30.0, 32.7,
      32.6, 31.9, 32.0, 31.0, 30.2, 29.0, 27.1, 25.9, 25.1, 24.9, 23.8, 23.0,
      22.3, 21.4, 20.7, 20.1, 20.0, 20.4, 21.1, 22.1, 22.8, 23.6, 24.6, 25.4,
      25.4, 25.4, 25.3, 25.1, 24.6, 23.7, 22.1, 20.6, 19.6, 18.8, 18.1, 17.4,
      16.7, 16.0, 15.6, 16.8, 18.6, 20.0, 20.8, 22.0, 23.6, 24.7, 25.3, 25.7,
      25.9, 26.2, 26.1, 25.8, 25.4, 24.3, 22.5, 21.3, 20.2, 19.0, 17.8, 16.9,
      16.3, 15.8, 15.6, 16.6, 18.7, 20.9, 23.0, 24.6, 25.1, 25.5, 24.6, 25.3,
      25.2, 25.0, 24.7, 24.2, 23.7, 23.1, 22.0, 21.1, 19.9, 18.6, 17.9, 17.4,
      16.9, 16.7, 16.6, 16.8, 17.3, 18.0, 18.9, 19.2, 19.3, 19.5, 19.9, 20.4,
      20.8, 20.7, 20.5, 19.8, 19.0, 18.0, 16.7, 16.0, 15.4, 14.8, 14.5, 14.4,
      14.3, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 17.7, 18.6, 19.7, 20.4, 20.9,
      21.3, 21.1, 20.8, 20.0, 19.3, 18.5, 17.4, 16.7, 15.9, 15.0, 14.2, 13.5,
      12.8, 12.5, 12.3, 12.5, 13.5, 14.9, 16.6, 17.6, 18.5, 19.3, 19.5, 19.5,
      18.9, 17.8, 16.1, 14.5, 14.1, 14.3, 14.5, 14.4, 14.2, 14.0, 13.8, 13.6,
    ],
    pressure_msl: [
      1011.6, 1011.1, 1011.0, 1010.7, 1010.6, 1010.4, 1010.4, 1009.8, 1009.1,
      1008.5, 1008.4, 1008.7, 1009.2, 1008.4, 1008.1, 1008.6, 1008.9, 1008.7,
      1009.7, 1009.8, 1010.2, 1009.8, 1010.2, 1010.3, 1010.9, 1010.6, 1010.8,
      1010.9, 1010.8, 1010.5, 1010.2, 1009.6, 1009.0, 1008.3, 1007.8, 1007.7,
      1007.8, 1008.0, 1008.1, 1008.2, 1008.2, 1008.5, 1008.4, 1008.2, 1007.4,
      1007.6, 1007.9, 1008.3, 1008.0, 1008.1, 1007.6, 1007.9, 1008.1, 1008.7,
      1009.3, 1010.1, 1010.7, 1011.1, 1011.3, 1011.6, 1011.9, 1012.2, 1012.1,
      1012.4, 1012.7, 1013.2, 1013.5, 1014.0, 1014.1, 1014.0, 1013.9, 1014.0,
      1014.0, 1014.0, 1013.8, 1013.6, 1013.7, 1013.7, 1013.8, 1013.8, 1013.2,
      1012.6, 1012.0, 1011.8, 1011.5, 1011.1, 1010.7, 1010.4, 1010.5, 1010.7,
      1011.1, 1011.3, 1011.1, 1010.8, 1010.5, 1010.4, 1010.3, 1010.1, 1010.0,
      1010.0, 1009.9, 1009.8, 1009.5, 1009.0, 1008.5, 1008.2, 1007.8, 1007.3,
      1006.7, 1006.2, 1005.6, 1005.0, 1004.8, 1004.6, 1004.2, 1003.8, 1003.2,
      1002.5, 1002.1, 1001.7, 1001.2, 1000.8, 1000.5, 1000.0, 999.8, 999.6,
      999.4, 999.4, 999.4, 999.5, 999.5, 999.5, 999.6, 999.7, 999.7, 999.9,
      1000.1, 1000.4, 1000.7, 1000.6, 1000.5, 1000.3, 1000.1, 999.9, 999.7,
      999.5, 999.2, 999.1, 999.2, 999.4, 999.6, 1008.0, 1008.1, 1008.3, 1008.4,
      1008.4, 1008.5, 1008.6, 1008.7, 1008.9, 1009.1, 1009.4, 1009.7, 1009.8,
      1009.8, 1009.9, 1010.0, 1010.1, 1010.2, 1010.3, 1010.3, 1010.3, 1010.3,
      1010.2, 1010.1, 1009.9, 1009.7, 1009.6, 1009.6, 1009.7, 1010.0, 1010.3,
      1010.6, 1010.9, 1010.9, 1010.7, 1010.3, 1010.0, 1009.7, 1009.3, 1008.9,
      1008.6,
    ],
  },
  hourly_units: {
    pressure_msl: "hPa",
    cloudcover: "%",
    time: "unixtime",
    relativehumidity_2m: "%",
    weathercode: "wmo code",
    winddirection_10m: "°",
    windspeed_10m: "km/h",
    temperature_2m: "°C",
  },
};

export default MOCK_RESPONSE;
