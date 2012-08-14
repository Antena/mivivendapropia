var Model = Class.extend({

    init : function(family, familyTableId) {
        var self = this;

        this.family = family;
        this.table = $("#"+familyTableId);

        this.resetVars();
        this.update();
        this.drawTable();
        this.drawGraph();
    },

    resetVars : function() {
        this.kids_under = 0;
        this.hh_size_rec = 0;
        this.dependency = 1;
        this.age_head = 40;
        this.age_spouse = 30;
        this.no_spouse = true;
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
            }

            // age_spouse
            if (member.spouse) {
                this.age_spouse = member.age;
                this.no_spouse = false;
                this._spouseIndex = i;
            }

            // non_working_age
            if(member.age < 15 || member.age > 64) {
                this._non_working_age++;
            }
        }

        // dependency
        this.dependency = this._non_working_age / (this.hh_size_rec - this._non_working_age);

        this.show();
    },

    deleteMember : function(index) {
        this.family.splice(index, 1);

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
        this.family[this._headIndex].head = false;

        $(elem).removeClass("icon-white");
        $(elem).addClass("selected");
        this.family[index].head = true;
        this._headIndex = index;

        this.update();
    },

    setSpouse: function(index, elem) {
        if (index == this._headIndex) {
            return false;
        }

        if (!this.no_spouse) {
            var spouse = this.table.find("tbody i.icon-heart.selected");
            spouse.removeClass("selected");
            spouse.addClass("icon-white");
            this.family[this._spouseIndex].spouse = false;
        }

        if (this._spouseIndex != index) {
            $(elem).removeClass("icon-white");
            $(elem).addClass("selected");
            this.family[index].spouse = true;
            this._spouseIndex = index;
        }

        this.update();
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
            ageCell.append(member.age);
            row.append(ageCell);

            // education
            var educationCell = $('<td class="educationCell"></td>');
            var bookIcon = $('<i class="icon-book icon-white"></i><i class="icon-book icon-white"></i><i class="icon-book icon-white"></i>');
            educationCell.append(bookIcon);
            row.append(educationCell);

            // icons
            var iconsCell = $('<td class="iconsCell"></td>');
            var headIcon = $('<i class="icon-user"></i>');
            var spouseIcon = $('<i class="icon-heart"></i>');
            if (!member.head) { headIcon.addClass('icon-white'); } else { headIcon.addClass("selected"); }
            if (!member.spouse) { spouseIcon.addClass('icon-white'); } else { spouseIcon.addClass("selected"); }
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
            });
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
            });
            var deleteLink = $('<a class="btn btn-inverse btn-mini deleteMember" href="#"><i class="icon-trash icon-white"></i></a>');
            deleteLink.click(function() {
                var index = $(this).parent().parent().attr("data-index");
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

    drawGraph : function() {
        var n = 5, // number of samples
            m = 6, // number of series
            data = d3.range(m).map(function () {
                return d3.range(n).map(Math.random);
            });
        var w = 544,
            h = 460,
            x = d3.scale.linear().domain([0, 1]).range([h, 0]),
            y0 = d3.scale.ordinal().domain(d3.range(n)).rangeBands([0, w], .2),
            y1 = d3.scale.ordinal().domain(d3.range(m)).rangeBands([0, y0.rangeBand()]),
            z = d3.scale.category10();
        var vis = d3.select("#graph")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h + 40)
            .append("svg:g")
            .attr("transform", "translate(10,10)");
        var g = vis.selectAll("g")
            .data(data)
            .enter().append("svg:g")
            .attr("fill", function (d, i) {
                return z(i);
            })
            .attr("transform", function (d, i) {
                return "translate(" + y1(i) + ",0)";
            });
        var rect = g.selectAll("rect")
            .data(Object)
            .enter().append("svg:rect")
            .attr("transform", function (d, i) {
                return "translate(" + y0(i) + ",0)";
            })
            .attr("width", y1.rangeBand())
            .attr("height", x)
            .attr("y", function (d) {
                return h - x(d);
            });
        var text = vis.selectAll("text")
            .data(d3.range(n))
            .enter().append("svg:text")
            .attr("class", "group")
            .attr("transform", function (d, i) {
                return "translate(" + y0(i) + ",0)";
            })
            .attr("x", y0.rangeBand() / 2)
            .attr("y", h + 6)
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return String.fromCharCode(65 + i);
            });
    },

    show : function() {
        $("#variables td.kids_under").text(this.kids_under);
        $("#variables td.hh_size_rec").text(this.hh_size_rec);
        $("#variables td.no_spouse").text(this.no_spouse + 0);
        $("#variables td.age_head").text(this.age_head);
        $("#variables td.age_spouse").text(this.age_spouse);
        $("#variables td.dependency").text(this.dependency);
    }
});