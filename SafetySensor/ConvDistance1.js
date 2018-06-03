if ((me.Distance1<=460)&(me.Distance1>240))			result=10-10*(460-me.Distance1)/(-220);
else if ((me.Distance1<=240)&(me.Distance1>175))	result = 20-10*(240-me.Distance1)/(-65);
else if ((me.Distance1<=175)&(me.Distance1>140))	result = 30-10*(175-me.Distance1)/(-35);
else if ((me.Distance1<=140)&(me.Distance1>120))	result = 40-10*(120-me.Distance1)/(-20);
else if ((me.Distance1<=120)&(me.Distance1>80))		result = 50-10*(80-me.Distance1)/(-40);
else if ((me.Distance1<=80)&(me.Distance1>72))		result = 60-10*(72-me.Distance1)/(-8);
else if ((me.Distance1<=72)&(me.Distance1>=60))		result = 70-10*(60-me.Distance1)/(-12);
me.Distance1_sm=result;