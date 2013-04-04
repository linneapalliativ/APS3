function clearform () {

		window.location = "#page";
		$(".questions").each(function()
		{
			$(this).attr('checked', false).checkboxradio("refresh");
			document.getElementById("problemlistq").innerHTML = "";
			document.getElementById("headmessage").innerHTML="";
			document.getElementById("contentmessage").innerHTML="";
		});
}

$(function () {
$('#validate').click(function () {
	$("#btnSave").show('refresh');
	$('#txtName').show('refresh');

	if ($('input[type=radio]:checked').length == 6)
	{
		sum = 0;
			$("input[type=radio]:checked").each(function() 
			{
 				sum += parseInt($(this).val()); 
			});
			array2 = ['<strong>Röstuttryck/ljud: </strong>', '<strong>Ansiktsuttryck: </strong>', '<strong>Förändrat kroppsspråk: </strong>', '<strong>Förändrat beteende: </strong>', '<strong>Fysiologisk förändring: </strong>', '<strong>Kroppslig förändring: </strong>']; 
var arr1 = $("input:radio:checked + label").map(function(a, i) {
							return '<tr><td>' + array2[a] + '</td><td>' + $(this).text() + '</td><td>' + $(this).siblings('input:radio:checked').val() + '</td></tr>';
                                        }).get().join('');	

			if (sum <= 2)
			{
				$("#btnSave").show();
				$('#txtName').show();
				document.getElementById("problemlistq").innerHTML = arr1 + "<br/><h3>Summa: "+ sum+ " av 27</h3>";
				document.getElementById("headmessage").innerHTML="Validering";
				document.getElementById("contentmessage").innerHTML="<h2>Ingen smärta.</h2>Sammanfattning";
				window.location = "#page";	
			}
			if (sum <= 7 && sum >= 3)
			{
				$("#btnSave").show();
				$('#txtName').show();
				document.getElementById("problemlistq").innerHTML = arr1 + "<br/ ><h3>Summa: "+ sum+ " av 27</h3>";
				document.getElementById("headmessage").innerHTML="Validering";
				document.getElementById("contentmessage").innerHTML="<h2>Mild smärta</h2>Sammanfattning";
				window.location = "#page";	
			}
			if (sum <= 13 && sum >= 8)
			{
				$("#btnSave").show();
				$('#txtName').show();
				document.getElementById("problemlistq").innerHTML = arr1 + "<br/ ><h3>Summa: "+ sum+ " av 27</h3>";
				document.getElementById("headmessage").innerHTML="Validering";
				document.getElementById("contentmessage").innerHTML="<h2>Måttlig smärta.</h2>Sammanfattning";
				window.location = "#page";	
			}
			if (sum >= 14)
			{
				$("#btnSave").show();
				$('#txtName').show();
				document.getElementById("problemlistq").innerHTML = arr1 + "<br/ ><h3>Summa: "+ sum+ " av 18</h3>";
				document.getElementById("headmessage").innerHTML="Validering";
				document.getElementById("contentmessage").innerHTML="<h2>Svår smärta!</h2>Sammanfattning";
				window.location = "#page";	
			}
	}
	else
	{
				$("#btnSave").hide();
				$('#txtName').hide();
				document.getElementById("headmessage").innerHTML="Validering";
				document.getElementById("contentmessage").innerHTML="Du måste besvara alla frågor för att kunna validera.";
				return;
	}

});
});

