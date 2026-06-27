export function setDateOrar(){
    // Notite pentru mine
    // gaseste ziua de azi
    let todaysDay = new Date().getDay();
    let monday = new Date();

    // calculeaza diferenta (cate zile is diferenta intre ziua de azi si luni.)
    let difference = todaysDay === 0 ? 6 : todaysDay - 1;

    // setezi data de luni incat sa corespunda. getDate returneaza fix ziua, de ex 22. 22-1 = 21 e ziua de luni
    monday.setDate(monday.getDate() - difference);
    
    // genereaza array-u, loop prin el pentru 7 outputuri, creezi o data noua pentru fiecare iteratie, push in urma. monday + i.
    let dateArray = [];
      for(let i = 0; i < 7; i++){
    let newDate = new Date(monday);
    dateArray.push(new Date((newDate).setDate((newDate.getDate() + i))));
  }
  return dateArray
  }

export function changeCalendarWeek(type, dateCalendar, setDateCalendar){
    if(type === 'add'){
      let newArray = dateCalendar.map((date) => {
        return new Date(new Date(date).setDate(new Date(date).getDate() + 7));
      })
      setDateCalendar(newArray);
    } else if(type === 'substract'){
      let newArray = dateCalendar.map((date) => {
        return new Date(new Date(date).setDate(new Date(date).getDate() - 7));
      })
      setDateCalendar(newArray);
    }
  }