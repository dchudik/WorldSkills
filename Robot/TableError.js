
var date = new Date();
me.ToStartSmena=7;
var time = date.getMinutes();
var hour =new Number(date.getHours())-10;
var y=(time-me.ToStartSmena/hour)*(me.TotalRobot1-me.Total_Spoilage_Robot1)*100;
me.Table_Main.AddRow({
    Number:1,
    Total:me.TotalRobot1,
    Total_Spoilage:me.Total_Spoilage_Robot1,
    KPI:y,
});