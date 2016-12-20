const readline = require('readline');
const fs = require('fs');
var header1 =[];
var Jsondata1=[];
var tempData1={};
var isheader1=true;
var flag1=false;
var header =[];
var JsonData=[];
var tempData2={};
var isHeader=true;
var header3 =[];
var jsonData3=[];
var tempData3={};
var isHeader3=true;
var flag3=false;
var header4 =[];
var jsonData4=[];
var tempData4={};
var isHeader4=true;
var year = [];
var aggregated_value = [];
var jsonData5 = [];
var tempData5 = {};
for(let i = 0;i <= 21;i++){
   aggregated_value[i] = 0;
}
const rl = readline.createInterface({
	input: fs.createReadStream('../csv/agric.csv')
});


rl.on('line', function(line) {
	//console.log(lineRecords.length);
	var lineRecords= line.split(',');
	var dataflag =false;
	for(var i=0;i<lineRecords.length;i++)
	{
		 if(isheader1)
	       { 
		header1[i]=lineRecords[i].trim();
		//console.log(header1[i].length+"------->"+header1[i]);
		
		
		 }
	else if((header1[i]=="Particulars")|| (header1[i]=="3-2013"))
	{
			//console.log(head1.indexOf(lineRecords[0]));


			if(lineRecords[0].includes("Foodgrains"))
			{
				if(i==0){
			tempData1[header1[i]]=lineRecords[i];}
				
			else{
			tempData1[header1[i]]=parseFloat(lineRecords[i+1].replace("NA",0));}		
		//console.log(tempData1.length);
		
			//console.log(tempData1[header1[i]]);
				dataflag=true;
			}
		
		//tempData1[header1[i]]=tempData1[header1[i]].replace("!",",").replace(/["]/g,"");
		
		
			}         
	}
var dataflag3 =false;
	for(var i=0;i<lineRecords.length;i++)
	{
		 if(isHeader3)
	       { 
		header3[i]=lineRecords[i].trim();
	
		
		
		 }
	else if((header3[i]=="Particulars")|| (header3[i]=="3-2013"))
	{
	


			if(lineRecords[0].includes("Oilseeds"))
			{
				if(i==0){
			tempData3[header3[i]]=lineRecords[i];
		}
		
			else{
			tempData3[header3[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
			
		}		
		//console.log(tempData3.length);
		
			//console.log(tempData3[header3[i]]);
				dataflag3=true;
			}
		
		//tempData3[header3[i]]=tempData3[header3[i]].replace("!",",").replace(/["]/g,"");
		
		
			}         
	}
	var dataflag4 =false;
	for(var i=0;i<lineRecords.length;i++)
	{
		if(isHeader4)
		{ 
			header4[i]=lineRecords[i].trim();
		
		
		
	}
	else if((header4[i]=="Particulars")|| (/3-/i.test(header4[i])))
	{



		if(lineRecords[0].includes("Rice Yield Karnataka") || lineRecords[0].includes("Rice Yield Andhra Pradesh") || lineRecords[0].includes("Rice Yield Kerala") || lineRecords[0].includes("Rice Yield Tamil Nadu") )
		{
			if(i==0){
				tempData4[header4[i]]=lineRecords[i];
			// console.log(tempData4);
		}
		// var sum=0;
		for(i=3;i<25;i++)
		{

			tempData4[header4[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
			// sum += parseFloat(lineRecords[i]);
			// console.log(sum);

			

		}	
		
		// tempData4["year"]=sum;
			// console.log(tempData4);	
			

			//console.log(tempData4[header4[i]]);
			dataflag4=true;
		}
		
		
		
		
	}         
}




if(dataflag4)
{
	jsonData4.push(tempData4);
}
isHeader4=false;	

fs.writeFileSync("../JSON/southstating.json",JSON.stringify(jsonData4),encoding="utf8");

tempData4={};
 

	if(dataflag3)
	{
		jsonData3.push(tempData3);
	}
	isHeader3=false;	

	fs.writeFileSync("../JSON/oilseeding.json",JSON.stringify(jsonData3),encoding="utf8");

	tempData3={};

 

	if(dataflag)
	{
		Jsondata1.push(tempData1);
	}
	isheader1=false;	

	fs.writeFileSync("../JSON/foodgraining.json",JSON.stringify(Jsondata1),encoding="utf8");

	tempData1={};
	 if(/Agricultural Production Commercial \D/.test(lineRecords[0])){

       var temp_year = 1993;

       for(var i = temp_year;i <= 2014;i++){

           if(!year[i - temp_year]){
               year[i - temp_year] = i;
           }

           if(lineRecords[i - temp_year +4] === "NA"){
               aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + 0;
           }
           else{
               aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + parseFloat(lineRecords[i - temp_year + 4]);
           }

       }

   }
   
});


rl.on('close',function()
{

   for (let n = 0; n < aggregated_value.length ; n++){

       tempData5 = {};
       tempData5["Year"] = year[n];
       tempData5["Aggregated value of all Commercial crops (Ton mn)"] = aggregated_value[n];
   
       jsonData5.push(tempData5);
   
   }
   
   fs.writeFileSync("../JSON/threecommercialing.json",JSON.stringify(jsonData5),encoding="utf8");
	
});