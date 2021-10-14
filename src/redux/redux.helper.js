export function componentDidUpdate(prev, curr, callback= ()=>{}) {
  if (prev !== curr) {
    console.log('Entro',prev, curr)
      callback()
  }
}

 