function sendResponse({response: res,data: data,error: err}){
    res.json({
      "status": {
        "code": res.statusCode,
        "message": res.statusMessage
      },
      "data": data,
      "error": {
        err
      }
    });
}

module.exports = sendResponse;
  
