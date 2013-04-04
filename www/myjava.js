function test()
{
	alert("tessss");
}
// JavaScript Document

function validate()
{	
			for (index=0; index < 10; index++) 
			{
				alert("tetst");
				group = document.getElementsByName("radiobutton")[index];
				if(!group.checked)
				{
					alert("Alla frågor är inte besvarade");		
				}	
				for (i=0; i < 28; i++) 
				{
					alert("testomg");
					element = document.getElementById("R")[i];
					if (element.checked) 
					{	
						sum += element.value;
					}
				}
					if(sum >= 10)
	{
		alert("Risk för ohälsa i munnen." + <a href="#page2">Läs mer om munhälsa.</a>);
	} 
	if(sum == 9)
	{
		alert('Ingen ohälsa i munnen.');
	}
			}

		

}
function clearform() {
      for (var i = 0; i < 28; i++) {
         document.getElementById("R")[i].checked = false;
     }
}
