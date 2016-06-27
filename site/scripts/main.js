/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

		// create lightbox images for articles images
		if(!Site.is_mobile())
			Site.lightbox = new LightBox( $('a.lightbox'), false, false, true);


    // function for displaying drop down menu on tablets
    var menu = document.getElementById('main');
    var drop_menu = document.querySelector('nav.mobile_menu');

    var open_drop_down = function() {
      this.classList.toggle('show');
    }
    menu.addEventListener('click', open_drop_down, false);
};

//maxmind geoip script
var onSuccess = function(location){
  var zipcode = location.postal.code;
  var areas = {
  	'Brooklyn NY': [11201,11202,11203,11204,11205,11206,11207,11208,11209,11210,11211,11212,11213,11214,11215,11216,11217,11218,11219,11220,11221,11222,11223,11224,11225,11226,11228,11229,11230,11231,11232,11233,11234,11235,11236,11237,11238,11239,11241,11242,11243,11245,11247,11249,11251,11252,11256],
  	'Queens NY': [11101,11102,11103,11104,11106,11109,11120,11351,11352,11354,11355,11356,11357,11358,11359,11360,11361,11362,11363,11364,11365,11366,11367,11368,11369,11370,11371,11372,11373,11374,11375,11377,11378,11379,11380,11381,11385,11386,11405,11411,11413,11414,11415,11416,11417,11418,11419,11420,11421,11422,11423,11424,11425,11426,11427,11428,11429,11430,11431,11432,11433,11434,11435,11436,11439,11451,11690,11691,11692,11693,11694,11695,11697],
  	'Manhattan NY': [10001,10002,10003,10005,10006,10007,10008,10009,10010,10012,10013,10014,10016,10017,10018,10019,10020,10021,10022,10023,10024,10025,10027,10028,10029,10030,10031,10032,10033,10034,10035,10036,10037,10038,10039,10040,10041,10055,10101,10103,10104,10105,10106,10107,10108,10110,10111,10112,10113,10118,10119,10120,10121,10122,10123,10128,10150,10151,10152,10153,10154,10155,10158,10159,10162,10165,10166,10167,10168,10169,10170,10171,10172,10173,10174,10175,10176,10177,10178,10249,10256,10268,10270,10271,10276,10278,10279,10280,10281,10282,10286],
  	'Bronx NY': [10451,10452,10453,10454,10455,10456,10457,10458,10459,10460,10461,10462,10463,10464,10465,10466,10467,10468,10469,10470,10471,10472,10473,10474,10475,10499],
  	'Los Angeles CA': [90001,90002,90003,90004,90005,90006,90007,90008,90009,90010,90011,90012,90013,90014,90015,90016,90017,90018,90019,90020,90021,90022,90023,90024,90025,90026,90027,90028,90029,90030,90031,90032,90033,90034,90035,90036,90037,90038,90039,90040,90041,90042,90043,90044,90045,90046,90047,90048,90049,90050,90051,90052,90053,90054,90055,90056,90057,90058,90059,90060,90061,90062,90063,90064,90065,90066,90067,90068,90069,90070,90071,90072,90073,90074,90075,90076,90077,90078,90079,90080,90081,90082,90083,90084,90086,90087,90088,90089,90090,90091,90093,90094,90095,90096,90099,90101,90103,90189,90230,91331,91335],
  	'Thousand Oaks CA': [91319,91320,91358,91359,91360,91361,91362],
  	'Simi Valley CA': [93062,93063,93064,93065,93094,93099],
  	'Calabasas CA': [91301,91302,91372],
  	'Santa Monica, CA': [90401,90402,90403,90404,90405,90406,90407,90408,90409,90410,90411]
  };

  // find area
  var area = null;
  for(var key in areas)
   	if (areas[key].indexOf(zipcode) > -1) {
  		area = key;
  		break;
  	}

  if (area) {
  	$("span.location").text(area);
  }
  $("span.location").text("your area");

};
 
var onError = function(error){
  console.log(
      "Error:\n\n"
      + JSON.stringify(error, undefined, 4)
  );
};
 
geoip2.city(onSuccess, onError);


// connect document `load` event with handler function
$(Site.on_load);
