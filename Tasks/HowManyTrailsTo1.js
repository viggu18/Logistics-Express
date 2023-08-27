const findTrails = (num)=> {
    let steps = 0;
    while(num >1){
            num = num % 2 === 0 ? num / 2 : (num * 3) + 1       
        steps++
    }
    return steps
}

console.log(findTrails(12))