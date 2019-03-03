// FinishAnalysis
if (me.Positions != "" && me.FinishPositions != "")
{
	if (me.Step == 5)
	{
		if (me.Positions==me.FinishPositions)
		{
			me.CountWords++;
		}
		else
		{
			me.CountDefect++;
		}
	}
}