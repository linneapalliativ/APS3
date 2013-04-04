function saveData(){
    //Our text field data
    var txtName = $('#txtName').val();
	var bed=$("#problemlistq").html();
    
    //Check databases are supported
    if(openDatabase){
        //Open a database transaction
        db.transaction(function(tx){
            //Execute an SQL statement to create the table "tblDemo" 
            //only if it doesn't already exist                
            tx.executeSql('CREATE TABLE IF NOT EXISTS tblAPSbed ('
                           + 'personId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
                           + 'personName VARCHAR(255),'
                           + 'bed VARCHAR(10000),'
						   + 'datum DATETIME'
                           + ');',[],nullData,errorHandler);
        });
        
        //Open a new transaction
        db.transaction(function(tx){
            //Exexute an INSERT with the name, age and favourite colour, 
            //we set values outside the SQL string for added security and 
            //to prevent SQL injections, the values are represented with "?"
            tx.executeSql('INSERT INTO tblAPSbed ('
                           + 'personName, bed, datum)'
                           + 'VALUES (?, ?, datetime("NOW", "localtime"));'
                           ,[txtName,bed],nullData,errorHandler);
        });
    }
	window.location="#page13";
}

/////
///Get Data Function
/////
function getData(){
    //Create an empty results string
    var strResults = '';
    $('#resultlist li').remove();
	 
    //Open a new transaction
    db.transaction(function(tx){
        //Select a wildcard from the database
        tx.executeSql('SELECT personName, personId, bed, datum FROM tblAPSbed ORDER BY datum DESC'
                       ,[]
                       //Callback function with transaction and 
                       //results objects
                       ,function(tx, results)
					   {
                            //Count the results rows
                            for (var i = 0; i < results.rows.length; i++)
							{
								var row = results.rows.item(i);
								(function(uid, personName, bed, datum) 
								{
    								$('<li id="personName' + uid + '"><a href="#dialog2" data-role="button" data-icon="arrow-r" data-iconpos="right" data-inset="true" class="openspecificdialog" href="#dialog2">' + personName + '<br/><h5>' + datum + '</h5></li>').bind('tap', function()
						{
							
							$("#problemlistqspec").append().html('<b>' + personName + '</b><br/>' + datum + '<br/><table>' + bed + '</table><a href="#page11" data-role="button" data-rel="back" data-transition="fade" data-theme="b">OK</a><a href="#page13" data-icon="delete" data-role="button" id="btnDelete" data-iconpos="right" data-transition="fade" class="ui-btn-up-f" data-theme="c" onclick="deleteData(' + uid + ')">Radera</a>').trigger('create');
    							}).appendTo(".results ul").trigger('create');
  						})(row['personId'], row['personName'], row['bed'], row['datum']);									  				}
		}
		,errorHandler);					   
    });
}

function deleteData(id) 
{ 
	db.transaction(function(tx) 
	{ 
		tx.executeSql('DELETE FROM tblAPSbed WHERE personId=?', [id]); 
	}); 
}
/////
///Error Handler
/////
function errorHandler(transaction, error) 
{
    //Log the error
    console.log('Error: ' + error.message + ' (Code ' + error.code + ')');
}


function nullData()
{
    //Can be used for callbacks etc
}


$(document).ready(function()
{
	$(".external").bind("click", function()
{
	if (this.href)
	{
		// Ensure that loading a new page doesn't open
		// a new window
		location.href = this.href;
		return false;
	}
});
    //Bind events to the buttons to fire off the functions   
	$('#page13').live('pageshow',function(event, ui){
		getData();
	});     
    $('#btnSave').bind('click' , saveData);
    $('#btnGet').bind('click' , getData);
	$('#btnDelete').bind('click' , deleteData);
	$('#btnDelete').click(function()
	{
    	var item2 = $("#resultlist").find("li:contains(this)");
    	item2.remove();
    	getData();
	})
    //Open the database 
    if(openDatabase)
	{
        db = openDatabase('Database Name' , '1.0' , 'Database Description' , 2 * 1024 * 1024);
    }
    //Alert the user to upgrade their browser
    else 
	{
        alert('Databases not supported. Please get a proper browser');
    }
    
});