var Email= {
	sendEmail(){
    var emailGt =$.trim($("#sendReportInt").val());
    if (emailGt== "") {
      alert("Please enter the Email");
      return;
    }
	
	var reportData = '<!DOCTYPE html><html><body><table style="border: 1px solid black;">';
	for ( var i = 0 ; i < App.labels.length ; i++ )
	{
		var label = App.labels[i];
		var value = App.data[label];
		reportData = reportData + '<tr><td>' + label + '</td><td>' + value+  '</td><tr>';
	}
	reportData = reportData + '</table></body></html>';

   var templateParams = {
      Problem: 'Your Wheel of Life',
      reply_to: emailGt,
      reportData:reportData
  }; 
    emailjs.send(AppConfig.emailService, AppConfig.emailTemplate, templateParams)
    .then(function() {
      $("#ReportPane").hide();
      $("#sendReport").hide();	  
      $("#thankYou").show();
    }, function(error) {
        alert("Sorry,We can't send your email currently, you can save report by downloading the webpage");
    });
  }
}
