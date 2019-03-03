var src = me.Distance;
// ���������� ������������� ������� �� ����������� �������� � �.�.
for (var i=0;i<me.TableCalibration.rows.length-1;i++)
{
	for (var j=i+1;j<me.TableCalibration.rows.length;j++)
	{
		if (me.TableCalibration.rows[i].UE>me.TableCalibration.rows[j].UE)
		{
			var tmpUE = me.TableCalibration.rows[i].UE;
			var tmpSm = me.TableCalibration.rows[i].Sm;
			me.TableCalibration.rows[i].UE = me.TableCalibration.rows[j].UE;
			me.TableCalibration.rows[i].Sm = me.TableCalibration.rows[j].Sm;
			me.TableCalibration.rows[j].UE = tmpUE;
			me.TableCalibration.rows[j].Sm = tmpSm;
		}
	}
}
// ����������� ����������� � ������������ ���������� � �.�.
var minDistance, maxDistance, minDistanceSm, maxDistanceSm;
for (var i=0;i<me.TableCalibration.rows.length;i++)
{
	if (me.TableCalibration.rows[i].UE>maxDistance)
	{
		maxDistance = me.TableCalibration.rows[i].UE;
		maxDistanceSm = me.TableCalibration.rows[i].Sm;
	}
	if (me.TableCalibration.rows[i].UE<minDistance)
	{
		minDistance = me.TableCalibration.rows[i].UE;
		minDistanceSm = me.TableCalibration.rows[i].Sm;
	}
}
// ��������, ���� ���������� � �.�. �� �������� � ���������, ����������� �������� ����������
if (src>maxDistance)
{
	me.DistanceSm = maxDistanceSm;
}
else if (src<minDistance)
{
	me.DistanceSm = minDistanceSm;
}
else
{
// ����������� �������������� �������, � ������� �������� ���������� � �.�. (x)
var x1, x2, y1, y2;
for (var i=0;i<me.TableCalibration.rows.length-1;i++)
{
	if (src >= me.TableCalibration.rows[i].UE && src <= me.TableCalibration.rows[i+1].UE)
	{
		x1 = me.TableCalibration.rows[i].UE;
		x2 = me.TableCalibration.rows[i+1].UE;
		y1 = me.TableCalibration.rows[i].Sm;
		y2 = me.TableCalibration.rows[i+1].Sm;
		break;
	}
}
// ������� �������� � �� �� �������
me.DistanceSm = y1 - (y2-y1)*(x1-src)/(x2-x1);
}