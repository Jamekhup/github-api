import React from 'react';

interface DateProp {
    dateString: string;
}

export const DateUtil:React.FC<DateProp> = ({dateString}) => {
    const date = new Date(dateString);
    const today = new Date();
    const differenceInTime = today.getTime() - date.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
    return differenceInDays > 1 ? differenceInDays + " days ago" : differenceInDays + " day ago";
  };
  