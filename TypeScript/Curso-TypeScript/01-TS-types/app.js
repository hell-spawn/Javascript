console.log('It works');
function addAndHandler(n1, n2, callback) {
    var result = n1 + n2;
    callback(result);
}
addAndHandler(10, 20, function (result) {
    console.log(result);
});
function sendRequest(data, cb) {
    // ... sending a request with "data"
    return cb({ data: 'Hi there!' });
}
var test = sendRequest('Send this!', function (response) {
    console.log(response);
    return true;
});
console.log(test);
