if ((me.Distance3<=460)&(me.Distance3>240))			result=10-10*(460-me.Distance3)/(-220);
else if ((me.Distance3<=240)&(me.Distance3>175))	result = 20-10*(240-me.Distance3)/(-65);
else if ((me.Distance3<=175)&(me.Distance3>140))	result = 30-10*(175-me.Distance3)/(-35);
else if ((me.Distance3<=140)&(me.Distance3>120))	result = 40-10*(140-me.Distance3)/(-20);
else if ((me.Distance3<=120)&(me.Distance3>80))		result = 50-10*(120-me.Distance3)/(-40);
else if ((me.Distance3<=80)&(me.Distance3>72))		result = 60-10*(80-me.Distance3)/(-8);
else if ((me.Distance3<=72)&(me.Distance3>=60))		result = 70-10*(72-me.Distance3)/(-12);
me.Distance3_sm=result;