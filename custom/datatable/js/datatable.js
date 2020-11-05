$(document).ready(function() {
	
	$.ajax ({
		url: "https://bravolab.sharepoint.com/sites/Practical/_api/Web/Lists/GetByTitle('Data')/Items?$select=ID,Title,JobTitle,Email,StartDate,Location",
		method: "GET",
		headers: {"Accept": "application/JSON; odata=verbose"},
		success: function (data) {			
			if (data.d.results.length > 0) {
				$('#dataGrid').append(GenerateTableFromJson(data.d.results));
				
				$('#TableData').dataTable({
					columnDefs:[
						{ targets:0, render:function(data) { return '<a href="https://bravolab.sharepoint.com/sites/Practical/Lists/Data/EditForm.aspx?ID=' + data + '&Source=https://bravolab.sharepoint.com/sites/Practical/Pages/DataTable.aspx">' + data + '</a>'; } },
						{ targets:3, render:function(data) { return '<a href="mailto:' + data + '">' + data + '</a>'; } },
						{ targets:4, render:function(data) { return moment(data).format('MMMM Do YYYY'); } }
					]
				});
			}
			else {
				$('#dataGrid').append("<span>No Records Found.</span>");
			}
		},
		error: function(data) {
			$('#dataGrid').append("<span>Error Retreiving Records: " + JSON.stringify(data) + "</span>");
		}
	});
	
	function GenerateTableFromJson(objArray) {
		var tableContent = '<table class="table table-striped table-bordered table-hover" id="TableData" style="width:100%"><thead><tr><td>ID/Edit</td>' + '<td>Name</td>' + '<td>Job Title</td>' + '<td>Email</td>' + '<td>Start Date</td>' + '<td>Location</td>' + '</tr></thead><tbody>';
		for (var i = 0; i < objArray.length; i++) {
			tableContent += '<tr>';
			tableContent += '<td>' + objArray[i].Id + '</td>';
			tableContent += '<td>' + objArray[i].Title + '</td>';
			tableContent += '<td>' + objArray[i].JobTitle + '</td>';
			tableContent += '<td>' + objArray[i].Email + '</td>';
			tableContent += '<td>' + objArray[i].StartDate + '</td>';
			tableContent += '<td>' + objArray[i].Location + '</td>';
			tableContent += '</tr>';
		}
		return tableContent;
	};
	
});