//for ..in

//Syntax

//for ( variable in object ) { ... }

/*Example 1*/
var obj = {a:1, b:2, c:3};
for(var i=0 in obj) {
  console.log(obj[i]);
}

//

/*Example 2*/
var obj = {a:1, b:2, c:3};
for(var i=0 in obj) {
  console.log(i);
}

//

//for loop

//Syntax

//for ([initialization]; [condition]; [final-expression])
   
/*Example 1*/

for (var i = 0; i < 9; i++) {
   console.log(i);
}

//

/*Example 2*/

/*var i = 0;
for (; i < 9; i++) {
    console.log(i);
}*/

//

/*Example 3*/

/*var i = 0;

for (;;) {
  if (i > 3) break;
  console.log(i);
  i++;
} */

