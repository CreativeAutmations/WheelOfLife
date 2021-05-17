var Application = {
    "State": {
        "CurrentStage": 0
    },
    "constants":{
        "FNF": "Friends & Family",
        "REL": "Relationships",
        "WEL": "Wealth",
        "PER": "Personal Growth",
        "HEL": "Health",
        "FNR": "Fun & Recreation",
        "POS": "Possesion",
        "CAR": "Career"
    },
    "data": {
        "Friends & Family": 1,
        "Relationships": 1,
        "Wealth": 1,
        "Personal Growth": 1,
        "Health": 1,
        "Fun & Recreation": 1,
        "Possesion": 1,
        "Career": 1
    },
    "labels": ["Friends & Family", "Relationships", "Wealth", "Personal Growth", "Health", "Fun & Recreation", "Possesion", "Career"]
}

var action = {
    getEmail(){
        $('#sendReportInt').show();
        $('#send_icon').show();
    },
    showIncrement(i) {
        var ids1 = ["#span1", "#span2", "#span3", "#span4", "#span5", "#span6", "#span7", "#span8"];
        var ids2 = ["#input1", "#input2", "#input3", "#input4", "#input5", "#input6", "#input7", "#input8"];
        $(ids2[i]).on('change', function () {
            var val = $(this).val();
            Application.data[i-1] = val;
            var min = $(this).attr('min');
            var max = $(this).attr('max');
            var portion = (val - min) / (max - min);
            $(ids1[i]).text(val);
            $(ids1[i]).css('left', portion * $('.h-rs-line').width());
        });
    },
    showPieChart() {
        data = [];
        showDataEntry();
        for (var i = 0; i < Application.labels.length; i++) {
            data.push(Application.data[Application.labels[i]]);
        }
        renderChart(data, Application.labels);
    },
    sendEmail() {
        var storage =
        {
            "Friends & Family": Application.data["Friends & Family"],
            "Relationships": Application.data["Relationships"],
            "Wealth": Application.data["Wealth"],
            "Personal Growth": Application.data["Personal Growth"],
            "Health": Application.data["Health"],
            "Fun & Recreation": Application.data["Fun & Recreation"],
            "Possesion": Application.data["Possesion"],
            "Career": Application.data["Career"]
        };
        var email = ReportPane.getEmail();
        var result = Mustache.render(template, storage);
        if (email != false) {
            emailjs.init(siteConfiguration.email.userId);
            var templateParams = {
                reply_to: email,
                reportData: result
            };
            emailjs.send(siteConfiguration.email.service, siteConfiguration.email.templateId, templateParams)
                .then(
                    ReportPane.showThankYouPage(),
                    function (error) {
                        alert("Sorry,We can't send your email currently, you can save report by downloading the webpage");
                        console.log(error);
                    }
                );
        }
    }
}

function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,

            datasets: [{
                label: 'This week',
                data: data,
                backgroundColor: ['rgba(255, 0, 85, 0.9)',
                    'rgba(255, 102, 204, 0.9)',
                    'rgba(136, 136, 68, 0.9)',
                    'rgba(204, 0, 0, 0.9)',
                    'rgba(0, 0, 204, 0.9)',
                    'rgba(0, 179, 107, 0.9)',
                    'rgba(196, 255, 77, 0.9)',
                    'rgba(230, 230, 0, 0.9)']
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
                    generateLabels: function (chart) {
                        var data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = data.datasets[0];
                                var arc = meta.data[i];
                                var fill = ds.backgroundColor[i];
                                return {
                                    // And finally : 
                                    text: label + ": " + ds.data[i],
                                    fillStyle: fill,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }


                }
            },

            title: {
                display: false,
                fontSize: 28,
                text: 'Wheel of Life'
            },

            scale: {
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10,
                    display: false
                },
                gridLines: {
                    display: false
                }
            },

            angleLines: {
                display: false


            },



        }
    });
}

function showDataEntry() {
    $('#dataentrypane').hide();
    $('#ReportPane').css({ display: 'block' });
    $('#sendReport').show();
    $('#sendReportBtn').hide();
    $("#resume").show();
    $("#footer_area").hide();
    $('#sendReportInt').show();
    $('#send_icon').show();

    var labelToIdMap = {
        "Friends & Family": "input1",
        "Relationships": "input2",
        "Wealth": "input3",
        "Personal Growth": "input4",
        "Health": "input5",
        "Fun & Recreation": "input6",
        "Possesion": "input7",
        "Career": "input8"
    };

    for (var i = 0; i < Application.labels.length; i++) {
        var ctrl = "#" + labelToIdMap[Application.labels[i]];
        var userdata = $(ctrl).val();
        Application.data[Application.labels[i]] = userdata;
    }

}
var ReportPane = {
    // DoAgain() {
    //     $("#dataentrypane").show();
    //     $("#submit_btn").show();
    //     $("#ReportPane").hide();
    //     $('#sendReport').hide();
    //     location.reload();
    // },
    resume(){
        $("#dataentrypane").show();
        $("#submit_btn").show();
        $("#ReportPane").hide();
        $('#sendReport').hide();
        location.reload();
    },
    showThankYouPage() {
        $("#thankYou").css({ display: 'block' });
        $("#ReportPane").hide();
        $('#sendReport').hide();
        // $("#do_again").hide();
    },
    getEmail() {
        var emailGt = $.trim($("#sendReportInt").val());
        if (emailGt == "") {
            alert("Please enter the Email");
            return false;
        }
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailPattern.test(emailGt)) {
            alert("You have entered an invalid email address!");
            return false;
        }
        return emailGt;
    },
}