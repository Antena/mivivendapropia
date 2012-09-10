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
        this.yAxisMin = 70;
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
            { label: "GBA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#BBD078" },
            { label: "Pampeana", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#ECD078" },
            { label: "Cuyo", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#542437" },
            { label: "NEA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#C02942" },
            { label: "NOA", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#D95B43" },
            { label: "Patagonia", dataLinesGroup: null, dataCirclesGroup:null, data: null, color:"#0074CC" }
        ];

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

        if (value == 0) {
            cell.find('i.icon-ban-circle').removeClass('icon-white');
        } else {
            cell.find('i.icon-ban-circle').addClass('icon-white');
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
            age:5,
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
        this.table.find('tbody tr[data-index=' + this._headIndex + '] .educationCell i').hide();
        this.family[this._headIndex].head = false;


        $(elem).removeClass("icon-white");
        $(elem).addClass("selected");
        $(elem).attr("data-original-title", "Jefe de familia");
        $(elem).tooltip("show");
        this.table.find('tbody tr[data-index=' + index + '] .educationCell i').show();
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
            this.table.find('tbody tr[data-index=' + this._spouseIndex + '] .educationCell i').hide();
            this.family[this._spouseIndex].spouse = false;
        }

        if (this._spouseIndex != index) {
            $(elem).removeClass("icon-white");
            $(elem).addClass("selected");
            $(elem).attr("data-original-title", "Cónyuge");
            $(elem).tooltip("show");
            this.family[index].spouse = true;
            this.table.find('tbody tr[data-index=' + index + '] .educationCell i').show();
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

            var banIcon = $('<i class="icon-ban-circle"></i>');
            banIcon.attr("data-index", -1);
            if (member.education > 0) {
                banIcon.addClass('icon-white');
                banIcon.hover(function() {
                    $(this).removeClass('icon-white');
                }, function() {
                    if (!$(this).hasClass('selected')) {
                        $(this).addClass('icon-white');
                    }
                })
            }
            self._addTooltip(banIcon, 'Sin educación');

            educationCell.append(banIcon);

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

            // Hide eductation level for non-head and non-spouse members
            if (!member.head && !member.spouse) {
                educationCell.find("i").hide();
            }


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

    _calculate : function(regionIndex) {
        var self = this;
        var betas = getBetas();
        var means = getMeans();
        var cons = getCons();
        var regions = getRegions();
        var valuesPerQuintile = getModels() / self.quintiles.length;
        var offsetIndex = valuesPerQuintile == 1 ? 0 : regionIndex;

        var data =[];
        for (var i=0; i<self.quintiles.length; i++) {
            var sum = 0;

            var index = i * valuesPerQuintile + offsetIndex;

            // User input vars
            sum += self.kids_under * betas.kids_under[index];
            sum += self.hh_size_rec * betas.hh_size_rec[index];
            sum += self.female_head * betas.female_head[index];
            sum += self.no_spouse * betas.no_spouse[index];
            sum += self.age_head * betas.age_head[index];
            sum += self.primary1 * betas.primary1[index];
            sum += self.secondary1 * betas.secondary1[index];
            sum += self.superior * betas.superior[index];
            sum += self.age_spouse * betas.age_spouse[index];
            sum += self.primary_s1 * betas.primary_s1[index];
            sum += self.secondary_s1 * betas.secondary_s1[index];
            sum += self.superior_s * betas.superior_s[index];
            sum += self.dependency * betas.dependency[index];
            sum += self.informal * betas.informal[index];
            sum += self.self_emplo * betas.self_emplo[index];
            sum += self.underwork * betas.underwork[index];
            sum += self.professional * betas.professional[index];
            sum += self.technical * betas.technical[index];
            sum += self.operative * betas.operative[index];
            sum += self.migrant_int * betas.migrant_int[index];
            sum += self.migrant_li * betas.migrant_li[index];
            sum += self.migrant_pcia * betas.kids_under[index];

            // Fixed mean vars
            sum += means.date_1[index] * betas.date_1[index];
            sum += means.date_2[index] * betas.date_2[index];
            sum += means.date_3[index] * betas.date_3[index];
            sum += means.date_4[index] * betas.date_4[index];
            sum += means.date_5[index] * betas.date_5[index];
            sum += means.date_6[index] * betas.date_6[index];
            sum += means.date_7[index] * betas.date_7[index];
            sum += means.date_8[index] * betas.date_8[index];
            sum += means.date_9[index] * betas.date_9[index];
            sum += means.date_10[index] * betas.date_10[index];
            sum += means.date_11[index] * betas.date_11[index];
            sum += means.date_12[index] * betas.date_12[index];
            sum += means.date_13[index] * betas.date_13[index];
            sum += means.date_14[index] * betas.date_14[index];
            sum += means.date_15[index] * betas.date_15[index];
            sum += means.date_16[index] * betas.date_16[index];
            sum += means.date_17[index] * betas.date_17[index];
            sum += means.date_18[index] * betas.date_18[index];
            sum += means.date_19[index] * betas.date_19[index];
            sum += means.date_20[index] * betas.date_20[index];
            sum += means.date_21[index] * betas.date_21[index];
            sum += means.date_22[index] * betas.date_22[index];
            sum += means.date_23[index] * betas.date_23[index];
            sum += means.date_24[index] * betas.date_24[index];
            sum += means.date_25[index] * betas.date_25[index];
            sum += means.date_26[index] * betas.date_26[index];
            sum += means.date_27[index] * betas.date_27[index];
            sum += means.date_28[index] * betas.date_28[index];
            sum += means.date_29[index] * betas.date_29[index];
            sum += means.date_30[index] * betas.date_30[index];

            // Constants
            if (valuesPerQuintile == 1) {
                sum += regions[self.lines[regionIndex].label][index];
//                sum += self.lines[regionIndex].betas[index];
            }
            sum += cons[index];

            var norm = new NormalDistribution(0, 1);
            var value = norm.cumulativeDensity(sum);
            data.push({
                'value' : value * 100,
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