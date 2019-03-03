// ContinueAnalysis
if (me.Positions != "" && me.FinishPositions != "")
    {
    var positions = me.Positions.split(",");
    var From = Things["Robot_Mitya_FSPO_Trolltram"].Team0From;
    var To = Things["Robot_Mitya_FSPO_Trolltram"].Team0To;
    if (From != 0 && From != 0)
    {
        if (positions[From-1] != " " && positions[To-1] == " ")
        {
            positions[To-1] = positions[From-1];
            positions[From-1] = " ";
        }
    }
    me.Positions = positions.join(",");
}