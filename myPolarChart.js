var ReportPane = {
	DoAgain() {
		$('#ReportPane').hide();
		$('#dataentrypane').show();
		$('#sendReport').hide();
	}
}

var App = {
	"State": {
		"CurrentStage": 0
	},
	"data": {
		"Friends & Family": 1,
		"Relationships": 2,
		"Wealth": 3,
		"Personal Growth": 4,
		"Health": 5,
		"Fun & Recreation": 6,
		"Possesion": 7,
		"Career": 8
	},
	"labels": ["Friends & Family", "Relationships", "Wealth", "Personal Growth", "Health", "Fun & Recreation", "Possesion", "Career"]
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

function readUserInput() {
	$('#dataentrypane').hide();
	$('#ReportPane').show();
	$('#sendReport').show();


	var labelToIdMap = {
		"Friends & Family": "Friends-n-Family",
		"Relationships": "Relationships",
		"Wealth": "Wealth",
		"Personal Growth": "Personal-Growth",
		"Health": "Health",
		"Fun & Recreation": "Fun-n-Recreation",
		"Possesion": "Possesion",
		"Career": "Career"
	};

	for (var i = 0; i < App.labels.length; i++) {
		var ctrl = "#" + labelToIdMap[App.labels[i]];
		var userdata = $(ctrl).val();
		App.data[App.labels[i]] = userdata;
		// App.State.CurrentStage++ ;
	}

}

$("#renderBtn").click(
	function () {
		data = [];
		readUserInput();

		for (var i = 0; i < App.labels.length; i++) {

			data.push(App.data[App.labels[i]]);
		}

		renderChart(data, App.labels);
	}
 );
