// StartAnalysis
if (me.Step == 1)
{
	var positions = ["У"," ","К","Л"," ","Н"," "," ","О"," "," "];
	me.Positions = positions.join(",");
	var word = "";
	for (var i=0;i<me.TableWords.rows.length;i++)
	{
		if (me.Code == me.TableWords.rows[i].Code)
		{
			word = me.TableWords.rows[i].Word;
		}
	}
	if (word != "")
	{
		var finishPositions = [" "," "," "," "," "," "," "," "," "," "," "];
		finishPositions[1] = word[0];
		finishPositions[4] = word[1];
		finishPositions[7] = word[2];
		finishPositions[9] = word[3];
		finishPositions[10] = word[4];
		me.FinishPositions = finishPositions.join(",");
	}
	else
	{
		me.FinishPositions = positions.join(",");
	}
}