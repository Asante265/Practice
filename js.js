async function fetchData() {  
      const url = 'https://jsonplaceholder.typicode.com/posts';  
    try{
     const response = await fetch(url, { method: 'GET'});

        if(!response.ok){
            throw new Error('An Error occurred during the' + response.status);
        }

        const _data = await response.json();
        console.log("Response was received accurately");

    return _data
    }
    catch(error){
        console.log(`HTTP: ${error.message} sasa`);
        return null;
    }
}

fetchData().then((_data)=>{
            if(_data){
                console.log(_data)
            }}).catch((error)=>{
                console.error("Final error handler:", error.message)
            })