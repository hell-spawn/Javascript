console.log('It works');
function addAndHandler(n1: number, n2: number, callback: (resutl) => void) {
    const result = n1 + n2;
    callback(result);
}


addAndHandler(10, 20, (result) => {
    console.log(result);
});

function sendRequest(data: string, cb: (response: any) => void) {
    // ... sending a request with "data"
    return cb({data: 'Hi there!'});
}

const test =  sendRequest('Send this!', (response) => {
    console.log(response);
    return true;
});

console.log(test);

