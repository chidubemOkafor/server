interface dateObj {
    date: number, // Extract date (e.g., 29)
    month: number,          // Extract month (e.g., Sep)
    time: number 
}

const parseDateString= (dateString:string): {
    date: number, 
    month: number,
    time: number 
} | null  => {

    const regex1 = /(\d{1,2})\s([A-Za-z]+),\s(\d{1,2}:\d{2}\s[APM]{2})/;
    const regex2 = /([A-Za-z]+)\s(\d{1,2}),\s\d{4}\sat\s(\d{1,2}:\d{2}\s[APM]{2})/;
    
    let match:any;

    if (regex1.test(dateString)) {
        match = dateString.match(regex1);
        return {
            date: parseInt(match[1]),
            month: match[2],      
            time: match[3]            
        };
    } else if (regex2.test(dateString)) {
        match = dateString.match(regex2);
        return {
            date: parseInt(match[2]), 
            month: match[1],         
            time: match[3]    
        };
    }

    return null;
}

export {parseDateString}