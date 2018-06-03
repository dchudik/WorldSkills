 
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
    };
    while(state==true){
        var current_code =Things["SmartCam_t3_guap2018"].Code;
        if(current_code !=last_code){
            me.Color=1;
            if(Things["SmartCam_t3_guap2018"].Code == 0)me.Color=2;
        else if(Things["SmartCam_t3_guap2018"].Code == 298){
            
                  sleep(4000);
            me.one_Pos1();
                sleep(4000);
            me.two_Pos2();
            sleep(4000);
            me.one_Pos2();
            sleep(4000);
        me.two_Pos4();
        sleep(4000);
        me.one_Pos3();
        sleep(4000);
        me.two_Pos1();
        sleep(4000);
        me.one_Pos4();
        sleep(4000);
        me.two_Pos3();
        sleep(4000);
        me.TotalRobot1=me.TotalRobot1+1;
            me.Color=2;
        }
    else if(Things["SmartCam_t3_guap2018"].Code == 331){
              sleep(4000);
        me.one_Pos1();
            sleep(4000);
        me.two_Pos4();
        sleep(4000);
        me.one_Pos2();
        sleep(4000);
    me.two_Pos2();
    sleep(4000);
    me.one_Pos3();
    sleep(4000);
    me.two_Pos3();
    sleep(4000);
    me.one_Pos4();
    sleep(4000);
    me.two_Pos1();
    sleep(4000);
        me.Color=2;
           me.TotalRobot1=me.TotalRobot1+1;
        }
    else if(Things["SmartCam_t3_guap2018"].Code == 465){
              sleep(4000);
        me.one_Pos1();
            sleep(4000);
        me.two_Pos1();
        sleep(4000);
        me.one_Pos2();
        sleep(4000);
    me.two_Pos4();
    sleep(4000);
    me.one_Pos3();
    sleep(4000);
    me.two_Pos2();
    sleep(4000);
    me.one_Pos4();
    sleep(4000);
    me.two_Pos3();
    sleep(4000);
        me.Color=2;
           me.TotalRobot1=me.TotalRobot1+1;
        }
            else{
                 var date = new Date();
                 var time = '1'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                me.Color=0;
                me.Total_Spoilage_Robot1=me.Total_Spoilage_Robot1+1;
                me.Errors.AddRow({
                    Error:"Неизвестный код",
                    Time: time,
                });
            }
            var last_code = current_code;
           
        };}