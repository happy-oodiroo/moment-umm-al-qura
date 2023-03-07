// moment-umm-al-qura.js
// author: Saïd Sassi
// This is a modified version of moment-hijri by Suhail Alkowaileet
// license: MIT

'use strict';

/************************************
    Expose Moment Hijri
************************************/
(function (root, factory) {
	/* global define */
	if (typeof define === 'function' && define.amd) {
		define(['moment'], function (moment) {
			root.moment = factory(moment)
			return root.moment
		})
	} else if (typeof exports === 'object') {
		module.exports = factory(require('moment'))
	} else {
		root.moment = factory(root.moment)
	}
})(this, function (moment) { // jshint ignore:line

	if (moment == null) {
		throw new Error('Cannot find moment')
	}

	/************************************
      Constants
  ************************************/

	var ummalqura = {
		ummalquraData: [
			28607, 28637, 28666, 28695, 28725, 28754, 28783, 28813, 28843, 28872, 28902, 28932, 28962, 28991, 29021, 29050, 29079, 29109, 29138, 29167,
			29197, 29227, 29256, 29286, 29316, 29346, 29375, 29405, 29434, 29463, 29493, 29522, 29551, 29581, 29610, 29640, 29670, 29700, 29729, 29759,
			29789, 29818, 29847, 29877, 29906, 29935, 29965, 29994, 30024, 30054, 30083, 30113, 30143, 30172, 30202, 30231, 30261, 30290, 30320, 30349,
			30378, 30408, 30437, 30467, 30497, 30526, 30556, 30586, 30615, 30645, 30674, 30704, 30733, 30762, 30792, 30821, 30851, 30880, 30910, 30940,
			30969, 30999, 31029, 31058, 31088, 31117, 31147, 31176, 31205, 31235, 31264, 31294, 31323, 31353, 31383, 31412, 31442, 31472, 31501, 31531,
			31560, 31589, 31619, 31648, 31678, 31707, 31737, 31766, 31796, 31826, 31856, 31885, 31915, 31944, 31973, 32003, 32032, 32061, 32091, 32120,
			32150, 32180, 32210, 32240, 32269, 32299, 32328, 32357, 32387, 32416, 32445, 32475, 32504, 32534, 32564, 32594, 32623, 32653, 32683, 32712,
			32741, 32771, 32800, 32829, 32859, 32888, 32918, 32948, 32977, 33007, 33037, 33066, 33096, 33125, 33155, 33184, 33213, 33243, 33272, 33302,
			33331, 33361, 33391, 33421, 33450, 33480, 33509, 33539, 33568, 33597, 33627, 33656, 33686, 33715, 33745, 33775, 33804, 33834, 33863, 33893,
			33923, 33952, 33982, 34011, 34040, 34070, 34099, 34129, 34158, 34188, 34217, 34247, 34277, 34306, 34336, 34366, 34395, 34425, 34454, 34483,
			34513, 34542, 34572, 34601, 34631, 34661, 34690, 34720, 34750, 34779, 34809, 34838, 34867, 34897, 34926, 34955, 34985, 35015, 35044, 35074,
			35104, 35134, 35163, 35193, 35222, 35251, 35281, 35310, 35339, 35369, 35398, 35428, 35458, 35488, 35517, 35547, 35577, 35606, 35635, 35665,
			35694, 35723, 35753, 35782, 35812, 35842, 35871, 35901, 35931, 35960, 35990, 36019, 36049, 36078, 36107, 36137, 36166, 36196, 36225, 36255,
			36285, 36315, 36344, 36374, 36403, 36433, 36462, 36491, 36521, 36550, 36580, 36609, 36639, 36669, 36698, 36728, 36758, 36787, 36817, 36846,
			36875, 36905, 36934, 36964, 36993, 37023, 37052, 37082, 37112, 37141, 37171, 37200, 37230, 37259, 37289, 37318, 37348, 37377, 37407, 37436, 
			37466, 37495, 37525, 37555, 37584, 37614, 37643, 37673, 37703, 37732, 37761, 37791, 37820, 37849, 37879, 37909, 37938, 37968, 37998, 38027, 
			38057, 38087, 38116, 38145, 38175, 38204, 38233, 38263, 38292, 38322, 38352, 38382, 38411, 38441, 38471, 38500, 38529, 38559, 38588, 38617, 
			38647, 38676, 38706, 38736, 38765, 38795, 38825, 38855, 38884, 38913, 38943, 38972, 39001, 39031, 39060, 39090, 39119, 39149, 39179, 39209, 
			39238, 39268, 39297, 39327, 39356, 39385, 39415, 39444, 39474, 39503, 39533, 39563, 39592, 39622, 39652, 39681, 39711, 39740, 39769, 39799, 
			39828, 39858, 39887, 39917, 39946, 39976, 40006, 40035, 40065, 40094, 40124, 40153, 40183, 40212, 40242, 40271, 40301, 40330, 40360, 40389, 
			40419, 40449, 40478, 40508, 40537, 40567, 40596, 40626, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980, 
			41010, 41039, 41069, 41098, 41127, 41157, 41186, 41216, 41246, 41276, 41305, 41335, 41365, 41394, 41423, 41453, 41482, 41511, 41541, 41570, 
			41600, 41630, 41659, 41689, 41719, 41749, 41778, 41807, 41837, 41866, 41895, 41925, 41954, 41984, 42013, 42043, 42073, 42103, 42132, 42162, 
			42191, 42221, 42250, 42279, 42309, 42338, 42368, 42397, 42427, 42457, 42486, 42516, 42546, 42575, 42605, 42634, 42663, 42693, 42722, 42752, 
			42781, 42811, 42840, 42870, 42900, 42930, 42959, 42989, 43018, 43047, 43077, 43106, 43136, 43165, 43195, 43224, 43254, 43284, 43313, 43343, 
			43372, 43402, 43431, 43461, 43490, 43520, 43549, 43579, 43608, 43638, 43667, 43697, 43727, 43756, 43786, 43815, 43845, 43874, 43904, 43933, 
			43963, 43992, 44022, 44051, 44081, 44110, 44140, 44170, 44199, 44229, 44258, 44288, 44317, 44347, 44376, 44405, 44435, 44464, 44494, 44524, 
			44553, 44583, 44613, 44642, 44672, 44701, 44731, 44760, 44789, 44819, 44848, 44878, 44907, 44937, 44967, 44997, 45026, 45056, 45085, 45115, 
			45144, 45173, 45203, 45232, 45262, 45291, 45321, 45351, 45381, 45410, 45440, 45469, 45499, 45528, 45557, 45587, 45616, 45645, 45675, 45705, 
			45734, 45764, 45794, 45824, 45853, 45883, 45912, 45941, 45971, 46000, 46029, 46059, 46089, 46118, 46148, 46178, 46207, 46237, 46266, 46296, 
			46325, 46355, 46384, 46414, 46443, 46473, 46502, 46532, 46561, 46591, 46621, 46650, 46680, 46709, 46739, 46768, 46798, 46827, 46857, 46886, 
			46916, 46945, 46975, 47004, 47034, 47064, 47093, 47123, 47152, 47182, 47211, 47241, 47270, 47299, 47329, 47358, 47388, 47418, 47447, 47477, 
			47507, 47536, 47566, 47595, 47625, 47654, 47683, 47713, 47742, 47772, 47801, 47831, 47861, 47891, 47920, 47950, 47979, 48009, 48038, 48067, 
			48097, 48126, 48156, 48185, 48215, 48245, 48274, 48304, 48334, 48363, 48393, 48422, 48451, 48481, 48510, 48539, 48569, 48599, 48628, 48658, 
			48688, 48718, 48747, 48777, 48806, 48835, 48865, 48894, 48923, 48953, 48983, 49012, 49042, 49072, 49101, 49131, 49161, 49190, 49219, 49249, 
			49278, 49307, 49337, 49366, 49396, 49426, 49456, 49485, 49515, 49544, 49574, 49603, 49633, 49662, 49691, 49721, 49750, 49780, 49810, 49839, 
			49869, 49899, 49928, 49958, 49987, 50017, 50046, 50076, 50105, 50134, 50164, 50193, 50223, 50253, 50282, 50312, 50341, 50371, 50401, 50430, 
			50460, 50489, 50519, 50548, 50577, 50607, 50636, 50666, 50695, 50725, 50755, 50785, 50814, 50844, 50873, 50903, 50932, 50961, 50991, 51020, 
			51050, 51079, 51109, 51139, 51168, 51198, 51228, 51257, 51287, 51316, 51346, 51375, 51404, 51434, 51463, 51493, 51523, 51553, 51583, 51612, 
			51642, 51671, 51700, 51730, 51759, 51788, 51817, 51847, 51877, 51907, 51937, 51966, 51996, 52026, 52055, 52084, 52114, 52143, 52172, 52201, 
			52231, 52261, 52291, 52320, 52350, 52380, 52409, 52439, 52468, 52498, 52527, 52556, 52586, 52615, 52645, 52674, 52704, 52734, 52763, 52793, 
			52823, 52852, 52882, 52911, 52940, 52970, 52999, 53029, 53058, 53088, 53117, 53147, 53177, 53206, 53236, 53265, 53295, 53325, 53354, 53384, 
			53413, 53442, 53472, 53501, 53531, 53560, 53590, 53620, 53649, 53679, 53709, 53738, 53768, 53797, 53826, 53856, 53885, 53915, 53944, 53974, 
			54004, 54033, 54063, 54093, 54122, 54152, 54181, 54210, 54240, 54269, 54298, 54328, 54358, 54388, 54417, 54447, 54477, 54506, 54536, 54565, 
			54594, 54624, 54653, 54682, 54712, 54742, 54771, 54801, 54831, 54860, 54890, 54920, 54949, 54978, 55008, 55037, 55067, 55096, 55126, 55155, 
			55185, 55214, 55244, 55274, 55303, 55333, 55362, 55392, 55421, 55451, 55480, 55509, 55539, 55568, 55598, 55628, 55658, 55687, 55717, 55746, 
			55776, 55805, 55835, 55864, 55893, 55923, 55952, 55982, 56012, 56041, 56071, 56101, 56130, 56160, 56189, 56219, 56248, 56277, 56307, 56336, 
			56366, 56395, 56425, 56455, 56484, 56514, 56544, 56573, 56602, 56632, 56661, 56691, 56720, 56750, 56779, 56809, 56838, 56868, 56898, 56927, 
			56957, 56986, 57016, 57045, 57075, 57104, 57134, 57163, 57193, 57222, 57252, 57281, 57311, 57341, 57370, 57400, 57430, 57459, 57488, 57518, 
			57547, 57577, 57606, 57635, 57665, 57695, 57724, 57754, 57784, 57814, 57843, 57872, 57902, 57931, 57960, 57990, 58019, 58049, 58078, 58108, 
			58138, 58168, 58197, 58227, 58256, 58286, 58315, 58344, 58374, 58403, 58433, 58462, 58492, 58522, 58552, 58581, 58611, 58640, 58670, 58699, 
			58728, 58758, 58787, 58817, 58846, 58876, 58906, 58935, 58965, 58995, 59024, 59054, 59083, 59112, 59142, 59171, 59201, 59230, 59260, 59289, 
			59319, 59349, 59378, 59408, 59437, 59467, 59496, 59526, 59555, 59585, 59614, 59644, 59673, 59703, 59732, 59762, 59792, 59821, 59851, 59880, 
			59910, 59940, 59969, 59998, 60028, 60057, 60087, 60116, 60146, 60175, 60205, 60235, 60265, 60294, 60324, 60353, 60382, 60412, 60441, 60470, 
			60500, 60529, 60559, 60589, 60619, 60648, 60678, 60708, 60737, 60766, 60796, 60825, 60854, 60884, 60913, 60943, 60973, 61003, 61032, 61062, 
			61091, 61121, 61150, 61180, 61209, 61238, 61268, 61297, 61327, 61357, 61386, 61416, 61446, 61475, 61505, 61534, 61564, 61593, 61622, 61652, 
			61681, 61711, 61740, 61770, 61800, 61829, 61859, 61889, 61918, 61948, 61977, 62007, 62036, 62065, 62095, 62124, 62154, 62183, 62213, 62243, 
			62272, 62302, 62332, 62361, 62391, 62420, 62449, 62479, 62508, 62538, 62567, 62597, 62626, 62656, 62686, 62716, 62745, 62775, 62804, 62833, 
			62863, 62892, 62922, 62951, 62981, 63010, 63040, 63070, 63100, 63129, 63158, 63188, 63217, 63247, 63276, 63306, 63335, 63364, 63394, 63424, 
			63454, 63483, 63513, 63542, 63572, 63601, 63631, 63660, 63690, 63719, 63748, 63778, 63808, 63837, 63867, 63896, 63926, 63956, 63985, 64015, 
			64044, 64074, 64103, 64132, 64162, 64191, 64221, 64250, 64280, 64310, 64340, 64369, 64399, 64428, 64458, 64487, 64516, 64546, 64575, 64604, 
			64634, 64664, 64693, 64723, 64753, 64783, 64812, 64842, 64871, 64900, 64930, 64959, 64988, 65018, 65048, 65077, 65107, 65137, 65167, 65196, 
			65226, 65255, 65284, 65314, 65343, 65372, 65402, 65432, 65461, 65491, 65521, 65550, 65580, 65609, 65639, 65668, 65698, 65727, 65756, 65786, 
			65816, 65845, 65875, 65904, 65934, 65964, 65993, 66023, 66052, 66082, 66111, 66141, 66170, 66200, 66229, 66259, 66288, 66318, 66347, 66377, 
			66406, 66436, 66466, 66495, 66525, 66554, 66584, 66613, 66642, 66672, 66701, 66731, 66761, 66790, 66820, 66850, 66879, 66909, 66938, 66968, 
			66997, 67026, 67056, 67085, 67115, 67144, 67174, 67204, 67234, 67263, 67293, 67322, 67352, 67381, 67410, 67440, 67469, 67498, 67528, 67558, 
			67588, 67618, 67647, 67677, 67706, 67736, 67765, 67794, 67824, 67853, 67883, 67912, 67942, 67972, 68001, 68031, 68061, 68090, 68120, 68149, 
			68178, 68208, 68237, 68267, 68296, 68326, 68355, 68385, 68415, 68444, 68474, 68503, 68533, 68562, 68592, 68621, 68651, 68680, 68709, 68739, 
			68769, 68798, 68828, 68858, 68887, 68917, 68947, 68976, 69005, 69035, 69064, 69093, 69123, 69153, 69182, 69212, 69241, 69271, 69301, 69331, 
			69360, 69389, 69419, 69448, 69477, 69507, 69536, 69566, 69596, 69625, 69655, 69685, 69714, 69744, 69773, 69803, 69832, 69862, 69891, 69920, 
			69950, 69979, 70009, 70039, 70068, 70098, 70127, 70157, 70187, 70216, 70246, 70275, 70304, 70334, 70363, 70393, 70422, 70452, 70482, 70511, 
			70541, 70571, 70600, 70630, 70659, 70688, 70718, 70747, 70777, 70806, 70836, 70865, 70895, 70925, 70955, 70984, 71014, 71043, 71072, 71102, 
			71131, 71160, 71190, 71219, 71249, 71279, 71309, 71338, 71368, 71398, 71427, 71456, 71486, 71515, 71544, 71574, 71603, 71633, 71663, 71692, 
			71722, 71752, 71782, 71811, 71840, 71870, 71899, 71928, 71958, 71987, 72017, 72047, 72076, 72106, 72136, 72165, 72195, 72224, 72254, 72283, 
			72312, 72342, 72371, 72401, 72430, 72460, 72490, 72519, 72549, 72578, 72608, 72638, 72667, 72696, 72726, 72755, 72785, 72814, 72844, 72873, 
			72903, 72932, 72962, 72992, 73021, 73051, 73081, 73110, 73140, 73169, 73198, 73228, 73257, 73287, 73316, 73346, 73376, 73405, 73435, 73465, 
			73494, 73524, 73553, 73582, 73612, 73641, 73670, 73700, 73730, 73759, 73789, 73819, 73849, 73878, 73908, 73937, 73966, 73996, 74025, 74054, 
			74084, 74114, 74143, 74173, 74203, 74232, 74262, 74292, 74321, 74350, 74380, 74409, 74438, 74468, 74498, 74527, 74557, 74586, 74616, 74646, 
			74676, 74705, 74734, 74764, 74793, 74823, 74852, 74882, 74911, 74941, 74970, 75000, 75030, 75059, 75089, 75118, 75148, 75177, 75207, 75236, 
			75265, 75295, 75324, 75354, 75384, 75413, 75443, 75473, 75502, 75532, 75561, 75591, 75620, 75649, 75679, 75708, 75738, 75767, 75797, 75827, 
			75857, 75886, 75916, 75945, 75975, 76004, 76033, 76063, 76092, 76122, 76151, 76181, 76211, 76240, 76270, 76300, 76329, 76359, 76388, 76417, 
			76447, 76476, 76506, 76535, 76565, 76594, 76624, 76654, 76683, 76713, 76742, 76772, 76802, 76831, 76860, 76890, 76919, 76949, 76978, 77008, 
			77037, 77067, 77097, 77126, 77156, 77186, 77215, 77244, 77274, 77303, 77333, 77362, 77391, 77421, 77451, 77480, 77510, 77540, 77570, 77599, 
			77628, 77658, 77687, 77716, 77746, 77775, 77805, 77834, 77864, 77894, 77924, 77953, 77983, 78012, 78042, 78071, 78100, 78130, 78159, 78189, 
			78218, 78248, 78278, 78308, 78337, 78367, 78396, 78426, 78455, 78484, 78514, 78543, 78573, 78602, 78632, 78662, 78691, 78721, 78751, 78780, 
			78809, 78839, 78868, 78898, 78927, 78957, 78986, 79016, 79045, 79075, 79105, 79134, 79164, 79193, 79223, 79252, 79282, 79311, 79341, 79370, 
			79400, 79429, 79459, 79488, 79518, 79547, 79577, 79607, 79636, 79666, 79696, 79725, 79754, 79784, 79813, 79842, 79872, 79901, 79931, 79961, 
			79991
		]
	}

	var formattingTokens = /(\[[^\[]*\])|(\\)?i(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g

	, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.?)|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/

	, unitAliases = {
		hd: 'idate',
		hm: 'imonth',
		hy: 'iyear'
	}

	, formatFunctions = {}

	, ordinalizeTokens = 'DDD w M D'.split(' '), paddedTokens = 'M D w'.split(' ')

	, formatTokenFunctions = {
		iM: function () {
			return this.iMonth() + 1
		},
		iMMM: function (format) {
			return this.localeData().iMonthsShort(this, format)
		},
		iMMMM: function (format) {
			return this.localeData().iMonths(this, format)
		},
		iD: function () {
			return this.iDate()
		},
		iDDD: function () {
			return this.iDayOfYear()
		},
		iw: function () {
			return this.iWeek()
		},
		iYY: function () {
			return leftZeroFill(this.iYear() % 100, 2)
		},
		iYYYY: function () {
			return leftZeroFill(this.iYear(), 4)
		},
		iYYYYY: function () {
			return leftZeroFill(this.iYear(), 5)
		},
		igg: function () {
			return leftZeroFill(this.iWeekYear() % 100, 2)
		},
		igggg: function () {
			return this.iWeekYear()
		},
		iggggg: function () {
			return leftZeroFill(this.iWeekYear(), 5)
		}
	}, i

	function padToken(func, count) {
		return function (a) {
			return leftZeroFill(func.call(this, a), count)
		}
	}

	function ordinalizeToken(func, period) {
		return function (a) {
			return this.localeData().ordinal(func.call(this, a), period)
		}
	}

	while (ordinalizeTokens.length) {
		i = ordinalizeTokens.pop()
		formatTokenFunctions['i' + i + 'o'] = ordinalizeToken(formatTokenFunctions['i' + i], i)
	}
	while (paddedTokens.length) {
		i = paddedTokens.pop()
		formatTokenFunctions['i' + i + i] = padToken(formatTokenFunctions['i' + i], 2)
	}
	formatTokenFunctions.iDDDD = padToken(formatTokenFunctions.iDDD, 3)

	/************************************
      Helpers
  ************************************/

	function extend(a, b) {
		var key
		for (key in b)
			if (b.hasOwnProperty(key))
				a[key] = b[key]
		return a
	}

	function leftZeroFill(number, targetLength) {
		var output = number + ''
		while (output.length < targetLength)
			output = '0' + output
		return output
	}

	function isArray(input) {
		return Object.prototype.toString.call(input) === '[object Array]'
	}

	function normalizeUnits(units) {
		return units ? unitAliases[units] || units.toLowerCase().replace(/(.)s$/, '$1') : units
	}

	function setDate(moment, year, month, date) {
		var utc = moment._isUTC ? 'UTC' : ''
		moment._d['set' + utc + 'FullYear'](year)
		moment._d['set' + utc + 'Month'](month)
		moment._d['set' + utc + 'Date'](date)
	}

	function objectCreate(parent) {
		function F() {}
		F.prototype = parent
		return new F()
	}

	function getPrototypeOf(object) {
		if (Object.getPrototypeOf)
			return Object.getPrototypeOf(object)
		else if (''.__proto__) // jshint ignore:line
			return object.__proto__ // jshint ignore:line
		else
			return object.constructor.prototype
	}

	/************************************
      Languages
  ************************************/
	extend(getPrototypeOf(moment.localeData()), {
		_iMonths: ['Muharram'
                , 'Safar'
                , 'Rabi\' al-Awwal'
                , 'Rabi\' al-Thani'
                , 'Jumada al-Ula'
                , 'Jumada al-Alkhirah'
                , 'Rajab'
                , 'Sha’ban'
                , 'Ramadhan'
                , 'Shawwal'
                , 'Thul-Qi’dah'
                , 'Thul-Hijjah'
                ],
		iMonths: function (m) {
			return this._iMonths[m.iMonth()]
		}

		,
		_iMonthsShort: ['Muh'
                      , 'Saf'
                      , 'Rab-I'
                      , 'Rab-II'
                      , 'Jum-I'
                      , 'Jum-II'
                      , 'Raj'
                      , 'Sha'
                      , 'Ram'
                      , 'Shw'
                      , 'Dhu-Q'
                      , 'Dhu-H'
                      ],
		iMonthsShort: function (m) {
			return this._iMonthsShort[m.iMonth()]
		}

		,
		iMonthsParse: function (monthName) {
			var i, mom, regex
			if (!this._iMonthsParse)
				this._iMonthsParse = []
			for (i = 0; i < 12; i += 1) {
				// Make the regex if we don't have it already.
				if (!this._iMonthsParse[i]) {
					mom = hMoment([2000, (2 + i) % 12, 25])
					regex = '^' + this.iMonths(mom, '') + '$|^' + this.iMonthsShort(mom, '') + '$'
					this._iMonthsParse[i] = new RegExp(regex.replace('.', ''), 'i')
				}
				// Test the regex.
				if (this._iMonthsParse[i].test(monthName))
					return i
			}
		}
	});
	var iMonthNames = {
		iMonths: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
		iMonthsShort: 'محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_')
	};

	// Default to the momentjs 2.12+ API
	if (typeof moment.updateLocale === 'function') {
		moment.updateLocale('ar-sa', iMonthNames);
	} else {
		var oldLocale = moment.locale();
		moment.defineLocale('ar-sa', iMonthNames);
		moment.locale(oldLocale);
	}

	/************************************
      Formatting
  ************************************/

	function makeFormatFunction(format) {
		var array = format.match(formattingTokens),
			length = array.length,
			i

		for (i = 0; i < length; i += 1)
			if (formatTokenFunctions[array[i]])
				array[i] = formatTokenFunctions[array[i]]

		return function (mom) {
			var output = ''
			for (i = 0; i < length; i += 1)
				output += array[i] instanceof Function ? '[' + array[i].call(mom, format) + ']' : array[i]
			return output
		}
	}

	/************************************
      Parsing
  ************************************/

	function getParseRegexForToken(token, config) {
		switch (token) {
		case 'iDDDD':
			return parseTokenThreeDigits
		case 'iYYYY':
			return parseTokenFourDigits
		case 'iYYYYY':
			return parseTokenSixDigits
		case 'iDDD':
			return parseTokenOneToThreeDigits
		case 'iMMM':
		case 'iMMMM':
			return parseTokenWord
		case 'iMM':
		case 'iDD':
		case 'iYY':
		case 'iM':
		case 'iD':
			return parseTokenOneOrTwoDigits
		case 'DDDD':
			return parseTokenThreeDigits
		case 'YYYY':
			return parseTokenFourDigits
		case 'YYYYY':
			return parseTokenSixDigits
		case 'S':
		case 'SS':
		case 'SSS':
		case 'DDD':
			return parseTokenOneToThreeDigits
		case 'MMM':
		case 'MMMM':
		case 'dd':
		case 'ddd':
		case 'dddd':
			return parseTokenWord
		case 'a':
		case 'A':
			return moment.localeData(config._l)._meridiemParse
		case 'X':
			return parseTokenTimestampMs
		case 'Z':
		case 'ZZ':
			return parseTokenTimezone
		case 'T':
			return parseTokenT
		case 'MM':
		case 'DD':
		case 'YY':
		case 'HH':
		case 'hh':
		case 'mm':
		case 'ss':
		case 'M':
		case 'D':
		case 'd':
		case 'H':
		case 'h':
		case 'm':
		case 's':
			return parseTokenOneOrTwoDigits
		default:
			return new RegExp(token.replace('\\', ''))
		}
	}

	function addTimeToArrayFromToken(token, input, config) {
		var a, datePartArray = config._a

		switch (token) {
		case 'iM':
		case 'iMM':
			datePartArray[1] = input == null ? 0 : ~~input - 1
			break
		case 'iMMM':
		case 'iMMMM':
			a = moment.localeData(config._l).iMonthsParse(input)
			if (a != null)
				datePartArray[1] = a
			else
				config._isValid = false
			break
		case 'iD':
		case 'iDD':
		case 'iDDD':
		case 'iDDDD':
			if (input != null)
				datePartArray[2] = ~~input
			break
		case 'iYY':
			datePartArray[0] = ~~input + (~~input > 47 ? 1300 : 1400)
			break
		case 'iYYYY':
		case 'iYYYYY':
			datePartArray[0] = ~~input
		}
		if (input == null)
			config._isValid = false
	}

	function dateFromArray(config) {
		var g, h, hy = config._a[0],
			hm = config._a[1],
			hd = config._a[2]

		if ((hy == null) && (hm == null) && (hd == null))
			return [0, 0, 1]
		hy = hy || 0
		hm = hm || 0
		hd = hd || 1
		if (hd < 1 || hd > hMoment.iDaysInMonth(hy, hm))
			config._isValid = false
		g = toGregorian(hy, hm, hd)
		h = toHijri(g.gy, g.gm, g.gd)
		config._hDiff = 0
		if (~~h.hy !== hy)
			config._hDiff += 1
		if (~~h.hm !== hm)
			config._hDiff += 1
		if (~~h.hd !== hd)
			config._hDiff += 1
		return [g.gy, g.gm, g.gd]
	}

	function makeDateFromStringAndFormat(config) {
		var tokens = config._f.match(formattingTokens),
			string = config._i,
			len = tokens.length,
			i, token, parsedInput

		config._a = []

		for (i = 0; i < len; i += 1) {
			token = tokens[i]
			parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
			if (parsedInput)
				string = string.slice(string.indexOf(parsedInput) + parsedInput.length)
			if (formatTokenFunctions[token])
				addTimeToArrayFromToken(token, parsedInput, config)
		}
		if (string)
			config._il = string

		return dateFromArray(config)
	}

	function makeDateFromStringAndArray(config, utc) {
		var len = config._f.length
		, i
		, format
		, tempMoment
		, bestMoment
		, currentScore
		, scoreToBeat

		if (len === 0) {
			return makeMoment(new Date(NaN))
		}

		for (i = 0; i < len; i += 1) {
			format = config._f[i]
			currentScore = 0
			tempMoment = makeMoment(config._i, format, config._l, utc)

			if (!tempMoment.isValid()) continue

			currentScore += tempMoment._hDiff
			if (tempMoment._il)
				currentScore += tempMoment._il.length
			if (scoreToBeat == null || currentScore < scoreToBeat) {
				scoreToBeat = currentScore
				bestMoment = tempMoment
			}
		}

		return bestMoment
	}

	function removeParsedTokens(config) {
		var string = config._i,
			input = '',
			format = '',
			array = config._f.match(formattingTokens),
			len = array.length,
			i, match, parsed

		for (i = 0; i < len; i += 1) {
			match = array[i]
			parsed = (getParseRegexForToken(match, config).exec(string) || [])[0]
			if (parsed)
				string = string.slice(string.indexOf(parsed) + parsed.length)
			if (!(formatTokenFunctions[match] instanceof Function)) {
				format += match
				if (parsed)
					input += parsed
			}
		}
		config._i = input
		config._f = format
	}

	/************************************
      Week of Year
  ************************************/

	function iWeekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
		var end = firstDayOfWeekOfYear - firstDayOfWeek,
			daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
			adjustedMoment

		if (daysToDayOfWeek > end) {
			daysToDayOfWeek -= 7
		}
		if (daysToDayOfWeek < end - 7) {
			daysToDayOfWeek += 7
		}
		adjustedMoment = hMoment(mom).add(daysToDayOfWeek, 'd')
		return {
			week: Math.ceil(adjustedMoment.iDayOfYear() / 7),
			year: adjustedMoment.iYear()
		}
	}

	/************************************
      Top Level Functions
  ************************************/

	function makeMoment(input, format, lang, utc) {
		var config =
			{ _i: input
			, _f: format
			, _l: lang
			}
			, date
			, m
			, hm
		if (format) {
			if (isArray(format)) {
				return makeDateFromStringAndArray(config, utc)
			} else {
				date = makeDateFromStringAndFormat(config)
				removeParsedTokens(config)
				format = 'YYYY-MM-DD-' + config._f
				input = leftZeroFill(date[0], 4) + '-'
					+ leftZeroFill(date[1] + 1, 2) + '-'
					+ leftZeroFill(date[2], 2) + '-'
					+ config._i
			}
		}
		if (utc)
			m = moment.utc(input, format, lang)
		else
			m = moment(input, format, lang)
		if (config._isValid === false)
			m._isValid = false
		m._hDiff = config._hDiff || 0
		hm = objectCreate(hMoment.fn)
		extend(hm, m)
		return hm
	}

	function hMoment(input, format, lang) {
		return makeMoment(input, format, lang, false)
	}

	extend(hMoment, moment)
	hMoment.fn = objectCreate(moment.fn)

	hMoment.utc = function (input, format, lang) {
		return makeMoment(input, format, lang, true)
	}

	/************************************
      hMoment Prototype
  ************************************/

	hMoment.fn.format = function (format) {
		var i, replace, me = this

		if (format) {
			i = 5
			replace = function (input) {
				return me.localeData().longDateFormat(input) || input
			}
			while (i > 0 && localFormattingTokens.test(format)) {
				i -= 1
				format = format.replace(localFormattingTokens, replace)
			}
			if (!formatFunctions[format]) {
				formatFunctions[format] = makeFormatFunction(format)
			}
			format = formatFunctions[format](this)
		}
		return moment.fn.format.call(this, format)
	}

	hMoment.fn.iYear = function (input) {
		var lastDay, h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(input, h.hm))
			g = toGregorian(input, h.hm, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hy
		}
	}

	hMoment.fn.iMonth = function (input) {
		var lastDay, h, g
		if (input != null) {
			if (typeof input === 'string') {
				input = this.localeData().iMonthsParse(input)
				if(input >= 0) {
					input -= 1
				} else {
					return this
				}
			}
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(h.hy, input))
			this.iYear(h.hy + div(input, 12))
			input = mod(input, 12)
			if (input < 0) {
				input += 12
				this.iYear(this.iYear() - 1)
			}
			g = toGregorian(this.iYear(), input, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hm
		}
	}

	hMoment.fn.iDate = function (input) {
		var h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			g = toGregorian(h.hy, h.hm, input)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hd
		}
	}

	hMoment.fn.iDayOfYear = function (input) {
		var dayOfYear = Math.round((hMoment(this).startOf('day') - hMoment(this).startOf('iYear')) / 864e5) + 1
		return input == null ? dayOfYear : this.add(input - dayOfYear, 'd')
	}

	hMoment.fn.iDaysInMonth = function () {
		return parseInt(hMoment(this).endOf('iMonth').format('iDD'));
	}

	hMoment.fn.iWeek = function (input) {
		var week = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).week
		return input == null ? week : this.add( (input - week) * 7, 'd')
	}

	hMoment.fn.iWeekYear = function (input) {
		var year = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year
		return input == null ? year : this.add(input - year, 'y')
	}

	hMoment.fn.add = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() + val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() + val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() + val)
		}
		 else {
			moment.fn.add.call(this, val, units)
		}
		return this
	}

	hMoment.fn.subtract = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() - val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() - val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() - val)
		} else {
			moment.fn.subtract.call(this, val, units)
		}
		return this
	}

	hMoment.fn.startOf = function (units) {
		units = normalizeUnits(units)
		if (units === 'iyear' || units === 'imonth') {
			if (units === 'iyear') {
				this.iMonth(0)
			}
			this.iDate(1)
			this.hours(0)
			this.minutes(0)
			this.seconds(0)
			this.milliseconds(0)
			return this
		} else {
			return moment.fn.startOf.call(this, units)
		}
	}

	hMoment.fn.endOf = function (units) {
		units = normalizeUnits(units)
		if (units === undefined || units === 'milisecond') {
			return this
		}
		return this.startOf(units).add(1, (units === 'isoweek' ? 'week' : units)).subtract(1, 'milliseconds')
	}

	hMoment.fn.clone = function () {
		return hMoment(this)
	}

	hMoment.fn.iYears = hMoment.fn.iYear
	hMoment.fn.iMonths = hMoment.fn.iMonth
	hMoment.fn.iDates = hMoment.fn.iDate
	hMoment.fn.iWeeks = hMoment.fn.iWeek

	/************************************
      hMoment Statics
  ************************************/

	hMoment.iDaysInMonth = function (year, month) {
		var i = getNewMoonMJDNIndex(year, month + 1),
			daysInMonth = ummalqura.ummalquraData[i] - ummalqura.ummalquraData[i - 1]
		return daysInMonth
	}

	function toHijri(gy, gm, gd) {
		var h = d2h(g2d(gy, gm + 1, gd))
		h.hm -= 1
		return h
	}

	function toGregorian(hy, hm, hd) {
		var g = d2g(h2d(hy, hm + 1, hd))
		g.gm -= 1
		return g
	}

	hMoment.iConvert = {
		toHijri: toHijri,
		toGregorian: toGregorian
	}

	return hMoment

	/************************************
      Hijri Conversion
  ************************************/

	/*
    Utility helper functions.
  */

	function div(a, b) {
		return~~ (a / b)
	}

	function mod(a, b) {
		return a - ~~(a / b) * b
	}

	/*
    Converts a date of the Hijri calendar to the Julian Day number.

    @param hy Hijri year (1356 to 1500)
    @param hm Hijri month (1 to 12)
    @param hd Hijri day (1 to 29/30)
    @return Julian Day number
  */

	function h2d(hy, hm, hd) {
		var i = getNewMoonMJDNIndex(hy, hm),
			mjdn = hd + ummalqura.ummalquraData[i - 1] - 1,
			jdn = mjdn + 2400000;
		return jdn
	}

	/*
    Converts the Julian Day number to a date in the Hijri calendar.

    @param jdn Julian Day number
    @return
      hy: Hijri year (1356 to 1500)
      hm: Hijri month (1 to 12)
      hd: Hijri day (1 to 29/30)
  */

	function d2h(jdn) {
		var mjdn = jdn - 2400000,
			i = getNewMoonMJDNIndexByJDN(mjdn),
			totalMonths = i + 16260,
			cYears = Math.floor((totalMonths - 1) / 12),
			hy = cYears + 1,
			hm = totalMonths - 12 * cYears,
			hd = mjdn - ummalqura.ummalquraData[i - 1] + 1

		return {
			hy: hy,
			hm: hm,
			hd: hd
		}
	}

	/*
    Calculates the Julian Day number from Gregorian or Julian
    calendar dates. This integer number corresponds to the noon of
    the date (i.e. 12 hours of Universal Time).
    The procedure was tested to be good since 1 March, -100100 (of both
    calendars) up to a few million years into the future.

    @param gy Calendar year (years BC numbered 0, -1, -2, ...)
    @param gm Calendar month (1 to 12)
    @param gd Calendar day of the month (1 to 28/29/30/31)
    @return Julian Day number
  */

	function g2d(gy, gm, gd) {
		var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408
		d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
		return d
	}

	/*
    Calculates Gregorian and Julian calendar dates from the Julian Day number
    (hdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
    calendars) to some millions years ahead of the present.

    @param jdn Julian Day number
    @return
      gy: Calendar year (years BC numbered 0, -1, -2, ...)
      gm: Calendar month (1 to 12)
      gd: Calendar day of the month M (1 to 28/29/30/31)
  */

	function d2g(jdn) {
		var j, i, gd, gm, gy
		j = 4 * jdn + 139361631
		j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
		i = div(mod(j, 1461), 4) * 5 + 308
		gd = div(mod(i, 153), 5) + 1
		gm = mod(div(i, 153), 12) + 1
		gy = div(j, 1461) - 100100 + div(8 - gm, 6)
		return {
			gy: gy,
			gm: gm,
			gd: gd
		}
	}

	/*
    Returns the index of the modified Julian day number of the new moon
    by the given year and month

    @param hy: Hijri year (1356 to 1500)
    @param hm: Hijri month (1 to 12)
    @return
        i: the index of the new moon in modified Julian day number.
  */
	function getNewMoonMJDNIndex(hy, hm) {
		var cYears = hy - 1,
			totalMonths = (cYears * 12) + 1 + (hm - 1),
			i = totalMonths - 16260
		return i
	}

	/*
    Returns the nearest new moon

    @param jdn Julian Day number
    @return
      i: the index of a modified Julian day number.
  */
	function getNewMoonMJDNIndexByJDN(mjdn) {
		for (var i = 0; i < ummalqura.ummalquraData.length; i=i+1) {
			if (ummalqura.ummalquraData[i] > mjdn)
				return i
		}
	}

});