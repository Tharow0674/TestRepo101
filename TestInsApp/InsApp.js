

angular.module('insApp', []).controller('CoverageController', function() {
	var Family = this;
	Family.Members = [];

	Family.AddMember = function() {
		Family.Members.push({FirstName:Family.FirstName, LastName:Family.LastName, Type:Family.Type});
		Family.FirstName = '';
		Family.LastName = '';
		Family.Type = '';
	};

	Family.YearlyExpense = function(member) {		
		var yrly = CalculateYearlyCost(member);

		return yrly;
	};

	Family.MonthlyExpense = function(member) {
		var yrly = Family.YearlyExpense(member);
		var mnth = parseFloat(yrly) / parseFloat(26);

		return mnth;
	};

	Family.MonthlyTakeHome = function() {
		var takeHome = parseFloat(2000);

		for (var Mem in Family.Members) {
			var mnth = Family.MonthlyExpense(Mem);
			takeHome -= mnth;
		}

		return takeHome;
	};

    Family.DepTypes = {
        Empl: { Cost: 1000, Text: "Emloyee", Code: "Empl" },
        Spou: { Cost: 500, Text: "Spouse", Code: "Spou" },
        Son: { Cost: 500, Text: "Son", Code: "Son" },
        Daug: { Cost: 500, Text: "Daughter", Code: "Daug" },
        Othe: { Cost: 500, Text: "Other", Code: "Othe" }
    };
    
	Family.Commit = function() {

		alert("This IS just a contrived example :)");
		
		
		//It would go a little something like this...
		//
		//var dataObj = [];
		//for (var Mem in Family.Members) {
		//	var dataItm = {
		//			FirstName : Mem.FirstName,
		//			LastName : Mem.LastName,
		//			Type : Mem.Type
		//	};	
		//	dataObj.push(dataItm);
		//}
		//var res = $http.post('/SaveFamily', dataObj);
		//res.success(function(data, status, headers, config) {
		//	Family.Messages = data;
		//});
		//res.error(function(data, status, headers, config) {
		//	alert( "failure message: " + JSON.stringify({data: data}));
		//});		
		//
		//With an MVC Controller Method like:
		//	[HttpPost]
		//	ActionResult SaveFamily(FamilyMembers[] memberList)
		//	{
		//		//Persist each item of array to Data Store
		//		//Personally i would go with a DataStore abstraction allowing for 
		//		//access to any type of data provider, followed up by a formatter 
		//		//abstraction capable of exporing objects to JSON, XML, SQL or SProc  
		//		//text. This assures longevity in an ever changing landscape. Between  
		//		//a single new formatter and single new datastore, you can conform to  
		//		//any new standard from Rest and Web API to Sql to XML files
		//	}
	};
});

function CalculateYearlyCost(member){
	var cost = CalculateBaseYearlyCost(member);
	cost = CalculateYearlyAdjustment(member, cost);
	return cost;
}
  
function CalculateBaseYearlyCost(member){
	var dep = DepTypes[member.Type];

	var yrly = parseFloat(dep.Cost);

	return yrly;
}

function CalculateYearlyAdjustment(member, cost){
	var yrly = parseFloat(cost);

	if(member.FirstName.substring(0, 1) == "a" || member.FirstName.substring(0, 1) == "a"){
		yrly = yrly * parseFloat(0.9)
	}

	return yrly;
}
