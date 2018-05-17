function autocomplete(from, to){
    switch(from){
        case 1:me.one_Pos1();
        	break;
        case 2:me.one_Pos2();
            break;
        case 3:me.one_Pos3();
            break;
        case 4:me.one_Pos4();
            break;
    }
    switch(to){
        case 1: me.two_Pos1();
        	break;
        case 2:me.two_Pos2();
            break;
        case 3:me.two_Pos3();
            break;
        case 4:me.two_Pos4();
            break;
    }
};

while(state == "autocomplete"){
for (var i=0;i<me.TableWords.rows.length;i++)
	{
		if (me.Code == me.TableWords.rows[i].Code)
		{
			array = me.TableWords.rows[i].Array;
		}
	};
    
var array = "11111111";
for(var k=0;k<array.length;k=k+2){
    for(var f=1;f<array.length;f=f+2){
	autocomplete(k, f);
}
}
}

