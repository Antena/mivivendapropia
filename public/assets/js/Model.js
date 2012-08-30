var Model = Class.extend({

    init : function(family, familyTableId) {
        var self = this;

        this.family = family;
        this.table = $("#"+familyTableId);

        this.education_max = 3;
        this.levels = ['Primario completo', 'Secundario completo', 'Educación superior completa'];

        // Graph
        this.svg = null;
        this.y = null;
        this.x = null;
        this.yAxisGroup = null;
        this.xAxisGroup = null;
        this.graphWidth = 544;
        this.graphHeight = 455;
        this.graphMargin = 40;
        this.maxDataPointsForDots = 50;
        this.transitionDuration = 1000;
        this.pointRadius = 4;
        this.yAxisMin = 60;
        this.yAxisMax = 100;
        this.randomMin = 40;
        this.randomMax = 85;

        this.quintiles = [
            { label: "Quintil 1" },
            { label: "Quintil 2" },
            { label: "Quintil 3" },
            { label: "Quintil 4" },
            { label: "Quintil 5" }
        ];

        this.lines = [
            { label: "GBA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#BBD078", betas:[-0.5446819, -0.3565835, -0.2933651, -0.1046974, -0.0267171] },
            { label: "Pampeana", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#ECD078", betas:[-0.2498533, -0.0661845, 0.0385695, 0.1582287, 0.2019052] },
            { label: "NOA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#D95B43", betas:[-0.5828933, -0.4135258, -0.2966691, -0.1914041, -0.0710128] },
            { label: "NEA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#C02942", betas:[-0.4774271, -0.2929658, -0.2015828, -0.013111, -0.0397004] },
            { label: "Cuyo", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#542437", betas:[-0.1263849, 0.0500968, 0.0791209, 0.2053978, 0.2741182] }
        ];

        // Betas
        this.betas = {
            'kids_under' :	    [-0.0552942, -0.0724264, -0.0676516, -0.1238898, -0.1048889],
            'hh_size_rec' :	    [-0.0023377, 0.0323916, 0.0401051, 0.0701396, 0.0818841],
            'female_head' :	    [0.0579161, 0.1363147, 0.0968277, 0.1411157, 0.113301],
            'no_spouse'	:       [0.1785973, 0.2112762, 0.18479, 0.0902038, 0.1820364],
            'age_head' :	    [0.0151484, 0.0117505, 0.0112098, 0.0091149, 0.0088118],
            'primary1' :	    [0.3691645, 0.3546022, 0.3352214, 0.2212738, 0.1502868],
            'secondary1' :	    [0.7411031, 0.7009255, 0.5833902, 0.4162107, 0.3224738],
            'superior' : 	    [0.9295534, 0.7964591, 0.6478768, 0.4710252, 0.3678398],
            'age_spouse' : 	    [0.0148958, 0.0162987, 0.0131473, 0.00978, 0.0070064],
            'primary_s1' :	    [0.2339917, 0.2231546, 0.1527139, 0.0368146, 0.1216812],
            'secondary_s1' :	[0.4687513, 0.428688, 0.3537227, 0.2012458, 0.2001659],
            'superior_s' :	    [0.6186099, 0.5405665, 0.4351879, 0.2628354, 0.2698848],
            'dependency' :	    [-0.0623365, -0.0247185, -0.0140593, -0.0104448, -0.0227905],
            'informal' :	    [-0.1582498, -0.2107423, -0.211962, -0.1647949, -0.1285843],
            'self_emplo' :	    [-0.114136, -0.0870153, -0.0864016, -0.0115352, 0.0729184],
            'underwork' :	    [-0.1067573, -0.1233403, -0.1025092, -0.0541063, -0.0411415],
            'professional' :	[0.1668647, 0.2194196, 0.1622139, 0.1078264, 0.0983834],
            'technical' :	    [0.2593433, 0.1185242, 0.0151724, 0.0171033, -0.096317],
            'operative' :	    [0.1228025, 0.0764848, -0.0022399, -0.0265577, -0.1105195],
            'migrant_int' :	    [0.1509235, 0.2430211, 0.3265385, 0.3046819, 0.1584822],
            'migrant_li' :	    [-0.155683, -0.3397514, -0.5032866, -0.4913091, -0.2046765],
            'migrant_pcia' :	[0.0140841, 0.0257115, 0.0057317, 0.0100007, 0.0397625],
            'date_1' :	        [-0.1530169, -0.1198072, -0.1038722, 0.0122366, 0.152288],
            'date_2' :	        [-0.11844, -0.1285798, -0.083965, -0.1065781, 0.213533],
            'date_3' :	        [-0.1664472, -0.1627317, -0.1672925, -0.0688032, 0.121293],
            'date_4' :	        [-0.1206949, -0.0987936, -0.1612381, -0.0675086, 0.1067232],
            'date_5' :	        [-0.0807532, -0.1015299, -0.050563, -0.1035009, 0.1078071],
            'date_6' :	        [-0.1060111, -0.086336, -0.0463026, -0.0750814, 0.2230301],
            'date_7' :	        [-0.1116732, -0.1207421, -0.0601955, -0.059916, 0.1762721],
            'date_8' :	        [-0.1099016, -0.1011094, -0.0611252, -0.1104454, 0.1151243],
            'date_9' :	        [-0.073683, -0.1381076, -0.0558143, -0.0056311, 0.0545869],
            'date_10' :	        [-0.0729863, -0.1242891, -0.0658848, -0.0921924, 0.1395846],
            'date_11' :	        [-0.0536967, -0.1152502, -0.0800652, -0.0428599, 0.1007641],
            'date_12' :	        [-0.1323931, -0.0515223, -0.1268832, -0.0671901, 0.1382999],
            'date_13' :	        [-0.1163343, -0.050348, -0.0295294, -0.0391195, 0.1392248],
            'date_14' :	        [-0.0923674, -0.0890898, -0.0048444, -0.0329602, 0.1314991],
            'date_15' :	        [-0.0546819, -0.0253567, -0.0585662, -0.033073, 0.1331986],
            'date_16' :	        [-0.03069, -0.0029039, -0.0160711, -0.0007312, 0.1395641],
            'date_17' :	        [-0.0640081, -0.0320034, -0.0594442, -0.0525895, 0.1046726],
            'date_18' :	        [-0.019834, -0.0334281, -0.0430564, -0.0100774, 0.0671426],
            'date_19' :	        [0.027353, -0.011602, -0.0416764, -0.0101565, 0.1133455],
            'date_20' :	        [0.0135513, 0.0412226, -0.0300768, -0.0246226, 0.1021769],
            'date_21' :	        [0.0423607, 0.0087483, 0.0146469, -0.0709856, 0.1389234],
            'date_22' :	        [0.0111858, -0.0175754, -0.0308232, -0.0303891, 0.0634853],
            'date_23' :	        [-0.021264, 0.0060682, -0.0045944, -0.0387338, 0.0814024],
            'date_24' :	        [0.016978, -0.0013971, -0.0137943, -0.0236724, 0.1566265],
            'date_25' :	        [0.0394738,	0.0130176, -0.009074, -0.0590055, 0.0420641],
            'date_26' :         [0.0165548, -0.0351283, -0.0154274, -0.0877058, 0.0482264],
            'date_27' :         [0.0332834, -0.0247828, -0.0983688, -0.0368986, 0.054491],
            'date_28' :	        [-0.0393113, -0.0370035, -0.0236361, 0.0221783, 0.0725553],
            'date_29' :	        [-0.0117356, -0.0343339, -0.0920253, 0.0127868, 0.0310364],
            'date_30' :	        [0.0411693, 0.0127501, -0.093952, -0.0588343, 0.0724097]
        };

        this.means = {
            'date_1' :          [0.0185977, 0.0185877, 0.0186075, 0.0186034, 0.0186275],
            'date_2' :          [0.0256048, 0.0255691, 0.0256073, 0.0256016, 0.0256348],
            'date_3' :          [0.0248591, 0.0248348, 0.0248612, 0.0248558, 0.024888],
            'date_4' :          [0.0261969, 0.0261938, 0.0261668, 0.026194, 0.0262169],
            'date_5' :          [0.0274141, 0.0274542, 0.0273956, 0.0274006, 0.027458],
            'date_6' :          [0.0272277, 0.0272021, 0.027231, 0.0272251, 0.0272603],
            'date_7' :          [0.0273154, 0.0273007, 0.0273298, 0.0274883, 0.0271835],
            'date_8' :          [0.0271509, 0.0272021, 0.0273517, 0.026896, 0.0271835],
            'date_9' :          [0.028083, 0.0280679, 0.0280978, 0.0280916, 0.028128],
            'date_10' :         [0.0280501, 0.0280241, 0.0280539, 0.0280477, 0.0280841],
            'date_11' :         [0.0273812, 0.0274213, 0.0273298, 0.0275322, 0.0272713],
            'date_12' :         [0.0284997, 0.0284844, 0.0285147, 0.0285084, 0.0285344],
            'date_13' :         [0.0355396, 0.0355205, 0.0355364, 0.0355396, 0.0355856],
            'date_14' :         [0.0377876, 0.0376138, 0.0377307, 0.0377224, 0.0377713],
            'date_15' :         [0.0373928, 0.0373837, 0.0374125, 0.0374043, 0.0374418],
            'date_16' :         [0.0361866, 0.0361672, 0.0364799, 0.0359235, 0.0362446],
            'date_17' :         [0.0353751, 0.0353233, 0.0353608, 0.0353641, 0.0353989],
            'date_18' :         [0.0371845, 0.0371426, 0.0371821, 0.0372178, 0.0371892],
            'date_19' :         [0.037327, 0.0374056, 0.0371382, 0.0373056, 0.0373429],
            'date_20' :         [0.0374696, 0.0374494, 0.0374893, 0.0378211, 0.0371782],
            'date_21' :         [0.0372832, 0.0372741, 0.0373028, 0.0372836, 0.0373429],
            'date_22' :         [0.0364498, 0.0364521, 0.0364141, 0.03645, 0.0364972],
            'date_23' :         [0.03668, 0.0369124, 0.0364141, 0.0366365, 0.0366949],
            'date_24' :         [0.0371625, 0.0371755, 0.0371602, 0.0372069, 0.0371562],
            'date_25' :         [0.0366143, 0.0365946, 0.0366335, 0.0366803, 0.0366071],
            'date_26' :         [0.0358467, 0.0358274, 0.0358655, 0.0359344, 0.0358273],
            'date_27' :         [0.0365046, 0.036474, 0.0365238, 0.0366474, 0.0364094],
            'date_28' :         [0.0365156, 0.0365617, 0.036458, 0.0365158, 0.0365631],
            'date_29' :         [0.0353313, 0.0353013, 0.0355912, 0.0350789, 0.0353769],
            'date_30' :         [0.034783, 0.0350712, 0.0346367, 0.0347059, 0.0347729]
        };

        this.cons =             [-0.7150742, -0.6934208, -0.2994806, 0.0825679, 0.1987445];

        this.resetVars();
        this.update();
        this.drawTable();
        this.drawGraph();
    },

    getLines : function() {
        return this.lines;
    },

    _getQuintileLabels : function() {
        var labels = [];
        for (var i=0; i<this.quintiles.length; i++) {
            labels.push(this.quintiles[i].label);
        }
        return labels;
    },

    resetVars : function() {
        this.kids_under = 0;
        this.hh_size_rec = 0;
        this.female_head = 0;

        this.age_head = 40;
        this.no_spouse = 1;
        this.primary1=0;
        this.secondary1=0;
        this.superior=0;

        this.age_spouse = 30;
        this.primary_s1=0;
        this.secondary_s1=0;
        this.superior_s=0;

        this.dependency = 1;

        this.informal = 0;

        this.self_emplo = 0;

        this.underwork = 0;

        this.professional = 0;
        this.technical = 0;
        this.operative = 0;

        this.migrant_int = 0;
        this.migrant_li = 0;
        this.migrant_pcia = 0;

        this._non_working_age = 0;
        this._headIndex = null;
        this._spouseIndex = null;
    },

    update : function() {
        this.resetVars();
        for (var i=0; i<this.family.length; i++) {
            var member = this.family[i];

            // hh_size_rec
            this.hh_size_rec++;

            // kids_under
            if (member.age < 5) {
                this.kids_under++;
            }

            // age_head
            if (member.head) {
                this.age_head = member.age;
                this._headIndex = i;
                this.primary1 = member.education == 1;
                this.secondary1 = member.education == 2;
                this.superior = member.education == 3;
            }

            // age_spouse
            if (member.spouse) {
                this.age_spouse = member.age;
                this._spouseIndex = i;
                this.no_spouse = 0;
                this.primary_s1 = member.education == 1;
                this.secondary_s1 = member.education == 2;
                this.superior_s = member.education == 3;
            }

            // non_working_age
            if(member.age < 15 || member.age > 64) {
                this._non_working_age++;
            }
        }

        // female_head
        this.female_head = parseInt($("#head .female_head .active").attr("data-value"));

        // dependency
        this.dependency = this._non_working_age / (this.hh_size_rec - this._non_working_age);

        // informal
        this.informal = parseInt($("#head .informal .active").attr("data-value"));

        // self_emplo
        this.self_emplo = parseInt($("#head .self_emplo .active").attr("data-value"));

        // underwork
        this.underwork = parseInt($("#head .underwork .active").attr("data-value"));

        // job_type
        this.professional = $("#head .job_type option.professional").attr("selected") == undefined ? 0 : 1;
        this.technical = $("#head .job_type option.technical").attr("selected") == undefined ? 0 : 1;
        this.operative = $("#head .job_type option.operative").attr("selected") == undefined ? 0 : 1;

        // migrant
        this.migrant_int = $("#head .migrant option.migrant_int").attr("selected") == undefined ? 0 : 1;
        this.migrant_li = $("#head .migrant option.migrant_li").attr("selected") == undefined ? 0 : 1;
        this.migrant_pcia = $("#head .migrant option.migrant_pcia").attr("selected") == undefined ? 0 : 1;

        this.show();
        this.updateGraph();
    },

    setEducation: function(index, value) {

        this.family[index].education = value;
        var cell = this.table.find('tr[data-index='+index+'] td.educationCell');
        cell.attr("data-education", value);
        var books = cell.find("i");
        for (var i=0; i<books.length; i++) {
            if ($(books[i]).attr("data-index") < value) {
                $(books[i]).addClass("selected").removeClass("icon-white");
            } else {
                $(books[i]).removeClass("selected").addClass("icon-white");
            }
        }
        this.update();
    },

    deleteMember : function(index) {
        if (this.family.length == 2 && this._headIndex == index || this.family.length == 1 && this._spouseIndex == null) {
            return false;
        }

        this.family.splice(index, 1);
        if (this._headIndex == index && this.family.length > 0) {
            var newHeadIndex = this._spouseIndex == 0 ? 1 : 0;
            this._headIndex = newHeadIndex;
            this.setHead(newHeadIndex);
        }

        this.update();
        this.drawTable();
    },

    addMember : function() {
        var self = this;
        this.family.push({
            age:30,
            education:2,
            head:self._headIndex == null,
            spouse:false
        });
        $("#addMember").tooltip("hide");
        this.update();
        this.drawTable();
    },

    setHead: function(index, elem) {
        if (index == this._spouseIndex) {
            return false;
        }

        var head = this.table.find("tbody i.icon-user.selected");
        head.removeClass("selected");
        head.addClass("icon-white");
        head.attr("data-original-title", "Marcar como jefe de familia");
        this.family[this._headIndex].head = false;


        $(elem).removeClass("icon-white");
        $(elem).addClass("selected");
        $(elem).attr("data-original-title", "Jefe de familia");
        $(elem).tooltip("show");
        this.family[index].head = true;
        this._headIndex = index;
    },

    setSpouse: function(index, elem) {
        if (index == this._headIndex) {
            return false;
        }

        if (this._spouseIndex != null) {
            var spouse = this.table.find("tbody i.icon-heart.selected");
            spouse.removeClass("selected");
            spouse.addClass("icon-white");
            spouse.attr("data-original-title", "Marcar como cónyuge");
            this.family[this._spouseIndex].spouse = false;
        }

        if (this._spouseIndex != index) {
            $(elem).removeClass("icon-white");
            $(elem).addClass("selected");
            $(elem).attr("data-original-title", "Cónyuge");
            $(elem).tooltip("show");
            this.family[index].spouse = true;
            this._spouseIndex = index;
        }
    },

    drawTable : function() {
        var self = this;
        this.table.find('tbody').empty();
        for (var i=0; i<this.family.length; i++) {
            var member = this.family[i];
            var row = $("<tr></tr>").attr('data-index', i);

            // index, head and spouce cell
            var indexCell = $('<td class="indexCell"></td>');
            indexCell.append($('<span class="index">' + (i+1) + '</span>'));
            row.append(indexCell);

            // age
            var ageCell = $('<td class="ageCell"></td>');
            var ageInput = $('<input type="text" value="'+member.age+'">');
            ageInput.change(function() {
                var index = $(this).parent().parent().attr("data-index");
                var age = parseInt($(this).attr("value"));
                $(this).attr("value", age);
                self.family[index].age = age;
                self.update();
            });
            ageCell.append(ageInput);
            row.append(ageCell);

            // education
            var educationCell = $('<td class="educationCell" data-education="'+member.education+'"></td>');
            for (var j=0; j<this.education_max; j++) {
                var bookIcon = $('<i class="icon-book"></i>');
                bookIcon.attr("data-index", j);
                self._addTooltip(bookIcon, self.levels[j]);

                if ( j >= member.education) {
                    bookIcon.addClass('icon-white');
                } else {
                    bookIcon.addClass('selected');
                }

                bookIcon.hover(function() {
                    var hoverIndex = $(this).attr("data-index");
                    var cell = $(this).parent();
                    cell.find("i.icon-book").each(function(index, elem) {
                        if ($(elem).attr("data-index") <= hoverIndex) {
                            $(elem).removeClass('icon-white').addClass("hover");
                        } else {
                            $(elem).addClass('icon-white').removeClass("hover");
                        }
                    });
                }, function() {
                    var cell = $(this).parent();
                    if ($(this).attr("data-index") == 0) {
                        $(this).removeClass('hover').addClass('icon-white');
                    }
                });

                bookIcon.click(function(event) {
                    var level = parseInt($(this).attr("data-index")) + 1;
                    var memberIndex = $(this).parent().parent().attr("data-index");

                    self.setEducation(memberIndex, level);
                    event.stopPropagation();
                });
                educationCell.append(bookIcon);
            }
            educationCell.click(function(event) {
                var level = 0;
                var memberIndex = $(this).parent().attr("data-index");

                self.setEducation(memberIndex, level);
            });

            educationCell.hover(function(){}, function() {
                var cell = $(this);
                $(this).find("i.icon-book").each(function(index, elem) {
                    var education = cell.attr("data-education");
                    if ($(elem).attr("data-index") < education) {
                        $(elem).removeClass('icon-white').addClass("selected");
                    } else {
                        $(elem).addClass('icon-white');
                    }
                });
            });
            row.append(educationCell);

            // icons
            var iconsCell = $('<td class="iconsCell"></td>');

            // head icon
            var headIcon = $('<i class="icon-user"></i>');
            if (!member.head) {
                headIcon.addClass('icon-white');
                self._addTooltip(headIcon, "Marcar como jefe de familia");
            } else {
                headIcon.addClass("selected");
                self._addTooltip(headIcon, "Jefe de familia");
            }

            headIcon.hover(function() {
                    $(this).removeClass("icon-white");
                }, function() {
                    if (!$(this).hasClass("selected")) {
                        $(this).addClass("icon-white");
                    }
                }
            );
            headIcon.click(function() {
                var index = $(this).parent().parent().attr("data-index");
                self.setHead(index, this);
                self.update();
            });

            // spouse icon
            var spouseIcon = $('<i class="icon-heart"></i>');
            if (!member.spouse) {
                spouseIcon.addClass('icon-white');
                self._addTooltip(spouseIcon, "Marcar como cónyuge");
            } else {
                spouseIcon.addClass("selected");
                self._addTooltip(spouseIcon, "Cónyugue")
            }
            spouseIcon.hover(function() {
                    $(this).removeClass("icon-white");
                }, function() {
                    if (!$(this).hasClass("selected")) {
                        $(this).addClass("icon-white");
                    }
                }
            );
            spouseIcon.click(function() {
                var index = $(this).parent().parent().attr("data-index");
                self.setSpouse(index, this);
                self.update();
            });

            // delete link
            var deleteLink = $('<a class="deleteMember" href="#"></a>');
            var deleteIcon = $('<i class="icon-minus-sign"></i>');
            self._addTooltip(deleteIcon, "Eliminar miembro");
            deleteLink.append(deleteIcon);
            deleteLink.append(deleteIcon);

            deleteLink.click(function() {
                var index = $(this).parent().parent().attr("data-index");
                var icon = $(this).find("i");
                $(icon).tooltip("hide");
                self.deleteMember(index);
            });

            row.hover(
                function() { $(this).find(".deleteMember").show() },
                function() { $(this).find(".deleteMember").hide() }
            )

            iconsCell.append(headIcon);
            iconsCell.append(spouseIcon);
            iconsCell.append(deleteLink);
            row.append(iconsCell);

            this.table.append(row);
        }
    },

    _addTooltip : function(elem, text) {
        elem.attr("rel", "tooltip");
        elem.attr("title", text);
        elem.tooltip({
                placement: 'bottom'}
        );
    },

    drawGraph : function() {
        var self = this;

        self._draw();
    },

    _getMinValue : function(data) {
        var min = 100;

        for (var i=0; i<data.length; i++) {
            min = data[i].value < min ? data[i].value : min;
        }

        return min;
    },

    _draw : function() {
        var self = this;

        var dataMin = 100;
        for (var i=0; i<this.lines.length; i++) {
            var data = self._calculate(i);
            this.lines[i].data = data;
            dataMin = Math.min(dataMin, Math.floor(self._getMinValue(data)/10) * 10);
        }

        var max = self.yAxisMax;
        var min = Math.min(dataMin, self.yAxisMin);

        self.x = d3.scale.ordinal().rangePoints([0, self.graphWidth - self.graphMargin * 2], 0.5).domain(self._getQuintileLabels());
        self.y = d3.scale.linear().range([self.graphHeight - self.graphMargin * 2, 0]).domain([min, max]);

        var xAxis = d3.svg.axis().scale(self.x).tickSize(self.graphHeight - self.graphMargin * 2).tickPadding(10).ticks(7);
        var yAxis = d3.svg.axis().scale(self.y).orient('left').tickSize(-self.graphWidth + self.graphMargin * 2).tickPadding(10);

        var t = null;
        self.svg = d3.select('#graph').select('svg').select('g');
        if (self.svg.empty()) {
            self.svg = d3.select('#graph')
                .append('svg:svg')
                .attr('width', self.graphWidth)
                .attr('height', self.graphHeight)
                .attr('class', 'viz')
                .append('svg:g')
                .attr('transform', 'translate(' + self.graphMargin + ',' + self.graphMargin + ')');
        }

        t = self.svg.transition().duration(self.transitionDuration);

        // y ticks and labels
        if (!self.yAxisGroup) {
            self.yAxisGroup = self.svg.append('svg:g')
                .attr('class', 'yTick')
                .call(yAxis);
        }
        else {
            t.select('.yTick').call(yAxis);
        }

        // x ticks and labels
        if (!self.xAxisGroup) {
            self.xAxisGroup = self.svg.append('svg:g')
                .attr('class', 'xTick')
                .call(xAxis);
        }
        else {
            t.select('.xTick').call(xAxis);
        }


        for (var i=0; i<this.lines.length; i++) {
            self._plotData(this.lines[i]);
        }
    },

    _calculate : function(quintile) {
        var self = this;
        var data =[];
        for (var i=0; i<self.quintiles.length; i++) {
            var sum = 0;

            // User input vars
            sum += self.kids_under * self.betas.kids_under[i];
            sum += self.hh_size_rec * self.betas.hh_size_rec[i];
            sum += self.female_head * self.betas.female_head[i];
            sum += self.no_spouse * self.betas.no_spouse[i];
            sum += self.age_head * self.betas.age_head[i];
            sum += self.primary1 * self.betas.primary1[i];
            sum += self.secondary1 * self.betas.secondary1[i];
            sum += self.superior * self.betas.superior[i];
            sum += self.age_spouse * self.betas.age_spouse[i];
            sum += self.primary_s1 * self.betas.primary_s1[i];
            sum += self.secondary_s1 * self.betas.secondary_s1[i];
            sum += self.superior_s * self.betas.superior_s[i];
            sum += self.dependency * self.betas.dependency[i];
            sum += self.informal * self.betas.informal[i];
            sum += self.self_emplo * self.betas.self_emplo[i];
            sum += self.underwork * self.betas.underwork[i];
            sum += self.professional * self.betas.professional[i];
            sum += self.technical * self.betas.technical[i];
            sum += self.operative * self.betas.operative[i];
            sum += self.migrant_int * self.betas.migrant_int[i];
            sum += self.migrant_li * self.betas.migrant_li[i];
            sum += self.migrant_pcia * self.betas.kids_under[i];

            // Fixed mean vars
            sum += self.means.date_1[i] * self.betas.date_1[i];
            sum += self.means.date_2[i] * self.betas.date_2[i];
            sum += self.means.date_3[i] * self.betas.date_3[i];
            sum += self.means.date_4[i] * self.betas.date_4[i];
            sum += self.means.date_5[i] * self.betas.date_5[i];
            sum += self.means.date_6[i] * self.betas.date_6[i];
            sum += self.means.date_7[i] * self.betas.date_7[i];
            sum += self.means.date_8[i] * self.betas.date_8[i];
            sum += self.means.date_9[i] * self.betas.date_9[i];
            sum += self.means.date_10[i] * self.betas.date_10[i];
            sum += self.means.date_11[i] * self.betas.date_11[i];
            sum += self.means.date_12[i] * self.betas.date_12[i];
            sum += self.means.date_13[i] * self.betas.date_13[i];
            sum += self.means.date_14[i] * self.betas.date_14[i];
            sum += self.means.date_15[i] * self.betas.date_15[i];
            sum += self.means.date_16[i] * self.betas.date_16[i];
            sum += self.means.date_17[i] * self.betas.date_17[i];
            sum += self.means.date_18[i] * self.betas.date_18[i];
            sum += self.means.date_19[i] * self.betas.date_19[i];
            sum += self.means.date_20[i] * self.betas.date_20[i];
            sum += self.means.date_21[i] * self.betas.date_21[i];
            sum += self.means.date_22[i] * self.betas.date_22[i];
            sum += self.means.date_23[i] * self.betas.date_23[i];
            sum += self.means.date_24[i] * self.betas.date_24[i];
            sum += self.means.date_25[i] * self.betas.date_25[i];
            sum += self.means.date_26[i] * self.betas.date_26[i];
            sum += self.means.date_27[i] * self.betas.date_27[i];
            sum += self.means.date_28[i] * self.betas.date_28[i];
            sum += self.means.date_29[i] * self.betas.date_29[i];
            sum += self.means.date_30[i] * self.betas.date_30[i];

            // Constants
            sum += self.lines[quintile].betas[i];
            sum += self.cons[i];

            var norm = new NormalDistribution(0, 1);
            var value = norm.cumulativeDensity(sum);
            data.push({
                'value' : value * 100,
                'quintile' : self.quintiles[i].label
            });
        }

        return data;
    },

    _calculateDummy: function(quintile) {
        var self = this;
        var fullData = [
            [0.696894216, 0.839166815, 0.898347722, 0.934274396, 0.956534191],
            [0.683417662, 0.824873081, 0.897759671, 0.922442901, 0.952293946],
            [0.719967006, 0.854208897, 0.913712329, 0.945199623, 0.955324115],
            [0.824792775, 0.918901363, 0.949981987, 0.965506051, 0.977924041],
            [0.791121081, 0.899980128, 0.945657035, 0.961747072, 0.973836436],
            [0.855466502, 0.91111014, 0.941273947, 0.94663874, 0.958941044]
        ];

        var data =[];
        for (var i=0; i<self.quintiles.length; i++) {
            data.push({
                'value' : fullData[quintile][i] * 100,
                'quintile' : self.quintiles[i].label
            });
        }

        return data;
    },

    _plotData : function(region) {
        var self = this;

        // Draw the lines
        if (!region.dataLinesGroup) {
            region.dataLinesGroup = self.svg.append('svg:g');
        }

        var dataLines = region.dataLinesGroup.selectAll('.data-line')
            .data([region.data]);

        var line = d3.svg.line()
            .x(function(d,i) {
                return self.x(d.quintile);
            })
            .y(function(d) {
                return self.y(d.value);
            })
            .interpolate("cardinal");

        dataLines.enter().append('path')
            .attr('class', 'data-line')
            .style('opacity', 0.3)
            .style('stroke', region.color)
            .attr("d", line(region.data));

        dataLines.transition()
            .attr("d", line)
            .duration(self.transitionDuration)
            .style('opacity', 1)
            .attr("transform", function(d) { return "translate(" + self.x(d.quintile) + "," + self.y(d.value) + ")"; });

        dataLines.exit()
            .transition()
            .attr("d", line)
            .duration(self.transitionDuration)
            .attr("transform", function(d) { return "translate(" + self.x(d.quintile) + "," + self.y(0) + ")"; })
            .style('opacity', 1e-6)
            .remove();

        // Draw the points
        if (!region.dataCirclesGroup) {
            region.dataCirclesGroup = self.svg.append('svg:g');
        }

        var circles = region.dataCirclesGroup.selectAll('.data-point')
            .data(region.data);

        circles
            .enter()
            .append('svg:circle')
            .attr('class', 'data-point')
            .style('opacity', 1e-6)
            .style('stroke', region.color)
            .attr('cx', function(d) { return self.x(d.quintile) })
            .attr('cy', function() { return self.y(0) })
            .attr('r', function() { return (region.data.length <= self.maxDataPointsForDots) ? self.pointRadius : 0 })
            .transition()
            .duration(self.transitionDuration)
            .style('opacity', 1)
            .attr('cx', function(d) { return self.x(d.quintile) })
            .attr('cy', function(d) { return self.y(d.value) });

        circles
            .transition()
            .duration(self.transitionDuration)
            .attr('cx', function(d) { return self.x(d.quintile) })
            .attr('cy', function(d) { return self.y(d.value) })
            .attr('r', function() { return (region.data.length <= self.maxDataPointsForDots) ? self.pointRadius : 0 })
            .style('opacity', 1);

        circles
            .exit()
            .transition()
            .duration(self.transitionDuration)
            .attr('cy', function() { return self.y(0) })
            .style("opacity", 1e-6)
            .remove();
    },

    _generateData : function() {
        var self = this;
        var data = [];

        for (var i=0; i<self.quintiles.length; i++) {
            data.push({
                'value' : Math.floor(Math.random()*(this.randomMax - this.randomMin)) + this.randomMin,
                'quintile' : self.quintiles[i].label
            });
        }

        return data;
    },

    updateGraph: function() {
        this._draw();
    },

    show : function() {
        $("#variables td.kids_under").text(this.kids_under);
        $("#variables td.hh_size_rec").text(this.hh_size_rec);
        $("#variables td.female_head").text(this.female_head);
        $("#variables td.no_spouse").text(this.no_spouse);
        $("#variables td.age_head").text(this.age_head);
        $("#variables td.primary1").text(this.primary1 + 0);
        $("#variables td.secondary1").text(this.secondary1 + 0);
        $("#variables td.superior").text(this.superior + 0);
        $("#variables td.age_spouse").text(this.age_spouse);
        $("#variables td.primary_s1").text(this.primary_s1 + 0);
        $("#variables td.secondary_s1").text(this.secondary_s1 + 0);
        $("#variables td.superior_s").text(this.superior_s + 0);
        $("#variables td.dependency").text(this.dependency);
        $("#variables td.informal").text(this.informal);
        $("#variables td.self_emplo").text(this.self_emplo);
        $("#variables td.underwork").text(this.underwork);
        $("#variables td.professional").text(this.professional);
        $("#variables td.technical").text(this.technical);
        $("#variables td.operative").text(this.operative);
        $("#variables td.migrant_int").text(this.migrant_int);
        $("#variables td.migrant_li").text(this.migrant_li);
        $("#variables td.migrant_pcia").text(this.migrant_pcia);
    }
});