theTime = new Date();
theHour = theTime.getHours();
theMinute = theTime.getMinutes();
if(theHour>=9&&theHour<=17){
document.body.style.cssText = "background: url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/01.jpg')";
}
else if(theHour>6&&theHour<9){
document.body.style.cssText = "background: url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/02.jpg')";
}
else if(theHour>17&&theHour<21){
document.body.style.cssText = "background: url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/01.jpg')";
}
else{
document.body.style.cssText = "background: url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/02.jpg')";
}